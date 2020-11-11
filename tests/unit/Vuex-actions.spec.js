import actions from '@/store/actions.js'

// mock axios post request
// TODO: jest manual mock axios.
let url = ''
let body = ''
let mockError = false
jest.mock('axios', () => ({
  post: (_url, _body) => {
    return new Promise((resolve) => {
      if (mockError) {
        throw Error()
      }
      url = _url
      body = _body
      resolve(true)
    })
  },
}))

// NOTE: 对比 5.2-TriggeringEventsWithAxios.spec.js
// 定义一个 mockHttp 方法用于模拟用户封装在 Vue.prototype 上的 $http, 需要使用 mocks: { ... } 的方式
// 此处是直接调用引入的 axios, 可以直接使用 jest.mock 来替换掉使用 axios 实现的 API 调用

describe('authenticate', () => {
  // 请求成功
  it('authenticated a user', async () => {
    const commit = jest.fn()
    const username = 'alice'
    const password = 'password'

    await actions.authenticate({ commit }, { username, password })

    // 断言: API 是否正确; payload 是否正确; mutation 是否被正确的 commit
    expect(url).toBe('/api/authenticate')
    expect(body).toEqual({ username, password })
    expect(commit).toHaveBeenCalledWith('SET_AUTHENTICATED', true)
  })

  // 请求失败
  it('catches an error', async () => {
    mockError = true
    await expect(actions.authenticate({ commit: jest.fn() }, {})).rejects.toThrow(
      'API Error occured.'
    )
  })
})
