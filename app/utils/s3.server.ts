import { type FileUpload, parseFormData } from '@mjackson/form-data-parser';
import cuid from 'cuid';

import s3 from './s3';

const uploadHandler = async (fileUpload: FileUpload) => {
  if (!fileUpload.fieldName) {
    throw new Error('Filename is missing');
  }

  const get = await s3
    .upload({
      Bucket: process.env.S3_BUCKET_NAME ?? '',
      Key: `${cuid()}.${fileUpload.fieldName.split('.').slice(-1)[0]}`,
      Body: fileUpload.stream(),
    });

  return get.Body.transformToString();
};

export const uploadImage = async (request: Request) => {
  const formData = await parseFormData(request, uploadHandler);

  const file = formData.get('image');
  if (!file) {
    throw new Error('Image is missing');
  }

  return file.valueOf();
};

export const deleteImage = async (location: string) => {
  await s3
    .deleteObject({
      Bucket: process.env.S3_BUCKET_NAME ?? '',
      Key: location.split('/').slice(-1)[0],
    })
    .promise();
};
