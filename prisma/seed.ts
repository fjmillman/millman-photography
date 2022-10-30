import type { Tag, User, Image } from '@prisma/client';
import { Status } from '@prisma/client';
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';
import cuid from 'cuid';
import { readFileSync } from 'fs';
import path from 'path';

import s3 from '../app/utils/s3';

const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.image.deleteMany()
  await prisma.post.deleteMany()
  await prisma.gallery.deleteMany()

  const userFixtures = [{
    email: 'admin@millmanphotography.co.uk',
    password: 'abc123',
    firstName: 'Test',
    lastName: 'Admin',
    isAdmin: true,
  }]

  const salt = await bcrypt.genSalt(10);

  const users = await Promise.all(userFixtures.map(async ({ password, ...user}) => {
    return await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        ...user,
        password: await bcrypt.hash(password, salt),
      },
    })
  }));

  const getUserFromUsersByEmail = (users: User[], email: string): User => {
  const user = users.find((user) => user.email === email)
    if (!user){
      throw new Error(`User with email (${email}) not found`)
    }
    return user;
  }

  const tagFixtures = [{ slug: 'landscape', name: 'Landscape' }, { slug: 'architecture', name: 'Architecture' }, { slug: 'portrait', name: 'Portrait' }, { slug: 'travel', name: 'Travel' }]

  const tags = await Promise.all(tagFixtures.map((tag) => prisma.tag.upsert({
    where: { slug: tag.slug },
    update: {},
    create: tag,
  })))

  const getTagFromTagsBySlug = (tags: Tag[], slug: string): Tag => {
    const tag = tags.find((tag) => tag.slug === slug)
    if (!tag){
        throw new Error(`Tag with slug (${slug}) not found`)
    }
    return tag
  }

  const clearImagesFromS3 = async () => {
    const { Contents } = await s3
      .listObjects({
        Bucket: process.env.S3_BUCKET_NAME || '',
      })
      .promise();

    if (!Contents) {
      return
    }

    for (const Content of Contents) {
      const { Key } = Content
      if (!Key) {
        continue
      }

      await s3
        .deleteObject({
          Bucket: process.env.S3_BUCKET_NAME || '',
          Key,
        })
        .promise();
    }
  }

  const uploadImageToS3 =  async (filename: string) => {
    const filepath = path.join(__dirname, `../app/images/${filename}`);
    const image = await readFileSync(filepath)
  
    const { Location } = await s3
      .upload({
        Bucket: process.env.S3_BUCKET_NAME || '',
        Key: `${cuid()}.${filename.split('.').slice(-1)}`,
        Body: image,
        ContentType: 'image/jpg',
      })
      .promise();

    return Location;
  }

  await clearImagesFromS3()
  const image1Url = await uploadImageToS3('example-1.jpg')
  const image2Url = await uploadImageToS3('example-2.jpg')
  const image3Url = await uploadImageToS3('example-3.jpg')

  const imageFixtures = [
    {
      slug: 'landscape',
      caption: 'A pretty landscape', 
      url: image1Url,
      tagId: getTagFromTagsBySlug(tags, 'landscape').id
    },
    {
      slug: 'architecture',
      caption: 'Gorgeous architecture', 
      url: image2Url,
      tagId: getTagFromTagsBySlug(tags, 'architecture').id
    },
    {
      slug: 'portrait',
      caption: 'Handsome face', 
      url: image3Url,
      tagId: getTagFromTagsBySlug(tags, 'portrait').id
    },
  ];

  const images = await Promise.all(imageFixtures.map(({ tagId, ...image }) => prisma.image.upsert({
    where: { slug: image.slug },
    update: {},
    create: { ...image, tags: { create: { tagId }}},
  })))

  const getImageFromImagesBySlug = (images: Image[], slug: string): Image => {
    const image = images.find((image) => image.slug === slug)
    if (!image){
      throw new Error(`Image with slug (${slug}) not found`)
    }
    return image
  }

  const galleryFixtures = [
    {
      title: 'Landscape Gallery',
      slug: 'landscape-gallery',
      description: 'This is a landscape gallery',
      status: Status.Draft,
      publishedAt: null,
      tagId: getTagFromTagsBySlug(tags, 'landscape').id,
      imageId: getImageFromImagesBySlug(images, 'landscape').id,
    },
    {
      title: 'Architecture Gallery',
      slug: 'architecture-gallery',
      description: 'This is an architecture gallery',
      status: Status.Published,
      publishedAt: new Date(),
      tagId: getTagFromTagsBySlug(tags, 'architecture').id,
      imageId: getImageFromImagesBySlug(images, 'architecture').id,
    },
    {
      title: 'Portrait Gallery',
      slug: 'portrait-gallery',
      description: 'This is a portrait gallery',
      status: Status.Archived,
      publishedAt: new Date(),
      tagId: getTagFromTagsBySlug(tags, 'portrait').id,
      imageId: getImageFromImagesBySlug(images, 'portrait').id,
    }
  ]

  await Promise.all(galleryFixtures.map(({ tagId, imageId, ...gallery }) => prisma.gallery.upsert({
    where: { slug: gallery.slug },
    update: {},
    create: { ...gallery, tags: { create: { tagId }}, images: { create: { imageId } }},
  })))

  const postFixtures = [
    {
      title: 'Welcome to my blog',
      slug: 'welcome-to-my-blog',
      description: 'An introduction to who I am',
      content: '',
      status: Status.Draft,
      publishedAt: null,
      tagId: getTagFromTagsBySlug(tags, 'portrait').id,
      authorId: getUserFromUsersByEmail(users, 'admin@millmanphotography.co.uk').id,
      imageId: getImageFromImagesBySlug(images, 'portrait').id,
    },
    {
      title: 'A Trip to Iceland',
      slug: 'a-trip-to-iceland',
      description: 'Reflecting on my trip to Iceland',
      content: '',
      status: Status.Published,
      publishedAt: new Date(),
      tagId: getTagFromTagsBySlug(tags, 'travel').id,
      authorId: getUserFromUsersByEmail(users, 'admin@millmanphotography.co.uk').id,
      imageId: getImageFromImagesBySlug(images, 'architecture').id,
    },
    {
      title: 'Landscape Memory Lane',
      slug: 'landscape-memory-lane',
      description: 'A walk down memory lane with my landscapes',
      content: '',
      status: Status.Archived,
      publishedAt: new Date(),
      tagId: getTagFromTagsBySlug(tags, 'landscape').id,
      authorId: getUserFromUsersByEmail(users, 'admin@millmanphotography.co.uk').id,
      imageId: getImageFromImagesBySlug(images, 'landscape').id,
    }
  ]
  
  await Promise.all(postFixtures.map(({ tagId, imageId, ...post }) => prisma.post.upsert({
    where: { slug: post.slug },
    update: {},
    create: { ...post, tags: { create: { tagId }}, images: { create: { imageId } }},
  })))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
