import { createAction, handleActions } from 'redux-actions';

const initialState = {
  deleteVisible: false,
  declarationJobVisible: false,
};

const CHANGE_DELETE_VISIBLE = 'jobModal/CHANGE_DELETE_VISIBLE';
const CHANGE_DECLARATION_JOB_VISIBLE = 'jobModal/CHANGE_DECLARATION_JOB_VISIBLE';

// 리덕스 액션 생성자
export const changeDeleteVisible = createAction(CHANGE_DELETE_VISIBLE);
export const changeDeclarationJobVisible = createAction(CHANGE_DECLARATION_JOB_VISIBLE);

const jobModal = handleActions(
  {
    [CHANGE_DELETE_VISIBLE]: (state, { payload }) => ({
      ...state,
      deleteVisible: payload,
    }),
    [CHANGE_DECLARATION_JOB_VISIBLE]: (state, { payload }) => ({
      ...state,
      declarationJobVisible: payload,
    }),
  },
  initialState
);

export default jobModal;
