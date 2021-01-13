import React from 'react';
import styled from 'styled-components';
import { Tag, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const TagSection = styled.section`
  padding-top: 15px;
  text-align: center;

  > div {
    line-height: 1.8;

    > span {
      cursor: pointer;

      > span {
        margin-left: 7px;
        font-size: 10px;
      }
    }
  }

  @media (min-width: 768px) {
    > div {
      margin: 0 auto;
      width: 500px;
    }
  }
`;

const TagList = ({ mode, tags, selectedTags, openTags, onClickAllBtn, onOpenTags, onClickTag, onClickSelectedTag }) => {
  return (
    <TagSection>
      {mode === 'all' || mode === 'tag' ? (
        <div>
          {selectedTags &&
            selectedTags.map(tag => (
              <Tag key={tag} color='green' onClick={onClickSelectedTag(tag)}>
                {tag}
                <CloseOutlined />
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
