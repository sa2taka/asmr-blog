import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Categories from '~/store/categories';

let categoriesStore: Categories;

function initialiseStores(store: Store<any>): void {
  categoriesStore = getModule(Categories, store);
}

export { initialiseStores, categoriesStore };
