import React from 'react';
import styled from 'styled-components';

const Introduce = () => {
  const IntroSection = styled.section`
    padding-top: 50px;
    text-align: center;

    > h2 {
      font-family: 'dohyeon';
      font-size: 20px;
    }

    > p {
      margin-top: 10px;
      line-height: 1.6;
      font-size: 9px;
      color: #707379;
    }

    @media (min-width: 768px) {
      padding: 100px 0 0;

      > h2 {
        font-size: 48px;
      }

      > p {
        margin-top: 20px;
        font-size: 17px;
        line-height: 1.3;
      }
    }
  `;

  return (
    <IntroSection>
      <h2>프론트엔드 개발자 모여라!</h2>
      <p>
        내가 지원할 수 있는 회사를 찾아보세요.
        <br />
        프론트엔드 개발자를 구인하는 회사 공고를 공유해보세요.
        <br />
        여러분의 합격을 기원합니다!
      </p>
    </IntroSection>
  );
};

export default Introduce;
