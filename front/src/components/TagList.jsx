import React from 'react';
import styled from 'styled-components';
import { Tag } from 'antd';

const TagSection = styled.section`
  padding-top: 15px;

  > div {
    line-height: 1.8;
  }

  @media (min-width: 768px) {
    > div {
      margin: 0 auto;
      width: 500px;
    }
  }
`;

function log(e) {
  console.log(e);
}

const TagList = () => {
  return (
    <TagSection>
      <div>
        <Tag color='green' closable onClose={log}>
          Tag 2
        </Tag>
        <Tag color='green' closable onClose={log}>
          Tag 2
        </Tag>
        <Tag color='blue'>blue</Tag>
        <Tag color='blue'>blue</Tag>
        <Tag color='blue'>blue</Tag>
        <Tag color='blue'>blue</Tag>
        <Tag color='blue'>blue</Tag>
        <Tag color='blue'>blue</Tag>
        <Tag color='volcano'>. . .</Tag>
      </div>
    </TagSection>
  );
};

export default TagList;
