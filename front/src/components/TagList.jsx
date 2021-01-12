import React from 'react';
import styled from 'styled-components';
import { Tag, Button } from 'antd';

const TagSection = styled.section`
  padding-top: 15px;
  text-align: center;

  > div {
    line-height: 1.8;

    > span {
      cursor: pointer;
    }
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

const TagList = ({ mode, tags, selectTags, openTags, onClickAllBtn, onOpenTags, onClickTag }) => {
  return (
    <TagSection>
      {mode === 'all' ? (
        <div>
          {selectTags &&
            selectTags.map(tag => (
              <Tag key={tag} color='green' closable onClose={log}>
                {tag}
              </Tag>
            ))}
          {tags &&
            tags.map((tag, i) => {
              if (i > 5 && !openTags) return null;
              return (
                <Tag key={tag} color='blue' onClick={onClickTag(tag)}>
                  {tag}
                </Tag>
              );
            })}
          {tags.length > 6 &&
            (!openTags ? (
              <Tag key={'openBtn'} color='volcano' onClick={onOpenTags}>
                . . .
              </Tag>
            ) : (
              <Tag key={'closeBtn'} color='volcano' onClick={onOpenTags}>
                닫기
              </Tag>
            ))}
        </div>
      ) : (
        <Button type='primary' onClick={onClickAllBtn}>
          전체 공고 보기
        </Button>
      )}
    </TagSection>
  );
};

export default TagList;
