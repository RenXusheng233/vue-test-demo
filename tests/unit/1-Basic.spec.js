import { mount } from '@vue/test-utils'

import Demo from '@/views/1-basic/demo.vue'

// NOTE: describe - 测试的主体
describe('Demo', () => {
  it('render a demo', () => {
    const wrapper = mount(Demo)
    expect(wrapper.text()).toMatch('Vue and TDD')
  })
})
