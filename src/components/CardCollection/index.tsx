import { Attributes } from 'react';

import Card from './components/Card';
import CardContent from './components/CardContent';
import { Image } from '../../controllers/Types';

interface Props<T> {
  entities: T[];
  selectKey: (entity: T) => Attributes['key'];
  selectImage?: (entity: T) => Image;
  renderContent: (entity: T) => JSX.Element;
}

function CardCollection<T>({
  entities,
  selectKey,
  selectImage,
  renderContent,
}: Props<T>) {
  return (
    <div className="card-collection">
      {entities.map((entity: T) => (
        <Card
          key={selectKey(entity)}
          coverImage={selectImage && selectImage(entity)}
        >
          <CardContent>{renderContent(entity)}</CardContent>
        </Card>
      ))}
      <style jsx>{`
        .card-collection {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(var(--size-56), 1fr));
          grid-gap: var(--size-4);
        }
      `}</style>
    </div>
  );
}

CardCollection.defaultProps = {
  selectImage: undefined,
};

export default CardCollection;
