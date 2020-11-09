import { shallowMount } from '@vue/test-utils'
import SubmitButton from '@/views/3-props/submitButton.vue'

const msg = 'submit'

const factory = (propsData) => {
  // NOTE: mount shallowMount 均可, 优先使用 shallowMount
  return shallowMount(SubmitButton, {
    propsData: {
      msg,
      ...propsData,
    },
  })
}

describe('SubmitButton', () => {
  describe('does not have admin privileges', () => {
    it('renders a message', () => {
      const wrapper = factory()

      expect(wrapper.find('span').text()).toBe('Not Authorized')
      expect(wrapper.find('button').text()).toBe('submit')
    })
  })
  describe('has admin privileges', () => {
    it('renders a message', () => {
      const wrapper = factory({ isAdmin: true })

      expect(wrapper.find('span').text()).toBe('Admin Privileges')
      expect(wrapper.find('button').text()).toBe('submit')
    })
  })
})
