<template>
  <article @mouseenter="addPrerender">
    <v-card
      class="review-card mx-auto d-flex flex-column-reverse flex-sm-row"
      hover
      :to="{ name: 'review-slug', params: { slug: review.slug } }"
      :max-width="maxWidth"
    >
      <div class="flex-3 d-flex flex-column">
        <!-- <v-card-text
          class="secondary--text top-review-category mt-4 mb-n3 d-none d-sm-block"
        >
          {{ review.tag.name }}
        </v-card-text> -->
        <v-card-title class="card-title">{{ review.title }}</v-card-title>
        <v-card-subtitle class="card-sub-title">{{
          review.description
        }}</v-card-subtitle>
        <v-spacer />
        <v-card-text class="mb-0 py-0 review-date d-none d-sm-block"
          >作成日：{{ reviewDate }}</v-card-text
        >
        <v-card-text class="mb-2 py-0 mt-0 review-date d-none d-sm-block"
          >更新日：{{ updateDate }}</v-card-text
        >
      </div>

      <div class="d-flex flex-2 my-2 mx-auto">
        <div class="my-auto flex-1 d-sm-none">
          <v-card-text class="mb-2 py-0 mt-0 review-date">{{
            updateDate
          }}</v-card-text>
          <v-spacer />
        </div>

        <webp-img
          :img-name="generateFormatedImg(review.product.img)"
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
import { FullReview } from '@/types/entry';

const WebpImg = () => import('@/components/Atom/webpImg.vue');

@Component({
  components: {
    WebpImg,
  },
})
export default class CardReview extends Vue {
  @Prop({ required: true })
  review!: FullReview;

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
    const href = `/review/${this.review.slug}`;

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
    return `${this.review.title}のタイトル画像`;
  }

  get reviewDate() {
    const seconds = this.review.createdAt.seconds;
    const millseconds = parseInt(`${seconds.toString()}000`);

    return formatDate(new Date(millseconds));
  }

  get updateDate() {
    const seconds = this.review.updatedAt.seconds;
    const millseconds = parseInt(`${seconds.toString()}000`);

    return formatDate(new Date(millseconds));
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
.top-review-category {
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

.theme--dark .review-date,
.theme--dark .card-sub-title {
  color: #ccc;
}

.theme--light .review-date,
.theme--light .card-sub-title {
  color: #222;
}

.review-img {
  width: 50%;
}
</style>
