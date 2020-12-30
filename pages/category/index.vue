<template>
  <v-layout column justify-center align-center>
    <breadcrumbs :list="breadcrumbsList"></breadcrumbs>
    <h2 class="center-title">カテゴリ</h2>
    <nav>
      <ul class="categories">
        <li v-for="category in categories" :key="category.sys.id">
          <v-btn
            :to="{
              name: 'category-slug',
              params: { slug: category.fields.slug },
            }"
            outlined
            class="ml-2 mt-2"
            >{{ category.fields.name }}</v-btn
          >
        </li>
      </ul>
    </nav>
  </v-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import { confirmExistingCategory } from '@/libs/contentful';
import { Category as ICategory } from '@/types/entry';
import { generateCategoriesBreadcrumbsList } from '@/libs/breadcrumbsGenerator';

import Breadcrumbs from '@/components/Atom/breadcrumbs.vue';

interface CategoryWithCount {
  category: ICategory;
  count: number;
}

@Component({
  components: {
    Breadcrumbs,
  },
})
export default class Category extends Vue {
  categories!: CategoryWithCount[];

  async asyncData(context: Context) {
    return {
      categories: await fetchCategoriesIfExist(
        context.store.state.categories.categories
      ),
    };
  }

  get breadcrumbsList() {
    return generateCategoriesBreadcrumbsList();
  }

  head() {
    return {
      title: 'カテゴリ - ',
      meta: [{ name: 'robots', content: 'noindex,nofollow' }],
    };
  }
}

const fetchCategoriesIfExist = (categories: ICategory[]) => {
  return Promise.all(
    categories.map((category) => {
      return confirmExistingCategory(category.sys.id).then((isExist) => {
        return {
          isExist,
          category,
        };
      });
    })
  ).then((categoriesWithExist) => {
    return categoriesWithExist.filter((e) => e.isExist).map((e) => e.category);
  });
};
</script>

<style scoped>
ul {
  list-style: none;
}

.center-title {
  text-align: center;
}

.categories {
  display: flex;
  flex-wrap: wrap;
}
</style>
