<template>
  <div v-if="reviews.length !== 0" class="reviews">
    <card-review
      v-for="review in reviews"
      :key="review.id"
      :review="review"
      class="mt-6"
    />
  </div>
  <div v-else>投稿が見つかりません</div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';
import { Review } from '@/types/entry';
import CardReview from '@/components/Molecules/cardReview.vue';

@Component({
  components: {
    CardReview,
  },
})
export default class Reviews extends Vue {
  @Prop({ required: true })
  reviews!: Review[];

  limit = 20;

  handlePostClick(slug: string) {
    this.$router.push({ name: 'review-slug', params: { slug } });
  }
}
</script>

<style scoped>
.reviews {
  width: 100%;
  position: relative;
  justify-content: space-between;
}
</style>
