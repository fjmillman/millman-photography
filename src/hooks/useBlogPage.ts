import { useEffect, useCallback } from 'react';

import { PostData } from 'controllers/Types';
import { useThunkDispatch, useTypedSelector, RootState } from 'store';
import { initialisePosts, setCurrentPage } from 'store/Blog/Slice';
import { fetchPosts } from 'store/Blog/Effects';

const useBlogPage = (initialPosts: PostData[], initialAfter: string | null) => {
  const {
    isInitialised,
    isFetching,
    error,
    posts,
    after,
    currentPage,
    latestPage,
  } = useTypedSelector((state: RootState) => state.blog);

  const dispatch = useThunkDispatch();

  useEffect(() => {
    if (!isInitialised) {
      dispatch(initialisePosts({ posts: initialPosts, after: initialAfter }));
    }
  }, [dispatch, initialAfter, initialPosts, isInitialised]);

  const handleOnPagination = useCallback(
    (page: number) => {
      if (page > latestPage) {
        dispatch(fetchPosts());
        return;
      }

      dispatch(setCurrentPage(page));
    },
    [dispatch, latestPage]
  );

  return {
    state: {
      isFetching,
      error,
      currentPosts: !isInitialised ? initialPosts : posts[currentPage],
      currentPage,
      latestPage,
      hasMorePages: !!after,
    },
    actions: { handleOnPagination },
  };
};

export default useBlogPage;
