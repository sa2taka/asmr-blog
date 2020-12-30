<template>
  <v-layout column justify-center align-center>
    <breadcrumbs :list="breadcrumbsList"></breadcrumbs>
    <div class="category-title">{{ category.fields.name }}</div>
    <posts :posts="posts" />
  </v-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import { fetchPostInCategory } from '@/libs/contentful';
import { Post, MultipleItem, Category } from '@/types/entry';
import { generateCategoryBreadcrumbsList } from '@/libs/breadcrumbsGenerator';

import Posts from '@/components/Organisms/posts.vue';
import Breadcrumbs from '@/components/Atom/breadcrumbs.vue';

@Component({
  components: {
    Posts,
    Breadcrumbs,
  },
})
export default class CategorySlug extends Vue {
  posts!: Post[];
  page!: number;
  category!: Category;

  async asyncData(context: Context) {
    const page = decidePage(context);
    const limit = 20; // hard code because "this" is not access
    const category = context.store.state.categories.categories.find(
      (category: Category) => category.fields.slug === context.route.params.slug
    );

    const posts: Post[] = await fetchPostInCategory(
      context.route.params.slug,
      page,
      limit
    ).then((posts: MultipleItem<Post>) =>
      posts.items.map((item) => {
        item.fields.body = '';
        return item;
      })
    );

    return {
      page,
      posts,
      category,
    };
  }

  get breadcrumbsList() {
    return generateCategoryBreadcrumbsList(this.category);
  }

  head() {
    return {
      title: this.category.fields.name + ' カテゴリ - ',
      meta: [{ name: 'robots', content: 'noindex,nofollow' }],
    };
  }
}

// page setting
const decidePage = (context: Context) => {
  const pageQuery = context.query.page;
  if (typeof pageQuery !== 'string') {
    return 0;
  }

  if (pageQuery === '') {
    return 0;
  }

  const pageQueryNum = parseInt(pageQuery, 10);

  if (isNaN(pageQueryNum) || pageQueryNum < 0) {
    return 0;
  }

  return pageQueryNum - 1;
};
</script>

<style scoped>
.category-title {
  font-size: 1.4em;
}
</style>
