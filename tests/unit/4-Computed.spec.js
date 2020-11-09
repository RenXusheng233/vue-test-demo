import { shallowMount } from '@vue/test-utils'
import NumberRender from '@/views/4-computed/numberRender.vue'

describe('NumberRender', () => {
  // FEAT: 渲染组件并作出断言
  it('render even numbers', () => {
    const wrapper = shallowMount(NumberRender, {
      propsData: {
        even: true,
      },
    })
    expect(wrapper.text()).toBe('2,4,6,8')
  })

  // FEAT: 无需真正渲染组件来测试计算属性
  // NOTE: 注意需要使用 call(...), 因为组件没有渲染, 所以 Vue 不为 this 绑定任何东西
  // 而在 computed.numbers 方法中使用了 `this.even`, So...
  it('render odd numbers', () => {
    const localThis = { even: false }
    expect(NumberRender.computed.numbers.call(localThis)).toBe('1,3,5,7,9')
  })
})

// NOTE: shallowMount or call
// 在保证渲染正确的前提下, 使用 call 的方式可以在组件生命周期有较多耗时操作、计算属性比较复杂的情况下单独测试
