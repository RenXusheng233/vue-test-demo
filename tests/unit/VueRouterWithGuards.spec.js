import { shallowMount } from '@vue/test-utils'
import NestedRouteWithGuards from '@/views/componentWithVueRouter/nestedRouteWithGuards.vue'
import { beforeEach } from '@/router/index.js'
import mockModule from '@/bust-cache.js'

// NOTE: 使用jest.mock 替代掉整个 bustCache 模块 => mockModule
jest.mock('@/bust-cache.js', () => ({ bustCache: jest.fn() }))

// FEAT: 路由中包含全局 guards 的情况 eg. [beforeEach]
describe('beforeEach', () => {
  it('busts the cache when going to /user', () => {
    const to = {
      matched: [{ meta: { shouldBustCache: true } }],
    }
    const next = jest.fn()

    beforeEach(to, undefined, next)

    expect(mockModule.bustCache).toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it('does not bust the cache when going to /user', () => {
    const to = {
      matched: [{ meta: { shouldBustCache: false } }],
    }
    const next = jest.fn()

    beforeEach(to, undefined, next)

    expect(mockModule.bustCache).toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })
})

// FEAT: 组件内部使用 guards 的情况 eg. [beforeRouteLeave]
describe('beforeRouteLeave', () => {
  it('calls bustCache and next when leaving the route', async () => {
    const wrapper = shallowMount(NestedRouteWithGuards)
    const next = jest.fn()

    // call wrapper.vm - 为了使用 jest mock 之后的 bustCache
    NestedRouteWithGuards.beforeRouteLeave.call(wrapper.vm, undefined, undefined, next)
    await wrapper.vm.$nextTick()

    expect(mockModule.bustCache).toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })
})
