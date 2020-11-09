import { shallowMount } from '@vue/test-utils'
import Emmiter from '@/views/6-emitEvent/emitter.vue'

describe('Emmiter', () => {
  it('emits an event with two arguments by mount', () => {
    // FEAT: mount
    const wrapper = shallowMount(Emmiter)

    // 调用组件内的方法
    wrapper.vm.emitEvent()

    // wrapper.emitted - { myEvent: [['name', 'password']] }
    // emitted 每个属性都是数组, 已发出事件的参数也被保存为数组
    expect(wrapper.emitted().myEvent[0]).toEqual(['name', 'password'])
  })

  // FEAT: call
  it('emits an event with two arguments by call', () => {
    const events = {}
    const $emit = (event, ...args) => {
      events[event] = [...args] // 赋值
    }

    Emmiter.methods.emitEvent.call({ $emit }) // { $emit: $emit }

    expect(events.myEvent).toEqual(['name', 'password'])
  })
})

// NOTE: 如果连续调用两次 wrapper.vm.emitEvent()
// wrapper.emitted - { myEvent: [['name', 'password'], ['name', 'password']] }
