import type { Image } from '@prisma/client-generated';
import type { Attributes, ReactNode } from 'react';

import Row from './components/Row';
import RowContent from './components/RowContent';

interface Props<T> {
  entities: T[];
  selectKey: (entity: T) => Attributes['key'];
  selectImage?: (entity: T) => Image;
  renderContent: (entity: T) => ReactNode;
}

function RowCollection<T>({ entities, selectKey, selectImage, renderContent }: Props<T>) {
  return (
    <>
      {entities.map((entity: T) => (
        <Row key={selectKey(entity)} coverImage={selectImage?.(entity)}>
          <RowContent>{renderContent(entity)}</RowContent>
        </Row>
      ))}
    </>
  );
}

export default RowCollection;
