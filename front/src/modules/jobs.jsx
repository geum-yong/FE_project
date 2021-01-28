import { createAction, handleActions } from 'redux-actions';
import { debounce, put, select, takeLatest, throttle } from 'redux-saga/effects';

require('dotenv').config();

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
      preferentialTreatment: '', // 우대사항
      skills: [], // 기술스택 ["react", "vue"]
      welfare: '',
      deadline: '',
      address1: '',
      address2: '',
      source: '',
      other: '',
      cntLike: 0,
      comments: [
        {
          writer: '', // 유저 이메일
          comment: '',
          registerDate: '',
          updaterDate: '',
        },
      ],
    },
  ],
  totalJobCnt: 0,
  tags: [], // 전체 공고의 보유 기술 집합
  selectedTags: [], // 선택한 보유 기술
  openTags: false, // 나머지 태그 보기
  isModalVisible: false, // 미로그인 시 모달창 보이기
  mode: 'all', // 리스트 렌더링 타입 'all' / 'find' / 'tag' / 'like'
  rollingCnt: 0, // 더보기 클릭 횟수
  findInputValue: '',
};

const SHOW_MODAL = 'job/SHOW_MODAL';
const CLOSE_MODAL = 'job/CLOSE_MODAL';
const CHANGE_MODE = 'job/CHANGE_MODE';
const TOGGLE_TAGS = 'job/TOGGLE_TAGS';
const SELECT_TAGS = 'job/SELECT_TAGS';
const DELETE_TAGS = 'job/DELETE_TAGS';
const UP_ROLLING_COUNT = 'job/UP_ROLLING_COUNT';
const CHANGE_FIND_INPUT_VALUE = 'job/CHANGE_FIND_INPUT_VALUE';

const GET_TAG_LIST_ASYNC = 'job/GET_TAG_LIST_ASYNC';
const GET_TAG_LIST_ASYNC_SUCCESS = 'job/GET_TAG_LIST_ASYNC_SUCCES';
const GET_JOB_LIST_ASYNC = 'job/GET_JOB_LIST';
const GET_JOB_LIST_ASYNC_SUCCESS = 'job/GET_JOB_LIST_ASYNC_SUCCESS';
const GET_JOB_FIND_ASYNC = 'job/GET_JOB_FIND_ASYNC';
const GET_JOB_TAGS_ASYNC = 'job/GET_JOB_TAGS_ASYNC';
const GET_JOB_MORE_ASYNC = 'job/GET_JOB_MORE_ASYNC';
const GET_JOB_MORE_ASYNC_SUCCESS = 'job/GET_JOB_MORE_ASYNC_SUCCESS';
const DELETE_JOB = 'job/DELETE_JOB';
const GET_JOB_LIKE_LIST_ASYNC = 'job/GET_JOB_LIKE_LIST_ASYNC';

// 리덕스 액션 생성자
export const showModal = createAction(SHOW_MODAL);
export const closeModal = createAction(CLOSE_MODAL);
export const changeMode = createAction(CHANGE_MODE);
export const toggleTags = createAction(TOGGLE_TAGS);
export const addTags = createAction(SELECT_TAGS);
export const deleteTags = createAction(DELETE_TAGS);
export const upRollingCount = createAction(UP_ROLLING_COUNT);
export const changeFindInputValue = createAction(CHANGE_FIND_INPUT_VALUE);

// 사가 액션 생성자
export const getTagListAsync = createAction(GET_TAG_LIST_ASYNC);
export const getJobListAsync = createAction(GET_JOB_LIST_ASYNC);
export const getJobFindAsync = createAction(GET_JOB_FIND_ASYNC);
export const getJobTagsAsync = createAction(GET_JOB_TAGS_ASYNC);
export const getJobMoreAsync = createAction(GET_JOB_MORE_ASYNC);
export const deleteJobAsync = createAction(DELETE_JOB);
export const getJobLikeListAsync = createAction(GET_JOB_LIKE_LIST_ASYNC);

function* getTagsSaga() {
  try {
    const res = yield axios.get(`${process.env.REACT_APP_SERVER_URL}/api/jobs/tags`);

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
    const res = yield axios.get(`${process.env.REACT_APP_SERVER_URL}/api/jobs`);

    yield put({
      type: GET_JOB_LIST_ASYNC_SUCCESS,
      payload: { jobs: res.data.jobs, jobsCnt: res.data.jobsCnt },
    });
  } catch (e) {
    console.error(e);
  }
}

