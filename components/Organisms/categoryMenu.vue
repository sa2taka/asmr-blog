<template>
  <v-navigation-drawer permanent floating>
    <v-subheader>カテゴリ</v-subheader>

    <v-list dense nav tag="nav">
      <v-list-item v-for="category in categories" :key="category.slug">
        <nuxt-link
          :to="{ name: 'category-slug', params: { slug: category.slug } }"
          >{{ category.name }}</nuxt-link
        >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { Category } from '@/types/entry';
import { categoriesStore } from '@/libs/storeAccessor';

@Component
export default class SideMenu extends Vue {
  categories: Category['fields'][] = [];

  created() {
    this.setCategories(categoriesStore.categories);
  }

  setCategories(categories: Category[]) {
    this.categories = categories
      .map((e) => e.fields)
      .sort((a, b) => a.sort - b.sort);
  }
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
