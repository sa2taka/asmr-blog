import Vuetify from 'vuetify';
import { createLocalVue, mount } from '@vue/test-utils';
import PostIndex from '../../../components/Molecules/postIndex.vue';
import { posts } from '../../__mocks__/postData';
import { generateIndexies } from '@/libs/generateIndexies';

const localVue = createLocalVue();

jest.mock('contentful', () => ({
  createClient: (_: any) => {},
}));

describe('molecules/postIndex/index', () => {
  let vuetify: any;
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const mountWithVuetify = (options?: any) => {
    return mount(PostIndex, {
      localVue,
      vuetify,
      ...options,
    });
  };

  test('should render', () => {
    const markdown = posts[0].fields.body;
    const index = generateIndexies(markdown);
    const wrapper = mountWithVuetify({
      propsData: {
        index,
      },
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
