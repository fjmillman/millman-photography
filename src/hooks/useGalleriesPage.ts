import { useCallback, useEffect } from 'react';

import { GalleryData } from 'controllers/Types';
import { useThunkDispatch, useTypedSelector, RootState } from 'store';
import { initialiseGalleries, setCurrentPage } from 'store/Galleries/Slice';
import { fetchGalleries } from 'store/Galleries/Effects';

const useGalleriesPage = (
  initialGalleries: GalleryData[],
  initialAfter: string | null
) => {
  const {
    isInitialised,
    isFetching,
    error,
    galleries,
    after,
    currentPage,
    latestPage,
  } = useTypedSelector((state: RootState) => state.galleries);

  const dispatch = useThunkDispatch();

  useEffect(() => {
    if (!isInitialised) {
      dispatch(
        initialiseGalleries({
          galleries: initialGalleries,
          after: initialAfter,
        })
      );
    }
  }, [dispatch, initialAfter, initialGalleries, isInitialised]);

  const handleOnPagination = useCallback(
    (page: number) => {
      if (page > latestPage) {
        dispatch(fetchGalleries());
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
      currentGalleries: !isInitialised
        ? initialGalleries
        : galleries[currentPage],
      currentPage,
      latestPage,
      hasMorePages: !!after,
    },
    actions: { handleOnPagination },
  };
};

export default useGalleriesPage;
