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
    <v-icon
      color="#1877f2"
      class="facebook-logo"
      v-html="$vuetify.icons.values.facebook"
    />
    <span v-if="!isSmartphoneWidth" class="ml-2 black--text">シェアする</span>
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class FacebookShareButton extends Vue {
  @Prop({ required: true })
  href!: string;

  @Prop({ required: true })
  isSmartphoneWidth!: boolean;
}
</script>

<style scoped>
.facebook-logo {
  font-size: 28px;
}
</style>
