import { Attributes } from 'react';

import Row from './components/Row';
import RowContent from './components/RowContent';
import { Image } from '../../controllers/Types';

interface Props<T> {
  entities: T[];
  selectKey: (entity: T) => Attributes['key'];
  selectImage?: (entity: T) => Image;
  renderContent: (entity: T) => JSX.Element;
}

function RowCollection<T>({
  entities,
  selectKey,
  selectImage,
  renderContent,
}: Props<T>) {
  return (
    <>
      {entities.map((entity: T) => (
        <Row
          key={selectKey(entity)}
          coverImage={selectImage && selectImage(entity)}
        >
          <RowContent>{renderContent(entity)}</RowContent>
        </Row>
      ))}
    </>
  );
}

RowCollection.defaultProps = {
  selectImage: undefined,
};

export default RowCollection;
