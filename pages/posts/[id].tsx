import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Date from '../../components/Date/Date';
import Layout from '../../components/Layout/Layout';
import { getPostData, getAllPostsIds } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = getAllPostsIds();
  const paths = ids.map((id) => ({
    params: { id },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostData(params.id.toString());
  return {
    props: {
      post,
    },
  };
};

export default function Post({ post }) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHTML }} />
      </article>
    </Layout>
  );
}
