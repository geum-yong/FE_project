import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostBtn = styled(Link)`
  position: fixed;
  bottom: 15px;
  right: 15px;
  padding: 15px 17px;
  border-radius: 50%;
  font-family: 'hannaPro';
  font-size: 18px;
  color: #fff;
  background: #1890ff;
  transition: background 0.3s;

  &:hover {
    color: #fff;
    background: #53aafc;
  }

  @media (min-width: 768px) {
    bottom: 50px;
    right: 50px;
  }

  @media (min-width: 992px) {
  }
`;

const PostJobBtn = () => {
  return (
    <PostBtn to='/jobForm'>
      공고
      <br />
      등록
    </PostBtn>
  );
};

export default PostJobBtn;
