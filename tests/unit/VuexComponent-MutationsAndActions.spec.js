import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ComponentWithButton from '@/views/componentWithVuexMutationsAndActions/componentWithButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const mutations = {
  testMutation: jest.fn(),
}

const actions = {
  testAction: jest.fn(),
}

const store = new Vuex.Store({ mutations, actions })

// FEAT: Mutation - Commit
describe('ComponentWithButtonCommit', () => {
  // NOTE: real store
  // commit mutation
  // mutation params: someMutation(state, payload) { ... }
  it('commits a mutation when a button is clicked and using a real store', async () => {
    const wrapper = shallowMount(ComponentWithButton, {
      store,
      localVue,
    })

    wrapper.find('.commit').trigger('click')
    await wrapper.vm.$nextTick()

    expect(mutations.testMutation).toHaveBeenCalledWith({}, { msg: 'Test Commit' }) // state 未声明, 为空对象
  })

  // NOTE: mock store
  it('commits a mutation when a button is clicked and using a mock store', async () => {
    const mockStore = {
      commit: jest.fn(),
    }
    const wrapper = shallowMount(ComponentWithButton, {
      mocks: {
        $store: mockStore,
      },
    })

    wrapper.find('.commit').trigger('click')
    await wrapper.vm.$nextTick()

    expect(mockStore.commit).toHaveBeenCalledWith('testMutation', { msg: 'Test Commit' })
  })
})

// FEAT: Action - Dispatch
describe('ComponentWithButtonDispatch', () => {
  // NOTE: real store
  // dispatch actions
  // action params: someAction(context) { commit... }
  // context: 与 store 具有相同方法和属性的对象
  it('dispatch a action when a button is clicked and using a real store', async () => {
    const wrapper = shallowMount(ComponentWithButton, {
      store,
      localVue,
    })

    wrapper.find('.dispatch').trigger('click')
    await wrapper.vm.$nextTick()

    expect(actions.testAction).toHaveBeenCalled()
    // FIXME: 验证参数时第一个参数 context 不知道应该如何写???
    // 或者只能结合 real store & mock dispatch 来进行测试, 与下面测试具有命名空间的 action 一样
    // expect(actions.testAction).toHaveBeenCalledWith({ ... }, { msg: 'Test Dispatch' })
  })

  // NOTE: mock store
  it('dispatch a action when a button is clicked and using a mock store', async () => {
    const mockStore = { dispatch: jest.fn() }
    const wrapper = shallowMount(ComponentWithButton, {
      mocks: {
        $store: mockStore,
      },
    })

    wrapper.find('.dispatch').trigger('click')
    await wrapper.vm.$nextTick()

    expect(mockStore.dispatch).toHaveBeenCalledWith('testAction', {
      msg: 'Test Dispatch',
    })
  })

  // NOTE: namespaced action
  it('dispatch a namespaced action when button is clicked', async () => {
    store.dispatch = jest.fn() // add mock dispatch

    const wrapper = shallowMount(ComponentWithButton, {
      store,
      localVue,
    })

    wrapper.find('.namespaced-dispatch').trigger('click')
    await wrapper.vm.$nextTick()

    expect(store.dispatch).toHaveBeenCalledWith('namespaced/very/deeply/testAction', {
      msg: 'Test Namespaced Dispatch',
    })
  })
})