function* getFindJobSaga() {
  try {
    const findInputValue = yield select(state => state.jobs.findInputValue);
    const res = yield axios.get(`${process.env.REACT_APP_SERVER_URL}/api/jobs/find/${findInputValue}`);

    yield put({
      type: GET_JOB_LIST_ASYNC_SUCCESS,
      payload: { jobs: res.data.jobs, jobsCnt: res.data.jobsCnt },
    });
  } catch (e) {
    console.error(e);
  }
}

function* getListTagsSaga() {
  try {
    let res;
    const selectTags = yield select(state => state.jobs.selectedTags);

    if (selectTags.length > 0) {
      const tagString = selectTags.join(' ');
      res = yield axios.get(`${process.env.REACT_APP_SERVER_URL}/api/jobs/tags/${tagString}`);
    } else {
      res = yield axios.get(`${process.env.REACT_APP_SERVER_URL}/api/jobs`);
    }

    yield put({
      type: GET_JOB_LIST_ASYNC_SUCCESS,
      payload: { jobs: res.data.jobs, jobsCnt: res.data.jobsCnt },
    });
  } catch (e) {
    console.error(e);
  }
}

function* getListMoreSaga() {
  try {
    let res;
    const mode = yield select(state => state.jobs.mode);
    const rollingCnt = yield select(state => state.jobs.rollingCnt);

    if (mode === 'all') {
      res = yield axios.get(`${process.env.REACT_APP_SERVER_URL}/api/jobs?rollingCnt=${rollingCnt}`);
    } else if (mode === 'tag') {
      const selectTags = yield select(state => state.jobs.selectedTags);
      const tagString = selectTags.join(' ');
      res = yield axios.get(`${process.env.REACT_APP_SERVER_URL}/api/jobs/tags/${tagString}?rollingCnt=${rollingCnt}`);
    } else if (mode === 'find') {
      const findInputValue = yield select(state => state.jobs.findInputValue);
      res = yield axios.get(`${process.env.REACT_APP_SERVER_URL}/api/jobs/find/${findInputValue}?rollingCnt=${rollingCnt}`);
    }

    // console.log(res.data.jobs);

    yield put({
      type: GET_JOB_MORE_ASYNC_SUCCESS,
      payload: res.data.jobs,
    });
  } catch (e) {
    console.error(e);
  }
}

function* deleteJobSaga({ payload }) {
  try {
    yield axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/jobs/${payload}`);
  } catch (e) {
    console.error(e);
  }
}

function* getLikeJobSaga() {
  try {
    const userToken = yield select(state => state.user.token);
    const res = yield axios.get(`${process.env.REACT_APP_SERVER_URL}/api/jobs/like/${userToken}`);

    yield put({
      type: GET_JOB_LIST_ASYNC_SUCCESS,
      payload: { jobs: res.data.jobs, jobsCnt: 0 },
    });
  } catch (e) {
    console.error(e);
  }
}

export function* jobsSaga() {
  yield takeLatest(GET_TAG_LIST_ASYNC, getTagsSaga);
  yield takeLatest(GET_JOB_LIST_ASYNC, getListSaga);
  yield debounce(500, GET_JOB_FIND_ASYNC, getFindJobSaga);
  yield takeLatest(GET_JOB_TAGS_ASYNC, getListTagsSaga);
  yield takeLatest(GET_JOB_MORE_ASYNC, getListMoreSaga);
  yield throttle(1000, DELETE_JOB, deleteJobSaga);
  yield takeLatest(GET_JOB_LIKE_LIST_ASYNC, getLikeJobSaga);
}

const job = handleActions(
  {
    [GET_JOB_LIST_ASYNC_SUCCESS]: (state, action) => ({
      ...state,
      jobs: action.payload.jobs,
      totalJobCnt: action.payload.jobsCnt,
      rollingCnt: 0,
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
    [DELETE_TAGS]: (state, action) => {
      const tagArr = [...state.tags];
      const selectedTagArr = [...state.selectedTags];

      selectedTagArr.splice(selectedTagArr.indexOf(action.payload), 1);
      tagArr.push(action.payload);

      return {
        ...state,
        tags: tagArr,
        selectedTags: selectedTagArr,
      };
    },
    [UP_ROLLING_COUNT]: state => ({
      ...state,
      rollingCnt: state.rollingCnt + 1,
    }),
    [CHANGE_FIND_INPUT_VALUE]: (state, action) => ({
      ...state,
      findInputValue: action.payload,
    }),
    [GET_JOB_MORE_ASYNC_SUCCESS]: (state, action) => ({
      ...state,
      jobs: [...state.jobs, ...action.payload],
    }),
  },
  initialState
);

export default job;
