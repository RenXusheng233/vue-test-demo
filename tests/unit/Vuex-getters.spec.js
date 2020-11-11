import getters from '@/store/getters.js'

const dogs = [
  { name: 'lucky', breed: 'poodle', age: 1 },
  { name: 'pochy', breed: 'dalmatian', age: 2 },
  { name: 'blackie', breed: 'poodle', age: 4 },
]
// 模拟 vuex state
const state = { dogs } // dogs: dogs

describe('poodles', () => {
  it('returns poodles', () => {
    const actual = getters.poodles(state)

    expect(actual).toEqual([dogs[0], dogs[2]])
  })
})

describe('poodlesByAge', () => {
  it('returns poodles by age', () => {
    // NOTE: getters.poodlesByAge 第二个参数实际上是其他 getters
    // 我们的测试目标是 poodlesByAge, 不应该把其他 getters 牵扯进来
    // 所以手动定义 { poodles } 来 stub 掉 getters
    const poodles = [dogs[0], dogs[2]]
    const actual = getters.poodlesByAge(state, { poodles })(1)

    expect(actual).toEqual([dogs[0]])
  })
})
