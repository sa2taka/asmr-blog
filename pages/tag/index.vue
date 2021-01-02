<template>
  <v-layout column justify-center align-center>
    <breadcrumbs :list="breadcrumbsList"></breadcrumbs>
    <h2 class="center-title">タグ</h2>
    <nav>
      <ul class="categories">
        <li v-for="tag in tags" :key="tag.slug">
          <v-btn
            :to="{
              name: 'category-slug',
              params: { slug: tag.slug },
            }"
            outlined
            class="ml-2 mt-2"
            >{{ tag.name }}</v-btn
          >
        </li>
      </ul>
    </nav>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { Tag } from '@/types/entry';
import { generateTagsBreadcrumbsList } from '@/libs/breadcrumbsGenerator';

import Breadcrumbs from '@/components/Atom/breadcrumbs.vue';
import { fetchTags } from '~/libs/firebase';

@Component({
  components: {
    Breadcrumbs,
  },
})
export default class Category extends Vue {
  tags!: Tag[];

  async asyncData() {
    return {
      tags: await fetchTags(),
    };
  }

  get breadcrumbsList() {
    return generateTagsBreadcrumbsList();
  }

  head() {
    return {
      title: 'カテゴリ - ',
      meta: [{ name: 'robots', content: 'noindex,nofollow' }],
    };
  }
}
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
