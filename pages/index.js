import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/Layout/Layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>
          Hello, I'm <strong>Kseniia</strong>. I'm a frontend developer. You can
          contact me on <a href="https://t.me/kledovskaia">Telegram</a>
        </p>
      </section>
    </Layout>
  );
}
