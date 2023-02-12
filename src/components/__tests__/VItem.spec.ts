import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import VItem from '@/components/VItem.vue'
// import type { Website } from '@/stores/list'
// import { defineProps } from 'vue'

describe('VItem', () => {
  it('renders properly', () => {
    const propsData = {
      index: 6,
      data: {
        id: '1',
        name: 'test name',
        url: 'https://www.bing.com',
      },
      edit: false,
    }
    const wrapper = mount(VItem, { props: propsData })
    expect(wrapper.text()).toContain(propsData.data.name)
  })
})
