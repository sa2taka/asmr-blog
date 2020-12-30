import { ActionTree, Store } from 'vuex';
import { ActionContext } from 'vuex/types';
import { Context } from '@nuxt/types';
import { initialiseStores } from '~/libs/storeAccessor';
const initializer = (store: Store<any>) => initialiseStores(store);
export const plugins = [initializer];
export * from '~/libs/storeAccessor';

export const actions: ActionTree<any, any> = {
  nuxtServerInit: async (
    context: ActionContext<any, any>,
    _server: Context
  ) => {
    await context.dispatch('categories/init');
  },
};
