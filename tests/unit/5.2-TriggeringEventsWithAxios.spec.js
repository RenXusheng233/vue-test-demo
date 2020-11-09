import { shallowMount } from '@vue/test-utils'
import FormSubmitterWithAxios from '@/views/5-triggeringEvents/formSubmitterWithAxios.vue'
import flushPromises from 'flush-promises'

// FEAT: 创建 mockHttp - 模拟 http.get
// 设置 url, data 储存 http 请求的参数, 用于断言参数是否正确
let url = ''
let data = ''
const mockHttp = {
  get: (_url, _data) => {
    return new Promise((resolve) => {
      url = _url
      data = _data
      resolve()
    })
  },
}

describe('FormSubmitterWithAxios', () => {
  it('reveals a notification when submitted', async () => {
    const wrapper = shallowMount(FormSubmitterWithAxios, {
      mocks: {
        $http: mockHttp,
      },
    })
    wrapper.find('[data-username]').setValue('bob')
    wrapper.find('form').trigger('submit.prevent')

    // NOTE: flush-promises - 立即 resolve 所有 pending 中的 promises
    // 确保包括 nextTick 在内的所有 promises 均被 reslove, 并且 Vue 也会更新 DOM
    await flushPromises()

    expect(wrapper.find('.message').text()).toBe('Thank you for your submission, bob.')
    expect(url).toBe('/api/v1/register')
    expect(data).toEqual({ username: 'bob' })
  })
})
