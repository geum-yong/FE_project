import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import user, { userSaga } from './user';
import jobs, { jobsSaga } from './jobs';
import jobFormData, { jobFormDataSaga } from './jobFormData';
import jobModal from './jobModal';

const rootReducer = combineReducers({
  user,
  jobs,
  jobFormData,
  jobModal,
});

export function* rootSaga() {
  yield all([userSaga(), jobsSaga(), jobFormDataSaga()]);
}

export default rootReducer;
