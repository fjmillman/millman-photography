import { FC } from 'react';
import Link from 'next/link';

import { PostData } from 'controllers/Types';
import CardCollection from '../CardCollection';
import LinkButton from '../Buttons/LinkButton';
import MiniPreview from '../MiniPreview';

interface Props {
  posts: PostData[];
}

const BlogSection: FC<Props> = ({ posts }) => (
  <section>
    <div>
      <h1>Blog</h1>
      <h2>Find out what I&apos;ve been up to lately</h2>
      <CardCollection<PostData>
        entities={posts}
        selectKey={(post: PostData) => post.slug}
        selectImage={(post: PostData) => post.images[0]}
        renderContent={(post: PostData) => (
          <MiniPreview
            title={post.title}
            description={post.description}
            tags={post.tags}
            linkHref="blog/post/[slug]"
            linkAs={`blog/post/${post.slug}`}
          />
        )}
      />
      <div className="link">
        <Link href="blog">
          <LinkButton>Go to my blog</LinkButton>
        </Link>
      </div>
    </div>
    <style jsx>{`
      section {
        background-color: var(--colour-white);
        min-height: var(--size-80);
        box-shadow: 0 var(--size-1) var(--size-12) rgba(0, 0, 0, 0.5);

        position: relative;
        width: var(--size-screen-w);
        margin-left: -50vw;
        left: 50%;
      }

      section > div {
        max-width: var(--screen-lg);
        margin: auto;
        padding: var(--size-12);
        display: flex;
        flex-direction: column;
      }

      .link {
        margin: var(--size-12) auto 0 auto;
      }

      h1 {
        font-size: var(--size-6);
        font-weight: bold;
        margin-bottom: var(--size-1);
        text-align: center;
      }

      h2 {
        font-size: var(--size-4);
        margin-bottom: var(--size-8);
        text-align: center;
      }
    `}</style>
  </section>
);

export default BlogSection;
