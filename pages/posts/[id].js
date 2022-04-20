import Layout from '../../components/Layout/Layout';
import { getPostData, getAllPostsIds } from '../../lib/posts';

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
      <h1>{post.data.title}</h1>
      <h4>{post.data.date}</h4>
      <div dangerouslySetInnerHTML={{ __html: post.contentHTML }} />
    </Layout>
  );
}
