import { createAction, handleActions } from 'redux-actions';
import { put, takeLatest } from 'redux-saga/effects';
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
};

const GET_JOB_LIST_ASYNC = 'job/GET_JOB_LIST';
const GET_JOB_LIST_ASYNC_SUCCESS = 'job/GET_JOB_LIST_ASYNC_SUCCESS';

export const getJobListAsync = createAction(GET_JOB_LIST_ASYNC);

function* getListSaga() {
  try {
    const res = yield axios.get(`${SERVER_URL}/api/jobs`);

    let tags = [];

    res.data.jobs.forEach(job => {
      tags = [...tags, ...job.skills];
    });

    yield put({
      type: GET_JOB_LIST_ASYNC_SUCCESS,
      payload: { jobs: res.data.jobs, tags: Array.from(new Set(tags)) },
    });
  } catch (e) {
    console.error(e);
  }
}

export function* jobSaga() {
  yield takeLatest(GET_JOB_LIST_ASYNC, getListSaga);
}

const job = handleActions(
  {
    [GET_JOB_LIST_ASYNC_SUCCESS]: (state, action) => ({
      jobs: action.payload.jobs,
      tags: action.payload.tags,
    }),
  },
  initialState
);

export default job;
