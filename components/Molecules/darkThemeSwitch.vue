<template>
  <div>
    <v-tooltip bottom>
      <template #activator="{ on }">
        <v-btn
          v-if="isDark"
          icon
          aria-label="ライトモードへ"
          v-on="on"
          @click="changeTheme(false)"
          ><v-icon>fa-moon</v-icon></v-btn
        >
        <v-btn
          v-else
          icon
          aria-label="ダークモードへ"
          v-on="on"
          @click="changeTheme(true)"
          ><v-icon>fa-sun</v-icon></v-btn
        >
      </template>
      <span>Dark/Light Switch</span>
    </v-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class DarkThemeSwitch extends Vue {
  isDark: boolean = true;

  created() {
    if (process.client) {
      this.isDark = this.$vuetify.theme.dark;
    } else {
      this.isDark = this.$cookies.get('theme') === 'dark';
    }
  }

  changeTheme(isDark: boolean) {
    this.isDark = isDark;
    this.$vuetify.theme.dark = isDark;
    if (localStorage) {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      this.$cookies.set('theme', isDark ? 'dark' : 'light', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }
  }
}
</script>
