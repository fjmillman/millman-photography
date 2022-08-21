import type { GalleryWithTagsAndImages } from '~/routes/galleries';
import type { PostWithTagsAndImages } from '~/routes/posts';
import type { SerializeObject } from '~/types';

export function unserializePost(post: SerializeObject<PostWithTagsAndImages>): PostWithTagsAndImages {
  return {
    ...post,
    publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
    tags: post.tags.map((tag) => ({
      ...tag,
      tag: {
        ...tag.tag,
        createdAt: new Date(tag.tag.createdAt),
        updatedAt: new Date(tag.tag.updatedAt),
      },
    })),
    images: post.images.map((image) => ({
      ...image,
      image: {
        ...image.image,
        createdAt: new Date(image.image.createdAt),
        updatedAt: new Date(image.image.updatedAt),
      },
    })),
  };
}

export function unserializeGallery(gallery: SerializeObject<GalleryWithTagsAndImages>): GalleryWithTagsAndImages {
  return {
    ...gallery,
    publishedAt: gallery.publishedAt ? new Date(gallery.publishedAt) : null,
    createdAt: new Date(gallery.createdAt),
    updatedAt: new Date(gallery.updatedAt),
    tags: gallery.tags.map((tag) => ({
      ...tag,
      tag: {
        ...tag.tag,
        createdAt: new Date(tag.tag.createdAt),
        updatedAt: new Date(tag.tag.updatedAt),
      },
    })),
    images: gallery.images.map((image) => ({
      ...image,
      image: {
        ...image.image,
        createdAt: new Date(image.image.createdAt),
        updatedAt: new Date(image.image.updatedAt),
      },
    })),
  };
}
