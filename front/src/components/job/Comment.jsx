import React, { memo, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { replaceComment } from '../../modules/jobFormData';

const { Search } = Input;

const CommentBox = styled.div`
  margin-bottom: 5px;
  padding: 15px;
  border: 1px solid #eee;
  box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06), 0 5px 16px -1px rgba(8, 11, 14, 0.1);
  font-family: 'Noto Sans KR', sans-serif;

  > .comment-box-top {
    padding-bottom: 15px;

    > .user-id {
      display: inline-block;
      margin-right: 15px;
      font-weight: 900;
    }

    > .comment-date {
      padding-top: 5px;
    }
  }

  .comment {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const Comment = ({ comment, match }) => {
  const [modify, setModify] = useState(false);
  const [value, setValue] = useState(comment.comment);
  const dispatch = useDispatch();

  const onClickCommentModifyBtn = () => {
    setModify(prevModify => !prevModify);
  };

  const onReplaceComment = value => {
    console.log(value);
    dispatch(replaceComment({ jobId: match.params.id, commentId: comment._id, newComment: value }));
    setModify(prevModify => !prevModify);
  };

  const onChangeValue = e => {
    setValue(e.target.value);
  };

  return (
    <CommentBox>
      <div className='comment-box-top'>
        <p className='user-id'>{comment.userId}</p>
        {!modify && (
          <Button size='small' onClick={onClickCommentModifyBtn}>
            수정
          </Button>
        )}
        <p className='comment-date'>{comment.registerDate.slice(0, 10)}</p>
      </div>
      {!modify && <p className='comment'>{comment.comment}</p>}
      {modify && <Search value={value} allowClear enterButton='작성' size='large' onSearch={onReplaceComment} onChange={onChangeValue} />}
    </CommentBox>
  );
};

export default memo(withRouter(Comment));
