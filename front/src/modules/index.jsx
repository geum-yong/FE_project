import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import user, { userSaga } from './user';
import jobs, { jobSaga } from './jobs';

const rootReducer = combineReducers({
  user,
  jobs,
});

export function* rootSaga() {
  yield all([userSaga(), jobSaga()]);
}

export default rootReducer;
