import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import cuid from 'cuid';
import { data, redirect } from 'react-router';

import s3 from '~/utils/s3';

import type { Route } from './+types/admin.images.upload';

export interface ErrorResponseData {
  error: string;
}

export const action = async ({ request }: Route.ActionArgs) => {
  const { fileName, contentType } = (await request.json()) as { fileName: string; contentType: string };

  try {
    const { url, fields } = await createPresignedPost(s3, {
      Bucket: process.env.AWS_BUCKET_NAME ?? '',
      Key: `${cuid()}.${fileName.split('.').slice(-1)[0]}`,
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10 MB
        ['starts-with', '$Content-Type', contentType],
      ],
      Fields: {
        acl: 'public-read',
        'Content-Type': contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    });

    return data({ url, fields });
  } catch (error) {
    return data<ErrorResponseData>(
      {
        error:
          typeof error === 'object' && !!error && 'message' in error && typeof error.message === 'string'
            ? error.message
            : 'Failed to ',
      },
      { status: 400 },
    );
  }
};

export const loader = () => redirect('/admin/images');
