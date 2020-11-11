import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ComponentWithVuexState from '@/views/componentWithVuexStateAndGetters/componentWithVuexState.vue'
import ComponentWithVuexGetters from '@/views/componentWithVuexStateAndGetters/componentWithVuexGetters.vue'

// FEAT: createLocalVue - 创建临时的 Vue 实例, 安装 Vuex
const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: 'alice',

    firstName: 'Bob',
    lastName: 'Doe',
  },
  getters: {
    fullname: (state) => state.firstName + ' ' + state.lastName,
  },
})
// FEAT: State
describe('ComponentWithVuexState', () => {
  // 两种方式, 取决于个人喜好 ...
  it('renders a username using a real vuex store', () => {
    const wrapper = shallowMount(ComponentWithVuexState, {
      store,
      localVue,
    })

    expect(wrapper.find('.username').text()).toBe('alice')
  })

  it('renders a username using a mock store', () => {
    const wrapper = shallowMount(ComponentWithVuexState, {
      mocks: {
        $store: {
          state: { username: 'bob' },
        },
      },
    })

    expect(wrapper.find('.username').text()).toBe('bob')
  })
})

// FEAT: Getters
describe('ComponentWithVuexGetters', () => {
  it('renders a fullname using a real vuex store', () => {
    const wrapper = shallowMount(ComponentWithVuexGetters, { store, localVue })

    expect(wrapper.find('.fullname').text()).toBe('Bob Doe')
  })

  it('renders a fullname using a mock store', () => {
    const wrapper = shallowMount(ComponentWithVuexGetters, {
      mocks: {
        $store: {
          getters: { fullname: 'Alice Doe' },
        },
      },
    })

    expect(wrapper.find('.fullname').text()).toBe('Alice Doe')
  })

  // NOTE: Vuex getters 通常在组件的 computed 中使用, So ...
  // 仅仅用来测试组件的行为是否正确, 不测试 fullname 或者 getters 实现
  it('renders a fullname using computed mounting options', () => {
    const wrapper = shallowMount(ComponentWithVuexGetters, {
      computed: {
        fullname: () => 'Xiaoming Wang',
      },
    })

    expect(wrapper.find('.fullname').text()).toBe('Xiaoming Wang')
  })
})
