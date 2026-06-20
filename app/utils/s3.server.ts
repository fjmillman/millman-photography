import { type FileUpload, parseFormData } from '@mjackson/form-data-parser';
import cuid from 'cuid';

import { deleteObject, uploadObject } from './s3';

const uploadHandler = async (fileUpload: FileUpload) => {
  if (!fileUpload.fieldName) {
    throw new Error('Filename is missing');
  }

  const bucketName = process.env.AWS_BUCKET_NAME ?? '';
  const key = `${cuid()}.${fileUpload.fieldName.split('.').slice(-1)[0]}`;
  const url = await uploadObject(bucketName, key, fileUpload.stream());

  return url;
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
  const bucketName = process.env.AWS_BUCKET_NAME ?? '';
  const key = location.split('/').slice(-1)[0];

  await deleteObject(bucketName, key);
};
