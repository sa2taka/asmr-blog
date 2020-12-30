<template>
  <div v-if="posts.length !== 0" class="posts">
    <card-post v-for="post in posts" :key="post.id" :post="post" class="mt-6" />
  </div>
  <div v-else>投稿が見つかりません</div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';
import { Post } from '@/types/entry';
const CardPost = () => import('@/components/Molecules/cardPost.vue');

@Component({
  components: {
    CardPost,
  },
})
export default class Posts extends Vue {
  @Prop({ required: true })
  posts!: Post[];

  limit = 20;

  handlePostClick(slug: string) {
    this.$router.push({ name: 'post-slug', params: { slug } });
  }
}
</script>

<style scoped>
.posts {
  width: 100%;
  position: relative;
  justify-content: space-between;
}
</style>
