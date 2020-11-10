import { shallowMount } from '@vue/test-utils'
import Parent from '@/views/9-findElementsAndComponents/parent.vue'
import Child from '@/views/9-findElementsAndComponents/child.vue'

describe('Parent', () => {
  // FEAT: v-show: find('xxx').isVisible()
  // find 具有 querySelector 语法
  describe('render a element', () => {
    it('does not render a element', () => {
      const wrapper = shallowMount(Parent)

      expect(wrapper.find('span').isVisible()).toBe(false)
    })

    it('does render a element', () => {
      const wrapper = shallowMount(Parent, {
        data() {
          return { showSpan: true }
        },
      })

      expect(wrapper.find('span').isVisible()).toBe(true)
    })
  })

  // FEAT: v-if: find('xxx').exists()
  // findComponent - 检查子组件的 `name` 属性
  describe('render a component', () => {
    it('does not render a component', () => {
      const wrapper = shallowMount(Parent)

      expect(wrapper.findComponent(Child).exists()).toBe(false)
    })

    it('does render a component', () => {
      const wrapper = shallowMount(Parent, {
        data() {
          return { showChild: true }
        },
      })

      expect(wrapper.findComponent(Child).exists()).toBe(true)
    })
  })
})

// NOTE: findAll, findAllComponents
// findAll('xxx').length, findAllComponents('xxx').length 可以判断渲染了多少个此元素/组件
