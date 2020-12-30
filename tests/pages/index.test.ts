import Vuetify from 'vuetify';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Index from '@/pages/index.vue';

const localVue = createLocalVue();

jest.mock('contentful', () => ({
  createClient: (_: any) => {},
}));

describe('pages/index', () => {
  let vuetify: any;
  beforeEach(() => {
    vuetify = new Vuetify();
  });
  const mountWithVuetify = () => {
    return shallowMount(Index, {
      localVue,
      vuetify,
    });
  };

  test('should render', () => {
    const wrapper = mountWithVuetify();
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
