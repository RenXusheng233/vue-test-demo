import { mount, shallowMount } from '@vue/test-utils'
import ParentWithAPICallChild from '@/views/8-stubComponent/parentWithAPICallChild.vue'
import ChildWithAsyncCall from '@/views/8-stubComponent/childWithAsyncCall.vue'

describe('ParentWithAPICallChild', () => {
  it('renders with mount and does initialize API call', () => {
    const wrapper = mount(ParentWithAPICallChild)

    // NOTE: finding components with `find` or `get` is deprecated and will be removed in the next major version.
    // Use `findComponent` and `getComponent` instead.

    // FIXME: 会调用子组件生命周期 created 中的方法, 打印 'Making api call'
    // 当前目标测试组件是父组件, 不想也不应该在单元测试中发起额外的 API 调用
    expect(wrapper.findComponent(ChildWithAsyncCall).exists()).toBe(true)
  })

  it('renders with mount and does not initialize API call', () => {
    // FEAT: 用 stub 去替换原始数组
    const wrapper = mount(ParentWithAPICallChild, {
      stubs: {
        ChildWithAsyncCall: true,
      },
    })
    expect(wrapper.findComponent(ChildWithAsyncCall).exists()).toBe(true)
  })

  it('renders with shallowMount', () => {
    // FEAT: shallowMount - 默认 stub **任何其他数组**
    const wrapper = shallowMount(ParentWithAPICallChild)

    expect(wrapper.findComponent(ChildWithAsyncCall).exists()).toBe(true)
  })
})
