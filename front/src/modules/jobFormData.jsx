import { createAction, handleActions } from 'redux-actions';
import { put, takeLatest } from 'redux-saga/effects';
import SERVER_URL from '../lib/serverUrl';

const axios = require('axios');

const initialState = {
  jobData: {
    imgPath: '',
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

const UPLOAD_IMAGE = 'job/UPLOAD_IMAGE';
const UPLOAD_IMAGE_SUCCESS = 'job/UPLOAD_IMAGE_SUCCESS';
const POST_JOB = 'job/POST_JOB';

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
export const uploadImage = createAction(UPLOAD_IMAGE);
export const postJob = createAction(POST_JOB);

function* uploadImageSaga({ payload }) {
  try {
    const res = yield axios.post(`${SERVER_URL}/api/jobs/upload`, payload);

    if (!res.data) return;

    yield put({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: res.data.url,
    });
  } catch (e) {
    console.error(e);
  }
}

function* postJobSaga({ payload }) {
  try {
    const res = yield axios.post(`${SERVER_URL}/api/jobs`, payload);

    console.log(res);
    if (!res.data) return;

    // yield put({
    //   type: UPLOAD_IMAGE_SUCCESS,
    //   payload: res.data.url,
    // });
  } catch (e) {
    console.error(e);
  }
}

export function* jobFormDataSaga() {
  yield takeLatest(UPLOAD_IMAGE, uploadImageSaga);
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
    [UPLOAD_IMAGE_SUCCESS]: (state, action) => ({
      ...state,
      jobData: {
        ...state.jobData,
        imgPath: action.payload,
      },
    }),
  },
  initialState
);

export default jobFormData;
