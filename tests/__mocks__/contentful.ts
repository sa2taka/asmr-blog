import { posts } from './postData';

export function fetchPosts(_page: number, _limit: number) {
  return posts;
}

export function fetchPostInCategory(
  _categorySlug: string,
  _page: number,
  _limit: number
) {
  return posts;
}

export function fetchPost(_slug: string) {
  return posts[0];
}
