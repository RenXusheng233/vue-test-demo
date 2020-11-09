import { mount, shallowMount } from '@vue/test-utils'
import Parent from '@/views/2-mountAndShallowMount/parent.vue'

describe('Parent', () => {
  it('two ways to render parent', () => {
    // FEAT: mount
    // NOTE: 完整渲染 Parent & Child, 若 Child 在 mounted 中有 API 请求, 则该渲染也会同时请求.
    const mountWrapper = mount(Parent)
    console.log(mountWrapper.html())

    // FEAT: shallowMount
    // NOTE: 子组件 Child 被渲染为 <child-stub></child-stub>
    const shallowMountWrapper = shallowMount(Parent)
    console.log(shallowMountWrapper.html())
  })
})
