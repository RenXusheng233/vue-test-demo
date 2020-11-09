import { shallowMount } from '@vue/test-utils'
import i18nMock from '@/views/7-mockGlobalObjects/i18nMock.vue'
import Lang from '@/lang.js'

const locale = 'en'

describe('i18nMock', () => {
  it('render successfully', () => {
    // NOTE: mocks - 将任何属性附加到 Vue.prototype 上的方式
    const wrapper = shallowMount(i18nMock, {
      mocks: {
        $t: (msg) => Lang[locale][msg],
      },
    })
    console.log(wrapper.html())
  })
})
