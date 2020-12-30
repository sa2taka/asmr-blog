<template>
  <v-layout column justify-center align-center>
    <breadcrumbs :list="breadcrumbsList"></breadcrumbs>
    <article class="post">
      <div
        class="post-title-area"
        :style="{
          'background-image': `url(${post.fields.postImage.fields.file.url}?fm=webp)`,
        }"
      >
        <div class="post-title">
          <nuxt-link
            class="post-category secondary--text animation-link"
            :to="{
              name: 'category-slug',
              params: { slug: post.fields.category.fields.slug },
            }"
            >{{ post.fields.category.fields.name }}</nuxt-link
          >
          <h1 class="post-title-name">{{ post.fields.title }}</h1>
          <p class="post-author">by {{ post.fields.author.fields.name }}</p>
        </div>
      </div>
      <div class="date-area">
        <p class="mb-0 post-date">作成日: {{ postDate }}</p>
        <p class="mb-0 post-date">更新日: {{ updateDate }}</p>
      </div>
      <post-index :index="postIndex" class="mt-10" />
      <markdown
        class="mt-8"
        :markdown="post.fields.body"
        :latex="post.fields.latex"
      />
      <footer class="my-6">
        <share-buttons :title="post.fields.title" />
      </footer>
    </article>
  </v-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';

import { fetchPost } from '@/libs/contentful';
import { Post } from '@/types/entry';
import { BASE_URL } from '@/libs/const';
import { generateIndexies } from '@/libs/generateIndexies';
import { generatePostBreadcrumbsList } from '@/libs/breadcrumbsGenerator';

import Markdown from '@/components/Organisms/markdown.vue';
import PostIndex from '@/components/Molecules/postIndex.vue';
import Breadcrumbs from '@/components/Atom/breadcrumbs.vue';
import ShareButtons from '@/components/Molecules/shareButtons.vue';
// import 'katex/dist/katex.min.css';

@Component({
  components: {
    Markdown,
    PostIndex,
    Breadcrumbs,
    ShareButtons,
  },
})
export default class PostSlug extends Vue {
  post!: Post;
  async asyncData(context: Context) {
    if (!context.params.slug || context.params.slug === '') {
      return context.error({
        statusCode: 404,
      });
    }
    const post: Post = await fetchPost(context.params.slug);

    if (!post) {
      return context.error({
        statusCode: 404,
      });
    }

    return {
      post,
    };
  }

  mounted() {
    const hash = this.$route.hash;
    window.location.hash = '';
    window.location.hash = hash;
  }

  get postDate() {
    const rawDate = this.post.sys.createdAt;

    return formatDate(new Date(rawDate));
  }

  get updateDate() {
    const rawDate = this.post.sys.updatedAt;

    return formatDate(new Date(rawDate));
  }

  get postIndex() {
    return generateIndexies(this.post.fields.body);
  }

  get ogImage() {
    return this.post.fields.postImage.fields.file.url + '?w=1200';
  }

  get breadcrumbsList() {
    return generatePostBreadcrumbsList(this.post);
  }

  get seoStructureData() {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': BASE_URL + this.$route.path,
      },
      headline: this.post.fields.title,
      image: [this.ogImage],
      datePublished: this.post.sys.createdAt.toString(),
      dateModified: this.post.sys.updatedAt.toString(),
      author: {
        '@type': 'Person',
        name: this.post.fields.author.fields.name,
      },
      publisher: {
        '@type': 'Organization',
        name: 'sa2taka',
        logo: {
          '@type': 'ImageObject',
          url: BASE_URL + '/logo-for-twitter.png',
        },
      },
    };
  }

  head() {
    const link = [];
    const hid = 'article';
    if (this.post.fields.latex) {
      link.push({
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
        type: 'text/css',
        integrity:
          'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X',
        crossorigin: 'anonymous',
      });
    }

    return {
      style: [
        {
          type: 'text/css',
          src: 'highlight.js/styles/atom-one-dark.css',
        },
      ],
      title: this.post.fields.title + ' - ',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.fields.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.post.fields.title + ' - 園児ニアの庭園',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.post.fields.description,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.ogImage,
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: BASE_URL + this.$route.path,
        },
      ],
      link,
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
}

const formatDate = (date: Date) => {
  const fillBy0 = (num: number, length: number) => {
    return ('0000' + num.toString()).slice(-length);
  };
  const year = date.getFullYear();
  const month = fillBy0(date.getMonth() + 1, 2);
  const day = fillBy0(date.getDate(), 2);
  const week = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
  return `${year}/${month}/${day}(${week})`;
};
</script>

<style>
/* Do not set scoped */
.post {
  width: 80%;
  min-width: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 12px;
}

.back-button {
  text-decoration: none;
}

.theme--dark .back-button {
  color: #aaa !important;
}

.theme--light .back-button {
  color: #333 !important;
}

.animation-link {
  position: relative;
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

.date-area {
  margin: 4px auto;
  display: flex;
  align-items: flex-end;
  flex-flow: column;
}

.post-date {
  font-size: 0.9em !important;
}

.theme--dark .post-date {
  color: #ccc;
}

.theme--light .post-date {
  color: #222;
}

.post-title {
  background-color: rgba(0, 0, 0, 0.92);
  padding: 8px 12px;
  margin-bottom: 0;
  margin-top: auto;
  min-width: 80%;
  border-radius: 0 12px 0 10.5px;
  color: white;
  overflow-wrap: break-word;
}

.post-title-name {
  font-size: 24px;
}

@media (max-width: 600px) {
  .post-title-name {
    font-size: 20px;
  }
}
@media (min-width: 601px) {
  .post-title-name {
    font-size: 24px;
  }
}

.post-category {
  margin-bottom: 0px !important;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
}

.post-author {
  margin-bottom: 0px !important;
  font-size: 164x;
  margin-left: 2em;
}

.post-title-area {
  height: 240px;
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  border-radius: 12px;
  background-position: center;
}
</style>
