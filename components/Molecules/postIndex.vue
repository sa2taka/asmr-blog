<template>
  <nav class="post-index">
    <div class="post-index_header">
      <span class="post-index_title">目次</span>
    </div>

    <ol
      :class="['my-4', 'post-index_content']"
      :style="{
        height: contentHeight ? (isOpen ? `${contentHeight}px` : '0') : null,
      }"
    >
      <li
        v-for="indexNest1 in formatedPostIndex"
        :key="indexNest1.title + indexNest1.level.toString()"
      >
        <a class="index-link" :href="`#${indexNest1.title}`">{{
          indexNest1.title
        }}</a>

        <ul v-if="indexNest1.child.length !== 0" class="ml-5">
          <li
            v-for="indexNest2 in indexNest1.child"
            :key="indexNest2.title + indexNest2.level.toString()"
          >
            <a class="index-link" :href="`#${indexNest2.title}`">{{
              indexNest2.title
            }}</a>
          </li>
        </ul>
      </li>
    </ol>
    <div class="post-index_footer">
      <span
        :class="['post-index_close-button', { 'post-index_move': !isOpen }]"
      >
        <v-btn
          icon
          :class="[{ 'post-index_turn': !isOpen }]"
          aria-label="index close"
          @click="isOpen = !isOpen"
        >
          <v-icon>fa-chevron-up</v-icon>
        </v-btn>
      </span>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';

import { PostIndex as IPostIndex } from '@/types/postIndex';

@Component
export default class PostIndex extends Vue {
  @Prop({ required: true })
  index!: IPostIndex[];

  isOpen = true;
  contentHeight: number | null = null;

  mounted() {
    const el = this.$el.getElementsByClassName('post-index_content')[0];

    this.contentHeight = el.scrollHeight;
  }

  get formatedPostIndex() {
    return formatPostIndex(this.index);
  }
}

const formatPostIndex = (postIndex: IPostIndex[]) => {
  const formated: FormatedPostIndex[] = [];

  // First
  const first = postIndex.shift();
  if (!first) {
    return [];
  }
  formated.push(generateFirstIndex(first));

  postIndex.forEach((elem) => {
    append(elem, formated);
  });

  return formated;
};

const append = (index: IPostIndex, formated: FormatedPostIndex[]) => {
  switch (index.level) {
    case 1:
      appendElem(formated, index);
      break;
    case 2:
      appendElem(lastElem(formated).child, index);
      break;
    case 3:
      appendElem(lastElem(lastElem(formated).child).child, index);
      break;
  }
};

const appendElem = (parent: FormatedPostIndex[], child: IPostIndex) => {
  parent.push({
    title: child.title,
    child: [],
    level: child.level,
  });
};

const lastElem = (array: any[]) => {
  return array[array.length - 1];
};

const generateFirstIndex = (first: IPostIndex): FormatedPostIndex => {
  switch (first.level) {
    case 1:
      return {
        title: first.title,
        child: [],
        level: first.level,
      };
    case 2:
      return {
        child: [
          {
            title: first.title,
            child: [],
            level: first.level,
          },
        ],
        level: 1,
      };
    case 3:
      return {
        child: [
          {
            child: [
              {
                title: first.title,
                child: [],
                level: first.level,
              },
            ],
            level: 2,
          },
        ],
        level: 1,
      };
  }
  return {
    child: [],
    level: 1,
  };
};

interface FormatedPostIndex {
  title?: string;
  child: FormatedPostIndex[];
  level: number;
}
</script>

<style scoped>
.post-index_title,
.post-index_close-button {
  display: flex;
  align-items: center;
}

.post-index_title:before,
.post-index_title:after,
.post-index_close-button:before,
.post-index_close-button:after {
  border-top: 1px solid;
  content: '';
}

.post-index_title:before {
  margin-right: 1rem;
  flex-grow: 1;
}

.post-index_title:after {
  margin-left: 1rem;
  flex-grow: 8;
}

.post-index_close-button:before {
  margin-right: 1rem;
  flex-grow: 8;
}

.post-index_close-button:after {
  margin-left: 1rem;
  flex-grow: 1;
}

.post-index_content {
  transition: height 0.3s ease-in-out;
  overflow-y: hidden;
}

.post-index_close-button:before,
.post-index_close-button:after {
  transition: flex-grow 0.3s cubic-bezier(0.52, -0.7, 0.92, 0.66);
}

.post-index_close-button {
  transition: transform 0.3s ease;
}

.post-index_turn {
  transform: rotate(180deg);
}

.post-index_close-button.post-index_move:before {
  flex-grow: 1;
}

.post-index_close-button.post-index_move:after {
  flex-grow: 8;
}

.post-index ol {
  list-style-type: none !important;
  counter-reset: number;
}

.post-index li {
  position: relative;
  margin-top: 6px;
}

.post-index ol,
.post-index ul {
  margin-top: 6px;
}

.post-index ol > li:before {
  counter-increment: number;
  content: counter(number);
  color: var(--v-primary-base);
  font-weight: 600;
}

.post-index ol > li:after {
  position: absolute;
  content: '' !important;
  top: 0px;
  right: auto;
  left: 18px;
  bottom: auto;
  height: 1.5em;
  width: 2px;
  border-radius: 1px;
  background-color: var(--v-primary-base);
}

.post-index ul > li:before {
  width: 6px;
  height: 6px;
  position: absolute;
  content: '';
  background-color: var(--v-primary-base);
  border-radius: 50%;
  left: -12px;
  top: 0.5em;
  margin: auto auto;
}

.post-index ul > li {
  list-style: none;
}

.index-link {
  padding-top: 20px;
  padding-bottom: 20px;
  text-decoration: none;
}

.index-link:hover {
  text-decoration: underline;
}

.post-index ol > li > .index-link {
  margin-left: 16px;
}

.theme--dark li > .index-link {
  color: white;
}

.theme--light li > .index-link {
  color: black;
}
</style>
