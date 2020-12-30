<template>
  <v-layout column justify-center align-center>
    <posts :posts="posts" />
  </v-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import { fetchPosts } from '@/libs/contentful';
import { Post, MultipleItem } from '@/types/entry';
import Posts from '@/components/Organisms/posts.vue';

@Component({
  components: {
    Posts,
  },
})
export default class IndexPage extends Vue {
  page!: number;
  limit = 20;
  posts!: Post[];

  async asyncData(context: Context) {
    const page = decidePage(context);
    const limit = 20; // hard code because "this" is not accessable

    const posts: Post[] = await fetchPosts(page, limit).then(
      (posts: MultipleItem<Post>) =>
        posts.items.map((item) => {
          item.fields.body = '';
          return item;
        })
    );

    return {
      page,
      posts,
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
