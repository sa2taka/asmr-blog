<template>
  <v-navigation-drawer permanent floating>
    <v-subheader>タグ</v-subheader>

    <v-list dense nav tag="nav">
      <v-list-item v-for="tag in tags" :key="tag.slug">
        <nuxt-link :to="{ name: 'tag-slug', params: { slug: tag.slug } }">{{
          tag.name
        }}</nuxt-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Tag } from '@/types/entry';

@Component
export default class SideMenu extends Vue {
  @Prop({ required: true })
  categories!: Tag[];
}
</script>

<style scoped>
.sidebar-nav {
  position: fixed;
  transform: rotate(90deg);
  top: calc(50% - 50px / 2);
  font-weight: 600;
}

@media (min-width: 1025px) {
  .sidebar-nav {
    font-size: 1.1em;
    width: 512px;
    right: calc(-256px + 1.1em);
  }
}

@media (max-width: 1024px) and (min-width: 600px) {
  .sidebar-nav {
    font-size: 1em;
    width: 480px;
    right: calc(-240px + 0.8em);
  }
}
</style>
