import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import App from '@/App.vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes.js'
import NestedRoute from '@/views/componentWithVueRouter/nestedRoute.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('AppWithRealRouter', () => {
  it('renders a child component via routing', async () => {
    // NOTE: 因为使用了 mount, 在子组件比较复杂(内部包含子组件、各种 API 调用等)的情况下可以通过 jest mock 掉子组件
    jest.mock('@/views/componentWithVueRouter/nestedRoute.vue', () => ({
      name: 'NestedRoute',
      render: (h) => h('div'),
    }))

    // 局部定义 router
    const router = new VueRouter({ routes })

    // NOTE: 注意要使用 mount, 使用 shallowMount 会导致 <router-view> <router-link> 被忽略
    const wrapper = mount(App, {
      localVue,
      router,
    })

    router.push('/nested-route')
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(NestedRoute).exists()).toBe(true)
  })
})

describe('AppWithMockRouter', () => {
  // $route.params.xxx
  it('renders a username from query string', () => {
    const username = 'alice'

    const wrapper = shallowMount(NestedRoute, {
      mocks: {
        $route: {
          params: { username },
        },
      },
    })

    expect(wrapper.find('.username').text()).toBe(username)
  })
})
