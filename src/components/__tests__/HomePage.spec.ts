import {describe, it, expect} from 'vitest'
import {
  Button as TButton,
  Dialog as TDialog,
  Input as TInput,
  Textarea as TTextarea,
  Space as TSpace,
  Switch as TSwitch,
  Form as TForm,
  FormItem as TFormItem,
} from 'tdesign-vue-next'
import { useListStore } from '@/stores/list'
import {mount} from '@vue/test-utils'
import HomePage from '../HomePage.vue'

describe('HomePage', () => {
  it('renders properly', () => {
    const wrapper = mount(HomePage, {
      props: { msg: 'Hello Vitest' },
      global: {
        components: {
          TButton,
          TDialog,
          TInput,
          TTextarea,
          TSpace,
          TSwitch,
          TForm,
          TFormItem,
        },
        plugins: [],
      }
    })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
