<template>
  <article @mouseenter="addPrerender">
    <v-card
      class="post-card mx-auto d-flex flex-column-reverse flex-sm-row"
      hover
      :to="{ name: 'post-slug', params: { slug: post.fields.slug } }"
      :max-width="maxWidth"
    >
      <div class="flex-3 d-flex flex-column">
        <v-card-text
          class="secondary--text top-post-category mt-4 mb-n3 d-none d-sm-block"
        >
          {{ post.fields.category.fields.name }}
        </v-card-text>
        <v-card-title class="card-title">{{ post.fields.title }}</v-card-title>
        <v-card-subtitle class="card-sub-title">{{
          post.fields.description
        }}</v-card-subtitle>
        <v-spacer />
        <v-card-text class="mb-0 py-0 post-date d-none d-sm-block"
          >作成日：{{ postDate }}</v-card-text
        >
        <v-card-text class="mb-2 py-0 mt-0 post-date d-none d-sm-block"
          >更新日：{{ updateDate }}</v-card-text
        >
      </div>

      <div class="d-flex flex-2 my-2 mx-auto">
        <div class="my-auto flex-1 d-sm-none">
          <v-card-text class="mb-2 py-0 mt-0 post-date">{{
            updateDate
          }}</v-card-text>
          <v-spacer />
          <div class="secondary--text top-post-category">
            {{ post.fields.category.fields.name }}
          </div>
        </div>

        <webp-img
          :webp-name="generateWebp(post.fields.postImage.fields.file.url)"
          :img-name="generateFormatedImg(post.fields.postImage.fields.file.url)"
          :alt="altText"
          :on-load="onLoad"
          class="flex-1 mx-2"
        />
      </div>
    </v-card>
  </article>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Post } from '@/types/entry';

const WebpImg = () => import('@/components/Atom/webpImg.vue');

@Component({
  components: {
    WebpImg,
  },
})
export default class CardPost extends Vue {
  @Prop({ required: true })
  post!: Post;

  isActive = false;
  loading = true;
  maxWidth = 840;
  height = '18em';

  generateWebp(url: string) {
    return url + '?fm=webp&w=480';
  }

  generateFormatedImg(url: string) {
    return url + '?w=480';
  }

  onLoad() {
    this.loading = false;
  }

  addPrerender() {
    const elementId = 'prerendering-header';
    const oldLink = document.getElementById(elementId);
    const href = `/post/${this.post.fields.slug}`;

    if (oldLink) {
      const oldHref = oldLink.attributes.getNamedItem('href');
      if (oldHref && oldHref.value === href) return;
      oldLink.parentNode && oldLink.parentNode.removeChild(oldLink);
    }

    const link = document.createElement('link');
    link.id = elementId;
    link.rel = 'prerender';
    link.href = href;
    document.head && document.head.appendChild(link);
  }

  get altText() {
    return `${this.post.fields.postImage.fields.title} - ${this.post.fields.title}のタイトル画像`;
  }

  get postDate() {
    const rawDate = this.post.sys.createdAt;

    return formatDate(new Date(rawDate));
  }

  get updateDate() {
    const rawDate = this.post.sys.updatedAt;

    return formatDate(new Date(rawDate));
  }
}

const formatDate = (date: Date) => {
  const fillBy0 = (num: number, length: number) => {
    return ('0000' + num.toString()).slice(-length);
  };
  const year = date.getFullYear();
  const month = fillBy0(date.getMonth() + 1, 2);
  const day = fillBy0(date.getDate(), 2);
  const week = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
  return `${year}/${month}/${day}(${week})`;
};
</script>

<style scoped>
.top-post-category {
  font-size: 14px;
  font-weight: z00;
  padding-left: 16px;
}
.flex-1 {
  flex: 1;
}

.flex-2 {
  flex: 2;
}

.flex-3 {
  flex: 3;
}

.card-title {
  font-weight: 600;
}

.theme--dark .post-date,
.theme--dark .card-sub-title {
  color: #ccc;
}

.theme--light .post-date,
.theme--light .card-sub-title {
  color: #222;
}

.post-img {
  width: 50%;
}
</style>
