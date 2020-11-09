import { shallowMount } from '@vue/test-utils'
import i18nMock from '@/views/7-mockGlobalObjects/i18nMock.vue'

// FEAT: 通过文件 jest.init.js 配置默认的 mocks - config.mocks['$t'] = ...
// NOTE: 需要在 jest.config.js 中设置 setupFiles: ['<rootDir>/jest.init.js'] 使配置生效
describe('i18nMock', () => {
  it('render successfully', () => {
    const wrapper = shallowMount(i18nMock)
    console.log(wrapper.html())
  })
})
