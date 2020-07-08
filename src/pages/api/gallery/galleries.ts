import { NextApiRequest, NextApiResponse } from 'next';

import { fetchGalleries } from '../../../controllers/GalleryController';
import { GallerySearchFilters } from '../../../store/Galleries/Types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const filters = (await req.body) as GallerySearchFilters;

  try {
    const { galleries, after } = await fetchGalleries(filters);

    res.status(200).json({
      galleries,
      after,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
