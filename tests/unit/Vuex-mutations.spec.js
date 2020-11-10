// NOTE: mutations 本质上就是普通的 javascript 函数
// 不关心 mutations 中的方法如何实现, 只关注操作后的 state 是否正确即可
import mutations from '@/store/mutations.js'
describe('SET_POST', () => {
  it('add a post to the state', () => {
    const post = { id: 1, title: 'Post' }
    const state = {
      postIds: [],
      posts: {},
    }

    mutations.SET_POST(state, { post })

    expect(state).toEqual({
      postIds: [1],
      posts: { '1': post },
    })
  })
})
