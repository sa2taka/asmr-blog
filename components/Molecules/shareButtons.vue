<template>
  <div
    v-resize="handleResize"
    class="d-flex justify-center flex-wrap share-buttons"
  >
    <twitter-share-button
      :href="twitterShareLink"
      :is-smartphone-width="isSmartphoneWidth"
      class="mx-3 my-3"
    />
    <facebook-share-button
      :href="facebookShareLink"
      :is-smartphone-width="isSmartphoneWidth"
      class="mx-3 my-3"
    />
    <get-pocket-button
      :href="getPocketLink"
      :is-smartphone-width="isSmartphoneWidth"
      class="mx-3 my-3"
    />
  </div>
</template>

<script lang="ts">
import QueryString from 'querystring';
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import { BASE_URL } from '@/libs/const';
import TwitterShareButton from '@/components/Atom/twitterShareButton.vue';
import FacebookShareButton from '@/components/Atom/facebookShareButton.vue';
import GetPocketButton from '@/components/Atom/getPocketButton.vue';

@Component({
  components: { TwitterShareButton, FacebookShareButton, GetPocketButton },
})
export default class ShareButtons extends Vue {
  isSmartphoneWidth = false;
  smartphoneWidth = 600;

  @Prop({ required: true })
  title!: string;

  mounted() {
    this.handleResize();
  }

  get twitterShareLink() {
    const base = 'http://twitter.com/share';
    const query = QueryString.stringify({
      url: `${BASE_URL}${this.$route.path}`,
      text: this.title,
      // ハードコード
      via: 'sa2taka',
    });

    return `${base}?${query}`;
  }

  get facebookShareLink() {
    const base = 'https://www.facebook.com/sharer/sharer.php';
    const query = QueryString.stringify({
      u: `${BASE_URL}${this.$route.path}`,
    });

    return `${base}?${query}`;
  }

  get getPocketLink() {
    const base = 'https://getpocket.com/save';
    const query = QueryString.stringify({
      url: `${BASE_URL}${this.$route.path}`,
    });

    return `${base}?${query}`;
  }

  handleResize() {
    this.isSmartphoneWidth = window.innerWidth < this.smartphoneWidth;
  }
}
</script>

<style scoped></style>
