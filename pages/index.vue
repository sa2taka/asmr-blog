<template>
  <v-layout column justify-center align-center>
    <reviews :reviews="reviews" />
  </v-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import { FullReview } from '@/types/entry';
import { fetchFullReviews } from '~/libs/firebase';
import Reviews from '@/components/Organisms/reviews.vue';

@Component({
  components: {
    Reviews,
  },
})
export default class IndexPage extends Vue {
  page!: number;
  limit = 20;
  reviews!: FullReview[];

  async asyncData(context: Context) {
    const page = decidePage(context);
    // const limit = 20; // hard code because "this" is not accessable

    const reviews = await fetchFullReviews();

    return {
      page,
      reviews,
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
.blog-title {
  font-size: 1.6em;
}
</style>
