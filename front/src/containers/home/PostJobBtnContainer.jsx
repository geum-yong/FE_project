import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostJobBtn from '../../components/home/PostJobBtn';

const PostJobBtnContainer = () => {
  const loginState = useSelector(state => state.user.login);

  return <PostJobBtn loginState={loginState} />;
};

export default memo(withRouter(PostJobBtnContainer));
