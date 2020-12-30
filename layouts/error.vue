<template>
  <v-app>
    <h1 v-if="error && error.statusCode === 404">{{ pageNotFound }}</h1>
    <h1 v-else>{{ otherError }}</h1>
    <NuxtLink to="/">Home</NuxtLink>
  </v-app>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';
import { NuxtError } from '@nuxt/types';

@Component
export default class Error extends Vue {
  @Prop({ default: { statusCode: 404 } })
  error!: NuxtError;

  pageNotFound = '404 Not Found';
  otherError = 'An error occurred';

  head() {
    const title =
      this.error?.statusCode === 404
        ? this.pageNotFound + ' - '
        : this.otherError + ' - ';
    return {
      title,
    };
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
