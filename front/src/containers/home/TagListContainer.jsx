import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TagList from '../../components/home/TagList';
import {
  changeMode,
  getJobListAsync,
  getTagListAsync,
  toggleTags,
  addTags,
  getJobTagsAsync,
  deleteTags,
  changeFindInputValue,
} from '../../modules/jobs';

const TagListContainer = () => {
  const rollingCnt = useSelector(state => state.jobs.rollingCnt);
  const mode = useSelector(state => state.jobs.mode);
  const tags = useSelector(state => state.jobs.tags);
  const selectedTags = useSelector(state => state.jobs.selectedTags);
  const openTags = useSelector(state => state.jobs.openTags);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === 'all' && rollingCnt === 0) {
      dispatch(getTagListAsync());
    }
  }, [dispatch, mode, rollingCnt]);

  const onClickAllBtn = useCallback(() => {
    dispatch(changeMode('all'));
    dispatch(getJobListAsync());
    dispatch(getTagListAsync());
    dispatch(changeFindInputValue(''));
  }, [dispatch]);

  const onOpenTags = useCallback(() => {
    dispatch(toggleTags());
  }, [dispatch]);

  const onClickTag = useCallback(
    tag => () => {
      dispatch(changeMode('tag'));
      dispatch(addTags(tag));
      dispatch(getJobTagsAsync());
    },
    [dispatch]
  );

  const onClickSelectedTag = useCallback(
    tag => () => {
      dispatch(deleteTags(tag));
      dispatch(getJobTagsAsync());

      if (selectedTags.length === 1) dispatch(changeMode('all'));
    },
    [dispatch, selectedTags.length]
  );

  return (
    <TagList
      mode={mode}
      tags={tags}
      selectedTags={selectedTags}
      openTags={openTags}
      onClickAllBtn={onClickAllBtn}
      onOpenTags={onOpenTags}
      onClickTag={onClickTag}
      onClickSelectedTag={onClickSelectedTag}
    />
  );
};

export default memo(TagListContainer);
