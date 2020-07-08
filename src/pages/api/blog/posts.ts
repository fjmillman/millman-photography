import { NextApiRequest, NextApiResponse } from 'next';

import { fetchPosts } from '../../../controllers/BlogController';
import { PostSearchFilters } from '../../../store/Blog/Types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const filters = (await req.body) as PostSearchFilters;

  try {
    const { posts, after } = await fetchPosts(filters);

    res.status(200).json({
      posts,
      after,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
