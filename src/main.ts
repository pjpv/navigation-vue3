import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import TDesign from 'tdesign-vue-next'
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
import App from './App.vue'

import './assets/main.css'
import 'tdesign-vue-next/es/style/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(TButton)
app.use(TDialog)
app.use(TInput)
app.use(TTextarea)
app.use(TSpace)
app.use(TSwitch)
app.use(TForm)
app.use(TFormItem)
// app.use(TDesign)

app.mount('#app')
