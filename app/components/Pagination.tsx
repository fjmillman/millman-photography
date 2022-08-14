import type { FC } from 'react';

import IconButton from './Buttons/IconButton';

type Props = {
  currentPage: number;
  totalPages: number;
  onPagination: (page: number) => void;
};

const Pagination: FC<Props> = ({ currentPage, totalPages, onPagination }) => (
  <div className="flex-row mt-4">
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
    {currentPage < totalPages - 1 && (
      <IconButton onClick={() => onPagination(currentPage + 1)}>
        <p>{currentPage + 1}</p>
      </IconButton>
    )}
    {currentPage < totalPages && (
      <IconButton onClick={() => onPagination(totalPages)}>
        <p>{totalPages}</p>
      </IconButton>
    )}
  </div>
);

export default Pagination;
