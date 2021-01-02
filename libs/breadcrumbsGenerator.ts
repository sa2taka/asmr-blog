import { Tag, FullReview, Circle } from '@/types/entry';

export interface BreadcrumbsItem {
  disabled?: boolean;
  exact?: boolean;
  href?: string;
  link?: boolean;
  text?: string | number;
  to?: string | object;
}

export type BreadcrumbsList = BreadcrumbsItem[];

export const topPageItem: BreadcrumbsItem = {
  disabled: false,
  exact: true,
  link: true,
  text: 'ホーム',
  to: '/',
};

export const generateCircleItem = () => {
  return {
    disabled: false,
    exact: true,
    link: true,
    text: 'サークル一覧',
    to: '/circle',
  };
};

export const generateTagItem = () => {
  return {
    disabled: false,
    exact: true,
    link: true,
    text: 'タグ一覧',
    to: '/tag',
  };
};

export const generateCirclesBreadcrumbsList = () => {
  const item = generateCircleItem();
  item.disabled = true;
  return [topPageItem, item];
};

export const generateTagsBreadcrumbsList = () => {
  const item = generateTagItem();
  item.disabled = true;
  return [topPageItem, item];
};

export const generateCircleBreadcrumbsList = (circle: Circle) => {
  const list: BreadcrumbsList = [topPageItem, generateCircleItem()];
  const circleItem: BreadcrumbsItem = {
    disabled: true,
    exact: true,
    link: true,
    text: circle.name,
    to: `/circle/${circle.slug}`,
  };
  list.push(circleItem);

  return list;
};

export const generateTagBreadcrumbsList = (tag: Tag) => {
  const list: BreadcrumbsList = [topPageItem, generateCircleItem()];
  const circleItem: BreadcrumbsItem = {
    disabled: true,
    exact: true,
    link: true,
    text: tag.name,
    to: `/tag/${tag.slug}`,
  };
  list.push(circleItem);

  return list;
};

export function generateReviewBreadcrumbsList(review: FullReview) {
  const list: BreadcrumbsList = generateCircleBreadcrumbsList(
    review.product.circle
  );
  list[list.length - 1].disabled = false;

  const psotItem: BreadcrumbsItem = {
    disabled: true,
    exact: true,
    link: true,
    text: review.title,
    to: `/review/${review.slug}`,
  };
  list.push(psotItem);

  return list;
}
