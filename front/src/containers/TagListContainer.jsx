import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TagList from '../components/TagList';
import { changeMode, getJobListAsync, getTagListAsync, toggleTags, addTags, getJobTagsAsync } from '../modules/job';

const TagListContainer = () => {
  const mode = useSelector(state => state.job.mode);
  const tags = useSelector(state => state.job.tags);
  const selectTags = useSelector(state => state.job.selectedTags);
  const openTags = useSelector(state => state.job.openTags);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTagListAsync());
  }, [dispatch]);

  const onClickAllBtn = useCallback(() => {
    dispatch(getJobListAsync());
    dispatch(getTagListAsync());
    dispatch(changeMode('all'));
  }, [dispatch]);

  const onOpenTags = useCallback(() => {
    dispatch(toggleTags());
  }, [dispatch]);

  const onClickTag = useCallback(
    tag => () => {
      dispatch(addTags(tag));
      dispatch(getJobTagsAsync());
    },
    [dispatch]
  );

  return (
    <TagList
      mode={mode}
      tags={tags}
      selectTags={selectTags}
      openTags={openTags}
      onClickAllBtn={onClickAllBtn}
      onOpenTags={onOpenTags}
      onClickTag={onClickTag}
    />
  );
};

export default memo(TagListContainer);
