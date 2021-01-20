import React, { memo, useCallback, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { replaceComment } from '../../modules/jobFormData';

require('dotenv').config();

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

    > .modify-btn {
      margin-right: 8px;
    }

    > .declaration-btn {
      border: 1px solid #ac6363;
      background: #ac6363;
    }

    > .comment-date {
      padding-top: 5px;
    }
  }

  .comment {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const Comment = ({ comment, jobId, companyName, match }) => {
  const [modify, setModify] = useState(false);
  const [value, setValue] = useState(comment.comment);
  const userToken = useSelector(state => state.user.token);
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

  const [declarationJobVisible, setDeclarationJobVisible] = useState(false);
  const declarationJobTitle = useRef();
  const declarationJobId = useRef();
  const declarationJobDescription = useRef();

  const onClickDeclarationBtn = () => {
    setDeclarationJobVisible(true);
  };

  const declarationJobProcess = useCallback(async () => {
    const data = {
      title: declarationJobTitle.current.value,
      id: declarationJobId.current.value,
      description: declarationJobDescription.current.value,
      sender: userToken,
    };

    await emailjs.send(process.env.REACT_APP_EMAIL_ID, process.env.REACT_APP_TEMPLATE_ID, data, process.env.REACT_APP_USER_ID);

    setDeclarationJobVisible(false);
  }, [userToken]);

  const cancelDeclarationJob = () => {
    setDeclarationJobVisible(false);
  };

  return (
    <CommentBox>
      <div className='comment-box-top'>
        <p className='user-id'>{comment.userId}</p>
        {userToken === comment.writer && !modify && (
          <Button className='modify-btn' size='small' onClick={onClickCommentModifyBtn}>
            수정
          </Button>
        )}
        <Button className='declaration-btn' type='primary' size='small' danger onClick={onClickDeclarationBtn}>
          신고
        </Button>
        <p className='comment-date'>{comment.registerDate.slice(0, 10)}</p>
      </div>
      {!modify && <p className='comment'>{comment.comment}</p>}
      {modify && <Search value={value} allowClear enterButton='작성' size='large' onSearch={onReplaceComment} onChange={onChangeValue} />}

      <Modal
        visible={declarationJobVisible}
        title='🚨 신고합니다!'
        onOk={declarationJobProcess}
        onCancel={cancelDeclarationJob}
        footer={[
          <Button key='back' onClick={cancelDeclarationJob}>
            취소
          </Button>,
          <Button key='submit' danger type='primary' onClick={declarationJobProcess}>
            신고
          </Button>,
        ]}
      >
        <p>여러분들의 신고는 사이트를 깨끗하게 유지하는데 큰 힘이 됩니다.</p>
        <p>아래 양식에 맞춰 신고 내용을 입력해주시면 빠르게 조치를 취하겠습니다.</p>
        <label htmlFor='declarationJobTitle' style={{ display: 'block', marginTop: 10 }}>
          신고 제목
        </label>
        <input
          type='text'
          id='declarationJobTitle'
          name='declarationJobTitle'
          autoComplete='off'
          ref={declarationJobTitle}
          defaultValue='댓글을 신고합니다.'
          style={{ padding: '0 10px', width: '100%', border: '1px solid #000' }}
        />
        <label htmlFor='jobId' style={{ display: 'block' }}>
          신고 댓글
        </label>
        <input
          type='text'
          id='jobId'
          name='jobId'
          ref={declarationJobId}
          value={`${jobId} - ${companyName} - ${comment._id}`}
          style={{ padding: '0 10px', width: '100%' }}
          disabled
        />
        <label htmlFor='declarationJobDecription' style={{ display: 'block' }}>
          신고 내용
        </label>
        <textarea
          id='declarationJobDecription'
          name='declarationJobDecription'
          ref={declarationJobDescription}
          style={{ padding: '0 10px', width: '100%', border: '1px solid #000' }}
        ></textarea>
      </Modal>
    </CommentBox>
  );
};

export default memo(withRouter(Comment));
