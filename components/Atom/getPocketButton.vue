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
    <v-icon color="#ee4056" v-html="$vuetify.icons.values.pocket" />
    <span v-if="!isSmartphoneWidth" class="ml-2 black--text">後で読む</span>
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class GetPocketButton extends Vue {
  @Prop({ required: true })
  href!: string;

  @Prop({ required: true })
  isSmartphoneWidth!: boolean;
}
</script>
