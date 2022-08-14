import type { Image } from '@prisma/client';
import type { Attributes } from 'react';

import Card from './components/Card';
import CardContent from './components/CardContent';

interface Props<T> {
  entities: T[];
  selectKey: (entity: T) => Attributes['key'];
  selectImage?: (entity: T) => Image;
  renderContent: (entity: T) => JSX.Element;
}

function CardCollection<T>({ entities, selectKey, selectImage, renderContent }: Props<T>) {
  return (
    <div className="grid gap-4 grid-cols-[auto-fit_minmax(900px,_1fr)]">
      {entities.map((entity: T) => (
        <Card key={selectKey(entity)} coverImage={selectImage && selectImage(entity)}>
          <CardContent>{renderContent(entity)}</CardContent>
        </Card>
      ))}
    </div>
  );
}

CardCollection.defaultProps = {
  selectImage: undefined,
};

export default CardCollection;
