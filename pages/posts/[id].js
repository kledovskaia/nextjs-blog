import Head from 'next/head';
import Date from '../../components/Date/Date';
import Layout from '../../components/Layout/Layout';
import { getPostData, getAllPostsIds } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticPaths() {
  const ids = getAllPostsIds();
  const paths = ids.map((id) => ({
    params: { id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await getPostData(params.id);
  return {
    props: {
      post,
    },
  };
}

export default function Post({ post }) {
  return (
    <Layout>
      <Head>
        <title>{post.data.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.data.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.data.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHTML }} />
      </article>
    </Layout>
  );
}
