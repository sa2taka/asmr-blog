<template>
  <v-app>
    <v-app-bar hide-on-scroll app absolute>
      <nuxt-link class="d-flex title-link" :to="'/'">
        <webp-img
          webp-name="/icon.webp"
          img-name="/icon.png"
          width="auto"
          height="36"
          class="title-icon-margin mr-3"
          alt="logo"
        />
        <transition name="fade">
          <h1 v-show="canDisplayTitle" class="navbar-blog-title">
            {{ title }}
          </h1>
        </transition>
      </nuxt-link>

      <v-spacer />

      <nav class="mr-10 d-flex">
        <div class="title-link animation-link ml-4" @click="$router.push('/')">
          Home
        </div>

        <div
          class="title-link animation-link ml-4"
          @click="$router.push('/category')"
        >
          Category
        </div>
      </nav>

      <dark-theme-switch class="mr-3" />
    </v-app-bar>

    <v-main>
      <v-container>
        <a
          v-if="!isRoute"
          class="back-button animation-link"
          href="javascript:history.back();"
          >&lt;&lt; 戻る</a
        >
        <nuxt v-cloak />
      </v-container>
    </v-main>

    <v-footer class="main-footer">
      <div class="d-flex flex-column align-center mx-auto">
        <nuxt-link
          class="d-flex footer-link align-center animation-link"
          :to="'/'"
        >
          <v-icon>fa-home</v-icon>
          <span class="ml-2 mt-1">Home</span>
        </nuxt-link>
        <div class="d-flex justify-center flex-wrap mt-4">
          <div class="mb-2 animation-link">
            <v-icon
              class="mt-n1"
              color="#1DA1F2"
              v-html="$vuetify.icons.values.twitter"
            ></v-icon>
            <a href="https://twitter.com/t0p_l1ght" class="footer-link mt-2"
              >筆者Twitterアカウント</a
            >
          </div>
          <div class="ml-4">
            <nuxt-link
              :to="{ name: 'guide' }"
              class="animation-link footer-link ml-2 mt-2"
              >当サイト利用について</nuxt-link
            >
          </div>
        </div>
      </div>
    </v-footer>

    <v-footer app height="36">
      <v-spacer />
      <span>&copy; sa2taka</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import WebpImg from '@/components/Atom/webpImg.vue';
import DarkThemeSwitch from '@/components/Molecules/darkThemeSwitch.vue';
import TagMenu from '@/components/Organisms/tagMenu.vue';

import { BLOG_TITLE } from '@/libs/const';

@Component({
  components: {
    WebpImg,
    DarkThemeSwitch,
    TagMenu,
  },
})
export default class Default extends Vue {
  drawer = false;
  isSmartphoneWidth = false;
  smartphoneWidth = 600;
  title: string = BLOG_TITLE;
  canDisplayTitle = false;

  mounted() {
    this.isSmartphoneWidth = window.innerWidth < this.smartphoneWidth;
    this.canDisplayTitle = !this.isSmartphoneWidth;

    window.addEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.isSmartphoneWidth = window.innerWidth < this.smartphoneWidth;
    this.canDisplayTitle = !this.isSmartphoneWidth;
  }

  get isRoute() {
    return this.$route.name === 'index';
  }
}
</script>

<style>
html {
  overflow-y: auto !important;
}

.title-icon-margin {
  margin-left: 4%;
  height: 36px;
}

.navbar-blog-title {
  font-size: 1.2em;
  width: 200px;
  margin-top: 4px;
}

.title-link {
  cursor: pointer;
}

a.title-link {
  text-decoration: none;
}

.theme--dark a.title-link {
  color: white;
}

.theme--light a.title-link {
  color: black;
}

.animation-link {
  position: relative;
  cursor: pointer;
}

.animation-link::after {
  position: absolute;
  bottom: 0;
  left: 50%;
  content: '';
  width: 0;
  height: 1px;
  background-color: #009688;
  transition: 0.3s;
  transform: translateX(-50%);
}

.animation-link:hover::after {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.main-footer {
  position: relative;
  top: -36px;
}

.footer-link {
  text-decoration: none;
}

.theme--dark .footer-link {
  color: white !important;
}

.theme--light .footer-link {
  color: black !important;
}
</style>
