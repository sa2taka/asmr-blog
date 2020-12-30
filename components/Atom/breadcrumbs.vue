<template>
  <nav v-show="!isSmartphoneWidth" class="breadcrumbs">
    <ul class="breadcrumbs_list">
      <template v-for="(item, index) in list">
        <li
          :key="index"
          :class="['breadcrumbs_item', { 'disabled-link': item.disabled }]"
        >
          <nuxt-link :to="item.to">{{ item.text }}</nuxt-link>
        </li>
        <li
          v-if="index !== list.length - 1"
          :key="`${index}-divider`"
          class="breadcrumbs_divider"
        >
          <v-icon small class="mx-3 mb-1">fas fa-chevron-circle-right</v-icon>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';
import { BreadcrumbsList } from '@/libs/breadcrumbsGenerator';
import { BASE_URL } from '@/libs/const';

@Component
export default class Breadcrumbs extends Vue {
  @Prop({ required: true })
  list!: BreadcrumbsList;

  isSmartphoneWidth = false;
  smartphoneWidth = 600;

  mounted() {
    this.isSmartphoneWidth = window.innerWidth < this.smartphoneWidth;

    window.addEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.isSmartphoneWidth = window.innerWidth < this.smartphoneWidth;
  }

  head() {
    const hid = 'breadcrumbs';

    return {
      script: [
        {
          hid,
          type: 'application/ld+json',
          innerHTML: JSON.stringify(this.seoStructureData, null),
        },
      ],
      __dangerouslyDisableSanitizersByTagID: {
        [hid]: ['innerHTML'],
      },
    };
  }

  get seoStructureData() {
    const items = this.list.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.to,
        '@type': 'ListItem',
        name: item.text,
        item: `${BASE_URL}${item.to}`,
      },
    }));

    return {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    };
  }
}
</script>

<style>
.breadcrumbs {
  width: 100%;
}

.breadcrumbs_list {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex: 0 1 auto;
  list-style-type: none;
  margin: 0;
  padding: 18px 12px;
}

.breadcrumbs_item {
  display: inline-flex;
  font-size: 14px;
}

.breadcrumbs_item > a {
  text-decoration: none;
}

.disabled-link {
  pointer-events: none;
}

.theme--dark .breadcrumbs_item > a {
  color: #ccc;
}

.theme--light .breadcrumbs_item > a {
  color: #444;
}

/* HACK */
.breadcrumbs li {
  font-size: 14px;
}

.v-application li.v-breadcrumbs__divider {
  margin-bottom: 2px;
}

.v-application .theme--light a.v-breadcrumbs__item {
  color: #444;
}

.v-application .theme--dark a.v-breadcrumbs__item {
  color: #ccc;
}
</style>
