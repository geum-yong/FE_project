import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import user, { userSaga } from './user';
import job, { jobSaga } from './job';

const rootReducer = combineReducers({
  user,
  job,
});

export function* rootSaga() {
  yield all([userSaga(), jobSaga()]);
}

export default rootReducer;
