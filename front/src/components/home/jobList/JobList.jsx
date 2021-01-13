import React from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'antd';
import JobCardContainer from '../../../containers/home/jobList/JobCardContainer';

const JobSection = styled.section`
  display: grid;
  row-gap: 30px;
  padding-top: 50px;
  flex-grow: 1;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 15px;
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const MoreBtn = styled(Button)`
  margin: 50px auto 0;
  width: 200px;
`;

const JobList = ({ jobs, totalJobsCnt, isModalVisible, handleOk, handleCancel, onClickMoreBtn }) => {
  return (
    <>
      <JobSection>
        <h2 className='a11y-hidden'>job 리스트</h2>
        {jobs.length === 0 ? <p>조회 결과가 없습니다.</p> : jobs.map(job => <JobCardContainer key={job.id} job={job} />)}
      </JobSection>
      {jobs.length < totalJobsCnt && (
        <MoreBtn type='primary' size={'large'} onClick={onClickMoreBtn}>
          더보기
        </MoreBtn>
      )}
      <Modal title='로그인 필요' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>회사에 대한 상세정보를 보기 위해서는 로그인이 필요합니다.</p>
        <p>로그인 화면으로 이동할까요?</p>
      </Modal>
    </>
  );
};

export default JobList;
