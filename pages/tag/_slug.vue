<template>
  <v-layout column justify-center align-center>
    <breadcrumbs :list="breadcrumbsList"></breadcrumbs>
    <div class="tag-title">{{ tag.name }}</div>
    <posts :posts="reviews" />
  </v-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import { Review, Tag } from '@/types/entry';
import { generateTagBreadcrumbsList } from '@/libs/breadcrumbsGenerator';

import Reviews from '@/components/Organisms/reviews.vue';
import Breadcrumbs from '@/components/Atom/breadcrumbs.vue';
import { fetchReviewContainsTag, fetchTagBySlug } from '~/libs/firebase';

@Component({
  components: {
    Reviews,
    Breadcrumbs,
  },
})
export default class CategorySlug extends Vue {
  reviews!: Review[];
  page!: number;
  tag!: Tag;

  async asyncData(context: Context) {
    const page = decidePage(context);
    // const limit = 20; // hard code because "this" is not access

    const tag = await fetchTagBySlug(context.params.slug);
    const reviews = await fetchReviewContainsTag(tag.id);

    return {
      page,
      reviews,
      tag,
    };
  }

  get breadcrumbsList() {
    return generateTagBreadcrumbsList(this.tag);
  }

  head() {
    return {
      title: this.tag.name + ' - ',
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
.tag-title {
  font-size: 1.4em;
}
</style>
