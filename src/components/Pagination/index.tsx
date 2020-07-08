import { FC } from 'react';

import IconButton from '../Buttons/IconButton';

interface Props {
  currentPage: number;
  latestPage: number;
  hasMorePages: boolean;
  onPagination: (page: number) => void;
}

const Pagination: FC<Props> = ({
  currentPage,
  latestPage,
  hasMorePages,
  onPagination,
}) => (
  <div>
    {currentPage > 1 && (
      <IconButton onClick={() => onPagination(1)}>
        <p>1</p>
      </IconButton>
    )}
    {currentPage > 2 && (
      <IconButton onClick={() => onPagination(currentPage - 1)}>
        <p>{currentPage - 1}</p>
      </IconButton>
    )}
    <IconButton onClick={() => onPagination(currentPage)}>
      <p>{currentPage}</p>
    </IconButton>
    {currentPage < latestPage - 1 && (
      <IconButton onClick={() => onPagination(currentPage + 1)}>
        <p>{currentPage + 1}</p>
      </IconButton>
    )}
    {currentPage < latestPage && (
      <IconButton onClick={() => onPagination(latestPage)}>
        <p>{latestPage}</p>
      </IconButton>
    )}
    {hasMorePages && (
      <IconButton onClick={() => onPagination(latestPage + 1)}>
        <p>{latestPage + 1}</p>
      </IconButton>
    )}
    <style jsx>{`
      div {
        display: flex;
        flex-direction: row;
        margin-top: var(--size-4);
      }
    `}</style>
  </div>
);

export default Pagination;
