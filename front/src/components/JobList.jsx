import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import JobCard from './JobCard';

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

const JobList = ({ jobs }) => {
  return (
    <>
      <JobSection>
        <h2 className='a11y-hidden'>job 리스트</h2>
        {jobs.map(job => (
          <Link to={`/job/${job.id}`} key={job.id}>
            <JobCard job={job} />
          </Link>
        ))}
      </JobSection>
      {jobs.length > 9 && (
        <MoreBtn type='primary' size={'large'}>
          더보기
        </MoreBtn>
      )}
    </>
  );
};

export default JobList;
