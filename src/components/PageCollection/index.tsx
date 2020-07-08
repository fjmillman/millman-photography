import Pagination from '../Pagination';
import CardCollection from '../CardCollection';
import { Image } from '../../controllers/Types';

interface Props<T> {
  entities: T[];
  selectKey: (entity: T) => string;
  selectImage: (entity: T) => Image;
  renderContent: (entity: T) => JSX.Element;
  fallback: JSX.Element;
  currentPage: number;
  latestPage: number;
  hasMorePages: boolean;
  onPagination: (page: number) => void;
}

function PageCollection<T>({
  entities,
  selectKey,
  selectImage,
  renderContent,
  fallback,
  currentPage,
  latestPage,
  hasMorePages,
  onPagination,
}: Props<T>) {
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
      {(latestPage > 1 || hasMorePages) && (
        <Pagination
          currentPage={currentPage}
          latestPage={latestPage}
          hasMorePages={hasMorePages}
          onPagination={onPagination}
        />
      )}
    </>
  );
}

export default PageCollection;
