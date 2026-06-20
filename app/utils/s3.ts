import {
  DeleteObjectCommand,
  paginateListObjectsV2,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
  waitUntilObjectNotExists,
  type PutObjectRequest,
} from '@aws-sdk/client-s3';
import { awsCredentialsProvider } from '@vercel/functions/oidc';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: awsCredentialsProvider({
    roleArn: process.env.AWS_ROLE_ARN ?? '',
  }),
  forcePathStyle: true,
  endpoint: 'http://localhost:4569',
});

export const listObjects = async (bucket: string, pageSize: number) => {
  const objects: string[] = [];

  try {
    const paginator = paginateListObjectsV2({ client: s3, pageSize }, { Bucket: bucket });

    for await (const page of paginator) {
      for (const { Key } of page.Contents ?? []) {
        if (Key) {
          objects.push(Key);
        }
      }
    }

    return objects;
  } catch (caught) {
    if (caught instanceof S3ServiceException && caught.name === 'NoSuchBucket') {
      console.error(`Error from S3 while listing objects for "${bucket}". The bucket doesn't exist.`);
    } else if (caught instanceof S3ServiceException) {
      console.error(`Error from S3 while listing objects for "${bucket}".  ${caught.name}: ${caught.message}`);
    } else {
      throw caught;
    }
  }
};

export const uploadObject = async (
  bucket: string,
  key: string,
  body: PutObjectRequest['Body'],
): Promise<string | undefined> => {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
  });

  try {
    await s3.send(command);

    return `https://${bucket}.s3.${s3.config.region.toString()}.amazonaws.com/${key}`;
  } catch (err) {
    if (err instanceof S3ServiceException && err.name === 'EntityTooLarge') {
      console.error(
        `Error from S3 while uploading object to ${bucket}. \
The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
or the multipart upload API (5TB max).`,
      );
    } else if (err instanceof S3ServiceException) {
      console.error(`Error from S3 while uploading object to ${bucket}.  ${err.name}: ${err.message}`);
    } else {
      throw err;
    }
  }

  return undefined;
};

export const deleteObject = async (bucket: string, key: string) => {
  const cmd = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  try {
    await s3.send(cmd);

    await waitUntilObjectNotExists({ client: s3, maxWaitTime: 10 }, { Bucket: bucket, Key: key });
  } catch (err) {
    if (err instanceof S3ServiceException && err.name === 'NoSuchBucket') {
      console.error(`Error from S3 while deleting object from ${bucket}. The bucket doesn't exist.`);
    } else if (err instanceof S3ServiceException) {
      console.error(`Error from S3 while deleting object from ${bucket}.  ${err.name}: ${err.message}`);
    } else {
      throw err;
    }
  }
};

export default s3;
