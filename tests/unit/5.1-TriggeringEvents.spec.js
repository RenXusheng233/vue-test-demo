import { shallowMount } from '@vue/test-utils'
import FormSubmitter from '@/views/5-triggeringEvents/formSubmitter.vue'

describe('FormSubmitter', () => {
  it('reveals a notification when submitted', async () => {
    // Arrange - 安排
    const wrapper = shallowMount(FormSubmitter)

    // Act - 行动
    wrapper.find('[data-username]').setValue('alice')
    wrapper.find('form').trigger('submit.prevent')
    // NOTE: 调用 nextTick 确保 Vue 的响应式更新 DOM
    // 避免断言在 Vue 更新好 DOM 之前运行
    await wrapper.vm.$nextTick()

    // Assert - 断言
    expect(wrapper.find('.message').text()).toBe('Thank you for your submission, alice.')
  })
})
