<template>
  <div class="v-header">
    <t-space class="left" direction="horizontal">
      <t-input
        v-model="searchText"
        clearable
        autofocus
        size="large"
        placeholder="搜索"
        style="width: 380px"
        @enter="() => onSearch()"
      />
      <t-button size="large" @click="() => onSearch('baidu')">Baidu</t-button>
      <t-button size="large" @click="() => onSearch('google')">Google</t-button>
      <t-button size="large" @click="() => onSearch('bing')">Bing</t-button>
    </t-space>
    <t-space class="right" direction="horizontal">
      <t-button v-if="status.editStatus" @click="onSetting">配置</t-button>
      <t-button v-if="status.editStatus" @click="onAddGroup">添加组</t-button>
      <t-switch v-model="status.editStatus" />
    </t-space>
    <t-dialog
      v-if="visible"
      v-model:visible="visible"
      :closeOnOverlayClick="false"
      :preventScrollThrough="false"
      confirm-btn="保存"
      header="配置"
      draggable
      destroyOnClose
      footer
      showOverlay
      @confirm="handleConfirm"
    >
      <t-textarea
        v-model="text"
        placeholder="配置JSON"
        name="test"
        :autosize="{ minRows: 10, maxRows: 20 }"
      />
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useEditStatusStore, useListStore} from '@/stores/list'
import { useSearchStore } from '@/stores/search'

const emit = defineEmits(['addGroup'])
const visible = ref(false)
const EngineList: { [key: string]: string } = {
  baidu: 'https://www.baidu.com/s?ie=utf-8&wd=%s',
  google: 'https://www.google.com/search?q=%s',
  bing: 'https://www.bing.com/search?q=%s',
}
const status = useEditStatusStore()
const listStore = useListStore()
const searchStore: any = useSearchStore()

const searchText = ref('')
const text = ref('')

const open = (url: string) => {
  const searchUrl = url.replace('%s', encodeURIComponent(searchText.value))
  const newWindow: any = window.open(searchUrl, '_self')
  newWindow.focus()
}

const onSearch = (type: string = '') => {
  let useType = type
  if (!useType) {
    useType = searchStore.searchEngine
  } else if (useType !== searchStore.searchEngine) {
    searchStore.updateSearchEngine(useType)
  }
  setTimeout(() => {
    open(EngineList[useType])
  }, 100)
}
const onAddGroup = () => {
  emit('addGroup')
}
const onSetting = () => {
  text.value = JSON.stringify(listStore.list, null, 0)
  visible.value = true
}
const handleConfirm = () => {
  try {
    listStore.updateList(JSON.parse(text.value))
    visible.value = false
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped lang="less">
.v-header {
  max-width: 1224px;
  margin: 0 auto;
  padding: 0 2rem;
}

.left {

}
.right {
 float: right;
}
</style>
