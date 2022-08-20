import { Link } from '@remix-run/react';
import type { FC } from 'react';

import type { PostWithTagsAndImages } from '~/routes/posts';

import LinkButton from '../Buttons/LinkButton';
import CardCollection from '../CardCollection';
import MiniPreview from '../MiniPreview';

type Props = {
  posts: PostWithTagsAndImages[];
};

const BlogSection: FC<Props> = ({ posts }) => (
  <section className="bg-white shadow-md relative w-screen ml-[-50vw] left-1/2">
    <div className="max-w-screen-lg m-auto p-12 flex flex-col">
      <h1 className="text-xl font-bold mb-1 text-center">Blog</h1>
      <h2 className="text-lg mb-8 text-center">Find out what I&apos;ve been up to lately</h2>
      <CardCollection<PostWithTagsAndImages>
        entities={posts}
        selectKey={(post: PostWithTagsAndImages) => post.slug}
        selectImage={(post: PostWithTagsAndImages) => post.images[0].image}
        renderContent={(post: PostWithTagsAndImages) => (
          <MiniPreview
            title={post.title}
            description={post.description}
            tags={post.tags.map(({ tag }) => tag)}
            linkTo={`/posts/${post.slug}`}
          />
        )}
      />
      <div className="text-md font-bold mt-12 mx-auto">
        <Link to="/blog">
          <LinkButton>Go to my blog</LinkButton>
        </Link>
      </div>
    </div>
  </section>
);

export default BlogSection;
