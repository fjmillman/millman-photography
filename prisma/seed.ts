import type { Tag , User } from '@prisma/client';
import { Status } from '@prisma/client';
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function main() {
    const userFixtures = [{
        email: 'admin@millmanphotography.co.uk',
        password: 'abc123',
        firstName: 'Freddie',
        lastName: 'Millman',
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

  const galleryFixtures = [
    {
        title: 'Landscape Gallery',
        slug: 'landscape-gallery',
        description: 'This is a landscape gallery',
        status: Status.Draft,
        publishedAt: null,
        tagId: getTagFromTagsBySlug(tags, 'landscape').id
      },
      {
        title: 'Architecture Gallery',
        slug: 'architecture-gallery',
        description: 'This is an architecture gallery',
        status: Status.Published,
        publishedAt: new Date(),
        tagId: getTagFromTagsBySlug(tags, 'architecture').id
      },
      {
        title: 'Portrait Gallery',
        slug: 'portrait-gallery',
        description: 'This is a portrait gallery',
        status: Status.Archived,
        publishedAt: new Date(),
        tagId: getTagFromTagsBySlug(tags, 'portrait').id
      }
  ]

  await Promise.all(galleryFixtures.map(({ tagId, ...gallery }) => prisma.gallery.upsert({
        where: { slug: gallery.slug },
        update: {},
        create: { ...gallery, tags: { create: { tagId }}},
      })))

      const postFixtures = [
        {
            title: 'Welcome to my blog',
            slug: 'welcome-to-my-blog',
            description: 'An introduction to who I am',
            content: '',
            status: Status.Draft,
            publishedAt: null,
            tagId: getTagFromTagsBySlug(tags, 'portait').id,
            authorId: getUserFromUsersByEmail(users, 'admin@millmanphotography.co.uk').id,
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
          },
          {
            title: 'Landscape Memory Lane',
            slug: 'landscape-memory-lane',
            description: 'A walk down memory lane with my landscapes',
            content: '',
            status: Status.Archived,
            publishedAt: new Date(),
            tagId: getTagFromTagsBySlug(tags, 'landscapes').id,
            authorId: getUserFromUsersByEmail(users, 'admin@millmanphotography.co.uk').id,
          }
      ]
    
      await Promise.all(postFixtures.map(({ tagId, ...post }) => prisma.post.upsert({
            where: { slug: post.slug },
            update: {},
            create: { ...post, tags: { create: { tagId }}},
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
