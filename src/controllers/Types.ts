export interface Tag {
  slug: string;
  name: string;
}

export interface Image {
  slug: string;
  caption: string;
  url: string;
}

export interface ImageData extends Image {
  tags: Tag[];
}

export interface Gallery {
  title: string;
  slug: string;
  description: string;
  status: string;
  dateCreated: string;
  datePublished: string | null;
  dateUpdated: string;
}

export interface Post {
  title: string;
  slug: string;
  description: string;
  body: string;
  status: string;
  dateCreated: string;
  datePublished: string | null;
  dateUpdated: string;
}

export interface GalleryData extends Gallery {
  images: Image[];
  tags: Tag[];
}

export interface PostData extends Post {
  images: Image[];
  tags: Tag[];
}
