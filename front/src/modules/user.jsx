import { createAction, handleActions } from 'redux-actions';
import { put, takeLatest, throttle } from 'redux-saga/effects';
import SERVER_URL from '../lib/serverUrl';

const axios = require('axios');

const initialState = {
  login: false,
  token: '',
  email: '',
  likes: [], // 관심회사 Id 집합
};

const LOGIN_ASYNC = 'user/LOGIN_ASYNC';
const LOGIN_SUCCESS = 'user/LOGIN_ASYNC_SUCCESS';
const CHECK_USER_ASYNC = 'user/CHECK_USER_ASYNC';
const LOGOUT = 'user/LOGOUT';

// 리덕스 액션 생성자
export const logout = createAction(LOGOUT);

// 사가 액션 생성자
export const getUserAsync = createAction(LOGIN_ASYNC);
export const checkUserAsync = createAction(CHECK_USER_ASYNC);

function* LoginSaga({ payload }) {
  try {
    let res = yield axios.get(`${SERVER_URL}/api/users/${payload.googleId}`);

    if (res.data.message === 'find fail') {
      res = yield axios.post(`${SERVER_URL}/api/users`, {
        id: payload.googleId,
        email: payload.profileObj.email,
      });
    }

    yield put({
      type: LOGIN_SUCCESS,
      payload: res.data.user,
    });
  } catch (e) {
    console.error(e);
  }
}

function* checkUserSaga({ payload }) {
  try {
    const res = yield axios.get(`${SERVER_URL}/api/users/${payload}`);

    if (res.data.message === 'find fail') return;

    yield put({
      type: LOGIN_SUCCESS,
      payload: res.data.user,
    });
  } catch (e) {
    console.error(e);
  }
}

export function* userSaga() {
  yield throttle(2000, LOGIN_ASYNC, LoginSaga);
  yield takeLatest(CHECK_USER_ASYNC, checkUserSaga);
}

const user = handleActions(
  {
    [LOGIN_SUCCESS]: (state, action) => ({
      login: true,
      token: action.payload.id,
      email: action.payload.email,
      likes: action.payload.userLikes,
    }),
    [LOGOUT]: () => ({
      login: false,
      token: '',
      email: '',
      likes: [],
    }),
  },
  initialState
);

export default user;
