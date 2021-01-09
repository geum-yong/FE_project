const initialState = {
  login: false,
  token: '',
  email: '',
  likes: [],
};

const CHANGE_LOGIN = 'user/CHANGE_LOGIN';

export const changeLogin = () => ({ type: CHANGE_LOGIN });

const user = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOGIN:
      return {
        ...state,
        login: !state.login,
      };

    default:
      return state;
  }
};

export default user;
