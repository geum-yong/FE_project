import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import user, { userSaga } from './user';
import jobs, { jobSaga } from './jobs';
import jobFormData from './jobFormData';

const rootReducer = combineReducers({
  user,
  jobs,
  jobFormData,
});

export function* rootSaga() {
  yield all([userSaga(), jobSaga()]);
}

export default rootReducer;
