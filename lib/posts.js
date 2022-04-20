import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/.md$/, '');

    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort(({ date: a }, { date: b }) =>
    a > b ? 1 : a === b ? 0 : -1
  );
}

export function getAllPostsIds() {
  const fileNames = fs.readdirSync(postDirectory);
  return fileNames.map((fileName) => fileName.replace(/.md$/, ''));
}

export async function getPostData(id) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHTML = processedContent.toString();

  return {
    id,
    data,
    contentHTML,
  };
}
