<template>
  <div class="markdown-body" v-html="compiledMarkdownText" />
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';
import { markdown } from '@/libs/markdown';

@Component
export default class Markdown extends Vue {
  @Prop({ required: true })
  markdown!: string;

  get compiledMarkdownText() {
    const md = markdown;
    return md.render(this.markdown);
  }
}
</script>

<style>
.v-application .markdown-body * {
  word-wrap: break-word;
}
.padding-for-filename {
  padding-top: 2.6em !important;
}

.filename {
  color: #eee;
  display: inline-block;
  position: absolute;
  background-color: #444;
  word-break: break-all;
  border-radius: 0 0 5px 0;
  font-size: 0.9em;
  padding: 3px 6px;
}

.markdown-body {
  line-height: 1.5;
  letter-spacing: 0.025em;
}

.theme--dark .markdown-body strong {
  /* color: white; */
  background: linear-gradient(transparent 75%, var(--v-secondary-base) 0%);
}

.theme--light .markdown-body strong {
  /* color: black; */
  background: linear-gradient(transparent 75%, var(--v-secondary-lighten1) 0%);
}

.markdown-body blockquote {
  padding: 0.6em 1em;
  margin: 2em auto;
  border-left: 3px solid rgba(128, 128, 128, 0.8);
}

.markdown-body p {
  margin-bottom: 1.8em;
}

.markdown-body blockquote blockquote {
  padding: 0.4em 1em;
  margin: 1.2em auto 0.7em;
  border-left: 3px solid rgba(128, 128, 128, 0.8);
}

.theme--dark .markdown-body blockquote {
  color: #aaa;
}

.theme--light .markdown-body blockquote {
  color: #333;
}

.markdown-body ul {
  margin-bottom: 1.8em;
}

/* 引用元名 */
.markdown-body blockquote p.author {
  text-align: right;
}

.markdown-body blockquote p.author::before {
  content: '―― ';
}

/* 画像 */
.markdown-body picture,
.markdown-body img,
.markdown-body source[type='image/webp'] {
  display: block;
  max-width: min(100%, 640px);
  margin: 0.6em auto;
}

/* header */
.markdown-body h2 {
  font-size: 2em;
}
.theme--dark .markdown-body h2,
.theme--dark .markdown-body h3 {
  border-bottom: 1px solid #222;
}

.theme--light .markdown-body h2,
.theme--light .markdown-body h3 {
  border-bottom: 1px solid #eee;
}

.markdown-body h2 {
  margin-top: 64px;
  margin-bottom: 24px;
}

.markdown-body h3 {
  margin-top: 58px;
  margin-bottom: 18px;
}

.markdown-body h4,
.markdown-body h5 {
  margin-top: 52px;
  margin-bottom: 20px;
}

.markdown-body hr.footnotes-sep {
  margin-top: 12px;
  margin-bottom: 16px;
}

.v-application .markdown-body code {
  margin: auto auto 1.5em;
  word-wrap: normal;
  white-space: pre;
  padding: 0.8em 0.6em;
}

.v-application .markdown-body code .token.prompt {
  user-select: none;
  color: #777;
}

.theme--light .markdown-body a {
  color: #006256;
}

/* HACK */
.v-application code {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #ddd;
  background: #282c34;
  margin: 0.5em 0;
  font-weight: 500;
}

.markdown-body blockquote p {
  margin-bottom: 0px !important;
}

.v-application .markdown-body code.hljsspan {
  display: inline;
  overflow-x: initial;
  color: #ddd;
  background: #282c34;
  padding: 0.1em 0.4em;
  margin-left: 4px;
  margin-right: 4px;
  white-space: normal;
}

.v-application code::before,
.v-application code::after {
  content: none;
}

.v-application code .hljs-comment {
  color: #acb3c0;
}
</style>
