<template>
  <v-layout column justify-center align-center class="guide">
    <v-container>
      <h1>当サイト利用について</h1>
      <p>
        本ページはサイト利用にあたって必要となる情報が記載されています。お決まりの文言が多いですが、ご一読をお願いいたします。
      </p>

      <table>
        <caption>
          更新履歴
        </caption>
        <thead>
          <tr>
            <th>更新日</th>
            <th>更新内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><time datetime="2020-04-26">2020/4/26</time></td>
            <td>初版策定</td>
          </tr>
        </tbody>
      </table>

      <h2>筆者について</h2>
      <p>
        当サイトの作者・管理者は「sa2taka」(別名：とっぷら。以下、筆者)です
      </p>

      <p>
        当サイト、または筆者自身への問い合わせは、下記Twitter、Mastodonユーザーへのリプライ、ダイレクトメッセージにて受け付けています。
      </p>
      <ul>
        <li>
          <a href="https://twitter.com/t0p_l1ght">筆者のTwitterアカウント</a>
        </li>
        <li>
          <a href="https://mstdn-workers.com/@t0p_l1ght"
            >筆者のMastodonアカウント</a
          >
        </li>
      </ul>
      <h2>推奨環境</h2>
      当サイトでは以下のブラウザをご利用ください。

      <h4>PC</h4>
      <ul>
        <li>Google Chrome</li>
        <li>Firefox</li>
        <li>Safari(Mac)</li>
      </ul>

      <h4>スマホ</h4>
      <ul>
        <li>Google Chrome</li>
        <li>Safari</li>
      </ul>
      <h2>著作権</h2>
      <p>
        当サイトで掲載している文章・画像・動画等のあらゆる著作物(以下、コンテンツ)の著作権、その他権利は各権利所有者に帰属します。
      </p>
      <h2>無断転載の禁止</h2>
      <p>
        当サイトで掲載しているコンテンツを引用(著作権法第32条)の範囲を超えて無断転載することを禁止とします。引用時には、引用元ページもしくは当サイトのトップページへのリンクを貼ること、またはURLの明記を必須とします。<br />
      </p>
      <p>
        ただしサイト中に掲載したソースコードは、明示的にライセンスの記載があるもの、または著作権保有者が筆者以外の場合を除いて全てMITライセンスです。その場合は<a
          href="https://opensource.org/licenses/MIT"
          >MITライセンス</a
        >(<a
          href="https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license"
          >日本語訳</a
        >)の範囲内で利用・転載が可能です。
      </p>

      <h2>プライバシーポリシー</h2>
      <h3>当サイトで扱う個人情報</h3>
      <p>
        当サイトでは、本ポリシー記載時点で個人情報の扱いはございません。
      </p>
      <h3>Cookieの利用目的</h3>
      <p>
        当サイトではCookieを利用しています。<br />
        Cookie(クッキー)とは、ウェブサイトを利用したときに利用者のブラウザにデータを保存しておき、当サイトへアクセスする際にサーバーへ保存したデータを送信する仕組みです。Cookieを利用することでサイトの閲覧の利便性を高めることが可能です。<br />
      </p>
      <p>
        当サイトでは、本ポリシー記載時点で下記の目的でCookieを利用しています。
      </p>
      <ul>
        <li>本サイトのダーク/ライトテーマの保存</li>
        <li>アクセス解析ツール</li>
      </ul>
      <h4>当サイトで利用しているアクセス解析ツール</h4>
      <p>
        本サイトではGoogleによるアクセス解析ツール「Google
        Analytics」を利用しています。
      </p>
      <p>
        このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
        このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
      </p>
      <h2>免責事項</h2>
      <p>
        当サイトのコンテンツ及び情報は必ずしも正確性を保証するものではありません。
      </p>
      <p>
        当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますので、ご了承ください。<br />
        また当サイトからリンクによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任も負いません。
      </p>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { BASE_URL } from '@/libs/const';

@Component
export default class PostSlug extends Vue {
  head() {
    return {
      title: 'プライバシーポリシー - ',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'プライバシーポリシー',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'プライバシーポリシー - 園児ニアの庭園',
        },
        {
          name: 'og:description',
          content: 'プライバシーポリシー',
        },
        {
          name: 'og:url',
          content: BASE_URL + '/term',
        },
      ],
    };
  }
}
</script>

<style scoped>
.guide h1,
.guide h2 {
  margin-top: 48px;
  margin-bottom: 24px;
}

.guide h3,
.guide h4 {
  margin-top: 24px;
  margin-bottom: 18px;
}

.guide th:nth-of-type(n + 2),
.guide td:nth-of-type(n + 2) {
  padding-left: 8px;
}

.guide table {
  margin: auto auto;
}
</style>
