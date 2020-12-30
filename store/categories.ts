import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import { Category, MultipleItem } from '@/types/entry';
import { fetchCategories } from '@/libs/contentful';

export interface ICategories {
  categories: Category[];
}

@Module({
  name: 'categories',
  namespaced: true,
  stateFactory: true,
})
export default class Categories extends VuexModule implements ICategories {
  categories: Category[] = [];

  @Mutation
  setCategories(category: Category[]) {
    this.categories = category;
  }

  @Action
  init() {
    return fetchCategories().then((entries: MultipleItem<Category>) => {
      this.setCategories(entries.items);
    });
  }
}
