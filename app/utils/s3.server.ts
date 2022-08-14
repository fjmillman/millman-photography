import type { UploadHandler } from '@remix-run/node';
import { unstable_parseMultipartFormData } from '@remix-run/node';
import cuid from 'cuid';

import s3 from './s3';

const uploadHandler: UploadHandler = async ({ filename, contentType, data }) => {
  if (!filename) {
    throw new Error('Filename is missing');
  }

  const { Location } = await s3
    .upload({
      Bucket: process.env.S3_BUCKET_NAME || '',
      Key: `${cuid()}.${filename.split('.').slice(-1)}`,
      Body: data,
      ContentType: contentType,
    })
    .promise();

  return Location;
};

export const uploadImage = async (request: Request) => {
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);

  const file = formData.get('image');
  if (!file) {
    throw new Error('Image is missing');
  }

  return file.toString();
};

export const deleteImage = async (location: string) => {
  await s3
    .deleteObject({
      Bucket: process.env.S3_BUCKET_NAME || '',
      Key: `${location.split('/').slice(-1)}`,
    })
    .promise();
};
