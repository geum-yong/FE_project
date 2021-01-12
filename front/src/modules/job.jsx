import { createAction, handleActions } from 'redux-actions';
import { put, select, takeLatest, throttle } from 'redux-saga/effects';
import SERVER_URL from '../lib/serverUrl';

const axios = require('axios');

const initialState = {
  jobs: [
    {
      id: 0,
      userId: '',
      imgPath: '',
      companyName: '',
      experienceLevel: 0,
      introduce: '',
      task: '',
      condition: '',
      preferentialTreatment: '',
      skills: [],
      welfare: '',
      deadline: '',
      address1: '',
      address2: '',
      source: '',
      other: '',
      cntLike: 0,
      comments: [],
    },
  ],
  tags: [],
  selectedTags: [],
  openTags: false,
  isModalVisible: false,
  mode: 'all',
  rollingCnt: 0,
};

const SHOW_MODAL = 'job/SHOW_MODAL';
const CLOSE_MODAL = 'job/CLOSE_MODAL';
const CHANGE_MODE = 'job/CHANGE_MODE';
const TOGGLE_TAGS = 'job/TOGGLE_TAGS';
const SELECT_TAGS = 'job/SELECT_TAGS';

const GET_TAG_LIST_ASYNC = 'job/GET_TAG_LIST_ASYNC';
const GET_TAG_LIST_ASYNC_SUCCESS = 'job/GET_TAG_LIST_ASYNC_SUCCES';
const GET_JOB_LIST_ASYNC = 'job/GET_JOB_LIST';
const GET_JOB_LIST_ASYNC_SUCCESS = 'job/GET_JOB_LIST_ASYNC_SUCCESS';
const GET_JOB_FIND_ASYNC = 'job/GET_JOB_FIND_ASYNC';
const GET_JOB_TAGS_ASYNC = 'job/GET_JOB_TAGS_ASYNC';
// const GET_JOB_TAGS_ASYNC_SUCCESS = 'job/GET_JOB_TAGS_ASYNC_SUCCESS';

export const showModal = createAction(SHOW_MODAL);
export const closeModal = createAction(CLOSE_MODAL);
export const changeMode = createAction(CHANGE_MODE);
export const toggleTags = createAction(TOGGLE_TAGS);
export const addTags = createAction(SELECT_TAGS);

export const getTagListAsync = createAction(GET_TAG_LIST_ASYNC);
export const getJobListAsync = createAction(GET_JOB_LIST_ASYNC);
export const getJobFindAsync = createAction(GET_JOB_FIND_ASYNC);
export const getJobTagsAsync = createAction(GET_JOB_TAGS_ASYNC);

function* getTagsSaga() {
  try {
    const res = yield axios.get(`${SERVER_URL}/api/jobs/tags`);

    yield put({
      type: GET_TAG_LIST_ASYNC_SUCCESS,
      payload: res.data.tags,
    });
  } catch (e) {
    console.error(e);
  }
}

function* getListSaga() {
  try {
    const res = yield axios.get(`${SERVER_URL}/api/jobs`);

    yield put({
      type: GET_JOB_LIST_ASYNC_SUCCESS,
      payload: res.data.jobs,
    });
  } catch (e) {
    console.error(e);
  }
}

function* getFindJobSaga({ payload }) {
  try {
    const res = yield axios.get(`${SERVER_URL}/api/jobs/find/${payload}`);

    yield put({
      type: GET_JOB_LIST_ASYNC_SUCCESS,
      payload: res.data.jobs,
    });
  } catch (e) {
    console.error(e);
  }
}

function* getListTagsSaga() {
  try {
    const selectTags = yield select(state => state.job.selectedTags);
    const tagString = selectTags.join(' ');
    const res = yield axios.get(`${SERVER_URL}/api/jobs/tags/${tagString}`);

    yield put({
      type: GET_JOB_LIST_ASYNC_SUCCESS,
      payload: res.data.jobs,
    });
  } catch (e) {
    console.error(e);
  }
}

export function* jobSaga() {
  yield takeLatest(GET_TAG_LIST_ASYNC, getTagsSaga);
  yield takeLatest(GET_JOB_LIST_ASYNC, getListSaga);
  yield throttle(2000, GET_JOB_FIND_ASYNC, getFindJobSaga);
  yield takeLatest(GET_JOB_TAGS_ASYNC, getListTagsSaga);
}

const job = handleActions(
  {
    [GET_JOB_LIST_ASYNC_SUCCESS]: (state, action) => ({
      ...state,
      jobs: action.payload,
    }),
    [SHOW_MODAL]: state => ({
      ...state,
      isModalVisible: true,
    }),
    [CLOSE_MODAL]: state => ({
      ...state,
      isModalVisible: false,
    }),
    [CHANGE_MODE]: (state, action) => ({
      ...state,
      mode: action.payload,
      rollingCnt: 0,
    }),
    [GET_TAG_LIST_ASYNC_SUCCESS]: (state, action) => ({
      ...state,
      tags: action.payload,
      selectedTags: [],
    }),
    [TOGGLE_TAGS]: state => ({
      ...state,
      openTags: !state.openTags,
    }),
    [SELECT_TAGS]: (state, action) => {
      const tagArr = [...state.tags];
      const selectedTagArr = [...state.selectedTags];

      tagArr.splice(tagArr.indexOf(action.payload), 1);
      selectedTagArr.push(action.payload);

      return {
        ...state,
        tags: tagArr,
        selectedTags: selectedTagArr,
      };
    },
  },
  initialState
);

export default job;
