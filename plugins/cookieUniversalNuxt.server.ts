import cookieUniversal from 'cookie-universal';
import { NuxtCookies } from 'cookie-universal-nuxt/types';

export default (ctx: any) => {
  ctx.app.cookies = cookieUniversal;
};

declare module 'vue/types/vue' {
  interface Vue {
    $cookies: NuxtCookies;
  }
}
