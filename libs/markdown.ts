import MarkdownIt from 'markdown-it';
// @ts-ignore
import footnote from 'markdown-it-footnote';
// @ts-ignore
import imsize from 'markdown-it-imsize';
// @ts-ignore
import katex from '@iktakahiro/markdown-it-katex';

import prism from '@/libs/prism';

const myHeaderPlugin = (md: MarkdownIt) => {
  md.renderer.rules.heading_open = (...[tokens, idx, options, _, self]) => {
    const tag = tokens[idx].tag;
    const content = tokens[idx + 1].content;
    const m = tag.match(/^h([123456])$/);
    if (m) {
      const headerIndex = Number(m[1]);
      const newIndex = headerIndex < 6 ? headerIndex + 1 : 6;
      return `<h${newIndex} id="${content}">`;
    } else {
      return self.renderToken(tokens, idx, options);
    }
  };
};

const myInlineCodePlugin = (md: MarkdownIt) => {
  md.renderer.rules.code_inline = (...[tokens, idx]) => {
    const tag = tokens[idx].tag;
    const content = tokens[idx].content;
    return `<${tag} class="hljsspan">${content}</${tag}>`;
  };
};

const myCodePlugin = (md: MarkdownIt) => {
  // code_blockではなくfence ruleにてcodeは拾われるらしい
  // @ts-ignore
  md.renderer.rules.fence = (...[tokens, idx]) => {
    const info = tokens[idx].info;
    const code = tokens[idx].content;

    let lang = '';
    let filename = '';
    if (info) {
      [lang, filename] = info.split(':').map((s) => s.trim());
    } else {
      lang = 'plaintext';
    }

    prism.languages.bash.prompt = /^[$#] /m;

    let value: string;
    if (prism.languages[lang]) {
      value = prism.highlight(code, prism.languages[lang], lang);
    } else {
      value = code;
      // shellで使われるtoken($, #, (%))を選択させないように変更
      if (lang === 'plaintext' || lang === '' || lang.includes('sh')) {
        value = value.replace(
          /^([$#&]\s*)/gm,
          '<span class="token prompt">$1</span>'
        );
      }
      lang = '';
    }

    let fileElement = '';
    if (filename && filename !== '') {
      fileElement = `<div class="filename">${filename}</div>`;
    }
    return `${fileElement}<code class="${
      lang !== '' ? `language-${lang}` : ''
    } ${
      filename && filename !== '' ? 'padding-for-filename' : ''
    }">${value}</code>`;
  };
};

const myImgPlugin = (md: MarkdownIt) => {
  const defaultRender =
    md.renderer.rules.image ||
    function (tokens, idx, options, _, self) {
      return self.renderToken(tokens, idx, options);
    };
  md.renderer.rules.image = (...[tokens, idx, options, env, self]) => {
    tokens[idx].attrPush(['loading', 'lazy']);
    return defaultRender(tokens, idx, options, env, self);
  };
};

const myWebpConvertPlugin = (md: MarkdownIt) => {
  const imgRender =
    md.renderer.rules.image ||
    function (tokens, idx, options, _, self) {
      return self.renderToken(tokens, idx, options);
    };
  md.renderer.rules.image = (...[tokens, idx, options, env, self]) => {
    const src = tokens[idx].attrs?.filter((elm) => elm[0] === 'src')[0]?.[1];
    if (!src) {
      return imgRender(tokens, idx, options, env, self);
    }

    const m = src.match(/\/\/images\.ctfassets\.net/);
    if (!m) {
      return imgRender(tokens, idx, options, env, self);
    }

    const token = src.includes('?') ? '&' : '?';
    const webp = `${src}${token}fm=webp`;
    const imgTag = imgRender(tokens, idx, options, env, self);
    const webpTag = `<source srcset="${webp}" type="image/webp"/>`;
    return `<picture>${webpTag}${imgTag}</picture>`;
  };
};
export const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  typographer: true,
  langPrefix: '',
})
  .use(myCodePlugin)
  .use(footnote)
  .use(imsize, { autofill: true })
  .use(myHeaderPlugin)
  .use(myInlineCodePlugin)
  .use(myWebpConvertPlugin)
  .use(myImgPlugin);

export function addKatex(md: MarkdownIt) {
  return md.use(katex, { throwOnError: false, errorColor: ' #cc0000' });
}
