<template>
  <v-btn
    large
    :href="href"
    color="white"
    :width="isSmartphoneWidth ? 64 : 180"
    :min-width="64"
    target="_blank"
    rel="noopener noreferrer"
  >
    <v-icon color="#1DA1F2" v-html="$vuetify.icons.values.twitter" />
    <span v-if="!isSmartphoneWidth" class="ml-2 black--text">ツイートする</span>
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class TwitterShareButton extends Vue {
  @Prop({ required: true })
  href!: string;

  @Prop({ required: true })
  isSmartphoneWidth!: boolean;
}
</script>
