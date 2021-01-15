import { createAction, handleActions } from 'redux-actions';
import { put, takeLatest, select } from 'redux-saga/effects';

require('dotenv').config();

const axios = require('axios');

const initialState = {
  newJobId: 0,
  jobData: {
    img: '',
    previewURL: '',
    companyName: '',
    experienceLevel: 1,
    introduce: '',
    task: '',
    condition: '',
    preferentialTreatment: '', // 우대사항
    skills: [], // 기술스택 ["react", "vue"]
    welfare: '',
    deadline: '',
    selectedDate: 1, // 기한이 있는지 혹은 상시인지 구분 (1 상시 / 2 기한)
    address1: '', // 도로명 주소
    address2: '', // 상세 주소
    source: '',
    other: '',
    checked: false,
  },
  skillSetting: {
    inputVisible: false,
    inputValue: '',
  },
};

const CHANGE_IMAGE = 'job/SHOW_MODAL';
const CHANGE_PREVIEW_URL = 'job/CHANGE_PREVIEW_URL';
const CHANGE_INPUT_VALUE = 'job/CHANGE_INPUT_VALUE';
const CHANGE_TAG_VISIBLE = 'job/CHANGE_TAG_VISIBLE';
const CHANGE_TAG_INPUT_VALUE = 'job/CHANGE_TAG_INPUT_VALUE';
const CHANGE_TAGS = 'job/CHANGE_TAGS';
const CHANGE_DATE = 'job/CHANGE_DATE';
const CHANGE_CHECK = 'job/CHANGE_CHECK';

const POST_JOB = 'job/POST_JOB';
const POST_JOB_SUCCESS = 'job/POST_JOB_SUCCESS';

// 리덕스 액션 생성자
export const changeImage = createAction(CHANGE_IMAGE);
export const changePreviewURL = createAction(CHANGE_PREVIEW_URL);
export const changeInputValue = createAction(CHANGE_INPUT_VALUE);
export const changeTagVisible = createAction(CHANGE_TAG_VISIBLE);
export const changeTagInputValue = createAction(CHANGE_TAG_INPUT_VALUE);
export const changeTags = createAction(CHANGE_TAGS);
export const changeDate = createAction(CHANGE_DATE);
export const changecheck = createAction(CHANGE_CHECK);

// 사가 액션 생성자
export const postJob = createAction(POST_JOB);

function* postJobSaga({ payload }) {
  try {
    const imgUrlRes = yield axios.post(`${process.env.REACT_APP_SERVER_URL}/api/jobs/upload`, payload);

    if (!imgUrlRes.data) return;

    const userToken = yield select(state => state.user.token);
    const companyName = yield select(state => state.jobFormData.jobData.companyName);
    const experienceLevel = yield select(state => state.jobFormData.jobData.experienceLevel);
    const introduce = yield select(state => state.jobFormData.jobData.introduce);
    const task = yield select(state => state.jobFormData.jobData.task);
    const condition = yield select(state => state.jobFormData.jobData.condition);
    const preferentialTreatment = yield select(state => state.jobFormData.jobData.preferentialTreatment);
    const skills = yield select(state => state.jobFormData.jobData.skills);
    const welfare = yield select(state => state.jobFormData.jobData.welfare);
    const deadline = yield select(state => state.jobFormData.jobData.deadline);
    const selectedDate = yield select(state => state.jobFormData.jobData.selectedDate);
    const address1 = yield select(state => state.jobFormData.jobData.address1);
    const address2 = yield select(state => state.jobFormData.jobData.address2);
    const source = yield select(state => state.jobFormData.jobData.source);
    const other = yield select(state => state.jobFormData.jobData.other);

    const newJobDeadline = selectedDate === 1 ? '상시' : deadline;

    const newJob = {
      userToken,
      imgPath: imgUrlRes.data.url,
      companyName,
      experienceLevel,
      introduce,
      task,
      condition,
      preferentialTreatment,
      skills,
      welfare,
      deadline: newJobDeadline,
      address1,
      address2,
      source,
      other,
    };

    const jobRes = yield axios.post(`${process.env.REACT_APP_SERVER_URL}/api/jobs`, newJob);

    yield put({
      type: POST_JOB_SUCCESS,
      payload: jobRes.data,
    });
  } catch (e) {
    console.error(e);
  }
}

export function* jobFormDataSaga() {
  yield takeLatest(POST_JOB, postJobSaga);
}

const jobFormData = handleActions(
  {
    [CHANGE_IMAGE]: (state, action) => ({
      ...state,
      jobData: {
        ...state.jobData,
        img: action.payload,
      },
    }),
    [CHANGE_PREVIEW_URL]: (state, action) => ({
      ...state,
      jobData: {
        ...state.jobData,
        previewURL: action.payload,
      },
    }),
    [CHANGE_INPUT_VALUE]: (state, action) => ({
      ...state,
      jobData: {
        ...state.jobData,
        [action.payload.name]: action.payload.value,
      },
    }),
    [CHANGE_TAG_VISIBLE]: (state, action) => ({
      ...state,
      skillSetting: { ...state.skillSetting, inputVisible: action.payload },
    }),
    [CHANGE_TAG_INPUT_VALUE]: (state, action) => ({
      ...state,
      skillSetting: { ...state.skillSetting, inputValue: action.payload },
    }),
    [CHANGE_TAGS]: (state, action) => ({
      ...state,
      jobData: { ...state.jobData, skills: action.payload },
    }),
    [CHANGE_DATE]: (state, action) => ({
      ...state,
      jobData: {
        ...state.jobData,
        deadline: action.payload,
      },
    }),
    [CHANGE_CHECK]: (state, action) => ({
      ...state,
      jobData: {
        ...state.jobData,
        checked: action.payload,
      },
    }),
    [POST_JOB_SUCCESS]: (state, action) => ({
      ...state,
      newJobId: action.payload.id,
      jobData: {
        img: '',
        previewURL: '',
        companyName: '',
        experienceLevel: 1,
        introduce: '',
        task: '',
        condition: '',
        preferentialTreatment: '',
        skills: [],
        welfare: '',
        deadline: '',
        selectedDate: 1,
        address1: '',
        address2: '',
        source: '',
        other: '',
        checked: false,
      },
    }),
  },
  initialState
);

export default jobFormData;
