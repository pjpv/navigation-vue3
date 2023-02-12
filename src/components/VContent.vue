<template>
  <div class="v-content">
    <div class="v-content-wrapper">
      <draggable
        :list="store.list"
        :animation="200"
        handle=".handle-group"
        group="CONTENT"
        item-key="id"
        class="v-content-draggable"
        @start="drag = true"
        @end="onDragEnd"
      >
        <template #item="{ element, index }">
          <v-group
            :data="element"
            :groupIndex="index"
            :edit="status.editStatus"
            @editGroup="() => onEditGroup(index)"
            @deleteGroup="() => onDeleteGroup(index)"
            @addWebsite="() => onAddWebsite(index)"
            @editWebsite="(itemIndex) => onEditWebsite(index, itemIndex)"
            @deleteWebsite="(itemIndex) => onDeleteWebsite(index, itemIndex)"
            @updateWebsiteSeq="
              (dragData) => onUpdateWebsiteSeq(index, dragData)
            "
          ></v-group>
        </template>
      </draggable>
    </div>
    <t-dialog
      v-if="editWebsiteVisible"
      v-model:visible="editWebsiteVisible"
      :closeOnOverlayClick="false"
      :preventScrollThrough="false"
      :header="editItemForm.type === 'ADD' ? '添加网站' : '编辑网站'"
      draggable
      destroyOnClose
      footer
      showOverlay
      @confirm="handleEditWebsiteConfirm"
    >
      <t-form labelAlign="top">
        <t-form-item label="标题" name="name" initial-data="标题">
          <t-input v-model="editItemForm.name" autofocus placeholder="请输入标题" />
        </t-form-item>
        <t-form-item label="URL" name="url" initial-data="https://127.0.0.1">
          <t-textarea
            v-model="editItemForm.url"
            placeholder="请输入URL"
            name="url"
            :autosize="{ minRows: 3, maxRows: 5 }"
          />
        </t-form-item>
      </t-form>
    </t-dialog>
    <t-dialog
      v-if="editGroupVisible"
      v-model:visible="editGroupVisible"
      :closeOnOverlayClick="false"
      :preventScrollThrough="false"
      :header="editGroupForm.type === 'ADD' ? '添加组' : '编辑组'"
      draggable
      destroyOnClose
      footer
      showOverlay
      @confirm="handleEditGroupConfirm"
    >
      <t-form labelAlign="top">
        <t-form-item label="" name="name" initial-data="标题">
          <t-input v-model="editGroupForm.name" autofocus placeholder="请输入标题" />
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, createVNode, nextTick } from 'vue'
import { DialogPlugin } from 'tdesign-vue-next'
import VGroup from '@/components/VGroup.vue'
import { useListStore } from '@/stores/list'
import { useEditStatusStore } from '@/stores/list'

// defineProps<{}>()
const drag = ref(false)
const editWebsiteVisible = ref(false)
const editGroupVisible = ref(false)
const editGroupForm = ref({
  type: 'ADD',
  name: '',
  groupIndex: 0,
})
const editItemForm = ref({
  type: 'ADD',
  name: '',
  url: '',
  groupIndex: 0,
  itemIndex: 0,
})

const store = useListStore()
const status = useEditStatusStore()
const onAddGroup = () => {
  editGroupForm.value = {
    type: 'ADD',
    name: '',
    groupIndex: 0,
  }
  editGroupVisible.value = true
}
const onEditGroup = (index: number) => {
  const item = store.list[index]
  editGroupForm.value = {
    type: 'EDIT',
    name: item.name,
    groupIndex: index,
  }
  editGroupVisible.value = true
}
const handleEditGroupConfirm = () => {
  if (editGroupForm.value.type === 'ADD') {
    store.addGroup(editGroupForm.value.name)
  } else if (editGroupForm.value.type === 'EDIT') {
    store.updateGroup(editGroupForm.value.name, editGroupForm.value.groupIndex)
  }
  editGroupVisible.value = false
}
const onDeleteGroup = (index: number) => {
  const name = store.list[index].name
  const deleteConfirm = DialogPlugin.confirm({
    header: '删除确认',
    theme: 'warning',
    body: () => {
      return createVNode('div', null, [
        '分组：' + name,
        createVNode('br'),
        '确认删除该组吗？',
      ])
    },
    onConfirm: () => {
      deleteConfirm.destroy()
      nextTick(() => {
        store.deleteGroup(index)
      })
    },
  })
}
const onAddWebsite = (index: number) => {
  // store.addWebsite('test', 'https://www.baidu.com', index)
  console.log('onAddWebsite', index)
  editItemForm.value = {
    type: 'ADD',
    name: '',
    url: '',
    groupIndex: index,
    itemIndex: 0,
  }
  editWebsiteVisible.value = true
}
const onEditWebsite = (index: number, itemIndex: number) => {
  console.log('onEditWebsite', index, itemIndex)
  const item = store.list[index].data[itemIndex]
  editItemForm.value = {
    type: 'EDIT',
    name: item.name,
    url: item.url,
    groupIndex: index,
    itemIndex: itemIndex,
  }
  editWebsiteVisible.value = true
}
const handleEditWebsiteConfirm = () => {
  if (editItemForm.value.type === 'ADD') {
    store.addWebsite(
      editItemForm.value.name,
      editItemForm.value.url,
      editItemForm.value.groupIndex
    )
    editWebsiteVisible.value = false
    return
  } else if (editItemForm.value.type === 'EDIT') {
    store.updateWebsite(
      editItemForm.value.name,
      editItemForm.value.url,
      editItemForm.value.groupIndex,
      editItemForm.value.itemIndex
    )
  }
  editWebsiteVisible.value = false
}
const onDeleteWebsite = (index: number, itemIndex: number) => {
  console.log('onDeleteWebsite', index, itemIndex)
  const { name, url } = store.list[index].data[itemIndex]
  const deleteConfirm = DialogPlugin.confirm({
    header: '删除网站',
    theme: 'warning',
    body: () => {
      return createVNode('div', null, [
        '网站：' + name,
        createVNode('br'),
        'URL：' + url,
        createVNode('br'),
        '确认删除该网站吗？',
      ])
    },
    onConfirm: () => {
      deleteConfirm.destroy()
      nextTick(() => {
        store.deleteWebsite(index, itemIndex)
      })
    },
  })
}
const onUpdateWebsiteSeq = (index: number, dragData: any) => {
  console.log('onUpdateWebsiteSeq', index, dragData)
  store.updateWebsiteSeq(index, dragData.oldIndex, dragData.newIndex)
}
const onDragEnd = (e: any) => {
  console.log('VContent onDragEnd', e)
  drag.value = false
  // store.updateGroupSeq(e.oldIndex, e.newIndex)
  store.saveToLocalStorage()
}
defineExpose({ onAddGroup })
</script>

<style scoped lang="less">
.v-content {
  height: calc(100vh - 100px);

  &-wrapper {
    //column-count: 3;
    column-width: 350px;
    column-gap: 0;
    height: inherit;
    overflow: auto;
    margin-left: -20px;
    margin-right: -20px;
  }
}
</style>
