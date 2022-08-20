import type { Image } from '@prisma/client';

import CardCollection from './CardCollection';
import Pagination from './Pagination';

interface Props<T> {
  isLoading: boolean;
  entities: T[];
  selectKey: (entity: T) => string;
  selectImage: (entity: T) => Image;
  renderContent: (entity: T) => JSX.Element;
  fallback: JSX.Element;
  currentPage: number;
  totalPages: number;
  onPagination: (page: number) => void;
}

function PageCollection<T>({
  isLoading,
  entities,
  selectKey,
  selectImage,
  renderContent,
  fallback,
  currentPage,
  totalPages,
  onPagination,
}: Props<T>) {
  if (isLoading) {
    return <p>Is loading...</p>;
  }

  if (entities.length <= 0) {
    return fallback;
  }

  return (
    <>
      <CardCollection<T>
        entities={entities}
        selectKey={selectKey}
        selectImage={selectImage}
        renderContent={renderContent}
      />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPagination={onPagination} />
    </>
  );
}

export default PageCollection;
