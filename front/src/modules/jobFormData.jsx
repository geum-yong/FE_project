import { createAction, handleActions } from 'redux-actions';
import { put, takeLatest, select, throttle } from 'redux-saga/effects';

require('dotenv').config();

const axios = require('axios');

const initialState = {
  liked: false,
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
    likeCnt: '',
    checked: false,
    comments: [],
  },
  skillSetting: {
    inputVisible: false,
    inputValue: '',
  },
};

const CHANGE_IMAGE = 'job/CHANGE_IMAGE';
const CHANGE_PREVIEW_URL = 'job/CHANGE_PREVIEW_URL';
const CHANGE_INPUT_VALUE = 'job/CHANGE_INPUT_VALUE';
const CHANGE_TAG_VISIBLE = 'job/CHANGE_TAG_VISIBLE';
const CHANGE_TAG_INPUT_VALUE = 'job/CHANGE_TAG_INPUT_VALUE';
const CHANGE_TAGS = 'job/CHANGE_TAGS';
const CHANGE_DATE = 'job/CHANGE_DATE';
const CHANGE_CHECK = 'job/CHANGE_CHECK';

const GET_LIKED_BOOL_SUCCESS = 'job/GET_LIKED_BOOL_SUCCESS';
const POST_JOB = 'job/POST_JOB';
const POST_JOB_SUCCESS = 'job/POST_JOB_SUCCESS';
const GET_JOB = 'job/GET_JOB';
const GET_JOB_SUCCESS = 'job/GET_JOB_SUCCESS';
const PUT_LIKE_JOB = 'job/PUT_LIKE_JOB';
const PUT_LIKE_JOB_SUCCESS = 'job/PUT_LIKE_JOB_SUCCESS';
const PUT_UNLIKE_JOB = 'job/PUT_UNLIKE_JOB';
const PUT_UNLIKE_JOB_SUCCESS = 'job/PUT_UNLIKE_JOB_SUCCESS';
const PUT_COMMENT = 'job/POST_COMMENT';
const PUT_COMMENT_SUCCESS = 'job/PUT_COMMENT_SUCCESS';
const REPLACE_COMMENT = 'job/REPLACE_COMMENT';

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
export const getJob = createAction(GET_JOB);
export const putLikeJob = createAction(PUT_LIKE_JOB);
export const putUnlikeJob = createAction(PUT_UNLIKE_JOB);
export const putComment = createAction(PUT_COMMENT);
export const replaceComment = createAction(REPLACE_COMMENT);

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

function* getJobSaga({ payload }) {
  try {
    const jobRes = yield axios.get(`${process.env.REACT_APP_SERVER_URL}/api/jobs/${payload.jobId}`);
    const userRes = yield axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${payload.userToken}`);

    if (!jobRes.data || !userRes.data) return;

    const likedBool = userRes.data.user.userLikes.includes(+payload.jobId);

    yield put({
      type: GET_JOB_SUCCESS,
      payload: { job: jobRes.data.job, likedBool },
    });
  } catch (e) {
    console.error(e);
  }
}

function* putLikeJobSaga({ payload }) {
  try {
    const id = yield select(state => state.user.token);

    yield axios.put(`${process.env.REACT_APP_SERVER_URL}/api/users/like`, { id, jobId: payload });
    const { data } = yield axios.put(`${process.env.REACT_APP_SERVER_URL}/api/jobs/like`, { jobId: payload });

    if (!data) return;

    yield put({
      type: PUT_LIKE_JOB_SUCCESS,
      payload: data.num,
    });
  } catch (e) {
    console.error(e);
  }
}

function* putunlikeJobSaga({ payload }) {
  try {
    const id = yield select(state => state.user.token);

    yield axios.put(`${process.env.REACT_APP_SERVER_URL}/api/users/unlike`, { id, jobId: payload });
    const { data } = yield axios.put(`${process.env.REACT_APP_SERVER_URL}/api/jobs/unlike`, { jobId: payload });
    console.log(data);

    if (data === '') return;

    yield put({
      type: PUT_UNLIKE_JOB_SUCCESS,
      payload: data.num,
    });
  } catch (e) {
    console.error(e);
  }
}

function* putCommentSaga({ payload }) {
  const id = yield select(state => state.user.token);

  const commentsRes = yield axios.put(`${process.env.REACT_APP_SERVER_URL}/api/jobs/addComment`, {
    id,
    jobId: payload.jobId,
    comment: payload.comment,
  });

  yield put({
    type: PUT_COMMENT_SUCCESS,
    payload: commentsRes.data.comments,
  });
}

function* replaceCommentSaga({ payload }) {
  const commentsRes = yield axios.put(`${process.env.REACT_APP_SERVER_URL}/api/jobs/replaceComment`, {
    jobId: payload.jobId,
    commentId: payload.commentId,
    newComment: payload.newComment,
  });

  yield put({
    type: PUT_COMMENT_SUCCESS,
    payload: commentsRes.data.comments,
  });
}

export function* jobFormDataSaga() {
  yield takeLatest(POST_JOB, postJobSaga);
  yield takeLatest(GET_JOB, getJobSaga);
  yield throttle(1000, PUT_LIKE_JOB, putLikeJobSaga);
  yield throttle(1000, PUT_UNLIKE_JOB, putunlikeJobSaga);
  yield throttle(1000, PUT_COMMENT, putCommentSaga);
  yield throttle(1000, REPLACE_COMMENT, replaceCommentSaga);
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
    [GET_LIKED_BOOL_SUCCESS]: (state, action) => ({
      ...state,
      liked: action.payload,
    }),
    [POST_JOB_SUCCESS]: state => ({
      ...state,
      jobData: {
        ...state.jobData,
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
    [GET_JOB_SUCCESS]: (state, { payload }) => ({
      ...state,
      liked: payload.likedBool,
      jobData: {
        ...state.jobData,
        imgPath: payload.job.imgPath,
        companyName: payload.job.companyName,
        experienceLevel: payload.job.experienceLevel,
        introduce: payload.job.introduce,
        task: payload.job.task,
        condition: payload.job.condition,
        preferentialTreatment: payload.job.preferentialTreatment,
        skills: payload.job.skills,
        welfare: payload.job.welfare,
        deadline: payload.job.deadline,
        selectedDate: payload.job.selectedDate,
        address1: payload.job.address1,
        address2: payload.job.address2,
        source: payload.job.source,
        other: payload.job.other,
        likeCnt: payload.job.cntLike,
        comments: payload.job.comments.reverse(),
      },
    }),
    [PUT_LIKE_JOB_SUCCESS]: (state, { payload }) => ({
      ...state,
      liked: !state.liked,
      jobData: {
        ...state.jobData,
        likeCnt: payload,
      },
    }),
    [PUT_UNLIKE_JOB_SUCCESS]: (state, { payload }) => ({
      ...state,
      liked: !state.liked,
      jobData: {
        ...state.jobData,
        likeCnt: payload,
      },
    }),
    [PUT_COMMENT_SUCCESS]: (state, { payload }) => ({
      ...state,
      jobData: {
        ...state.jobData,
        comments: payload.reverse(),
      },
    }),
  },
  initialState
);

export default jobFormData;
