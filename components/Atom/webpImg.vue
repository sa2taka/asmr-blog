<template>
  <picture onload="handleLoad()">
    <source
      v-if="webpName"
      :srcset="webpName"
      type="image/webp"
      class="full-width my-auto"
    />
    <img
      :src="imgName"
      :width="width"
      :height="height"
      :alt="alt"
      class="full-width my-auto"
      loading="lazy"
    />
  </picture>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';

@Component
export default class WebpImage extends Vue {
  @Prop()
  webpName!: string | undefined;

  @Prop({ required: true })
  imgName!: string;

  @Prop({ required: true })
  alt!: string;

  @Prop({ default: 'auto' })
  width!: string | number;

  @Prop({ default: '100%' })
  height!: string | number;

  @Prop({ default: undefined })
  onLoad?: () => {};

  mounted() {
    for (let i = 0; i < this.$el.childElementCount; i++) {
      this.$el.children[i].addEventListener('load', () => {
        if (this.onLoad) {
          this.onLoad();
        }
      });

      if ((this.$el.children[i] as HTMLImageElement).complete) {
        if (this.onLoad) {
          this.onLoad();
        }
      }
    }
  }
}
</script>

<style scoped>
picture,
source,
img {
  object-fit: contain;
}

.full-width {
  width: 100%;
}
</style>
