<template>
  <div :class="{ edit: edit }" class="v-item">
    <div class="v-item-text" @click="onClick">
      <span class="v-item-text-index">[{{ index + 1 }}]</span>{{ data.name }}
    </div>
    <div v-if="edit" class="v-item-delete">
      <CloseIcon class="v-group-header-delete-group icon-btn" name="close" @click="onDelete" />
    </div>
    <div v-if="edit" class="handle-item">
      <MoveIcon class="icon-btn" name="move"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Website } from '@/stores/list'
import { openUrl } from '@/utils'
import { MoveIcon, CloseIcon } from 'tdesign-icons-vue-next';
const emit = defineEmits(['deleteWebsite', 'editWebsite'])
const props = defineProps<{
  data: Website
  index: number
  edit: boolean
}>()

const REG_HTTP = new RegExp(/^http:\/\/.+/)
const REG_HTTPS = new RegExp(/^https:\/\/.+/)
const REG_URL = new RegExp(/^([a-zA-z-]+:\/\/)(.+)/)

const onClick = (e: any) => {
  const newWin = e.ctrlKey
  e.stopPropagation()
  e.preventDefault()
  if (props.edit) {
    emit('editWebsite')
  } else {
    const url = props.data.url
    if (REG_URL.test(url)) {
      openUrl(url, newWin)
    }
  }
}
const onDelete = () => {
  emit('deleteWebsite')
}
</script>

<style scoped lang="less">
.v-item {
  margin: 4px 8px;
  border-radius: 4px;
  //text-shadow: 0px 0px 12px #000000;
  filter: drop-shadow(1px 3px 2px #000000)!important;
  &-text,
  &-delete {
    margin: 4px 0;
    font-size: 15px;
    cursor: pointer;
    display: inline-block;
    font-weight: bold;
    &-index {
      padding-right: 4px;
      user-select: none;
    }
  }
  &-delete {
    margin: 4px 0;
    margin-left: 20px;
    border: 1px solid transparent;
    &:hover {
      border: 1px dashed #ccc;
    }
  }
  .handle-item {
    display: inline-block;
    cursor: move;
    float: left;
    margin: 4px 10px;
    vertical-align: middle;
  }
  &.edit {
    background: rgba(245, 245, 245, 0.2);
  }
}
</style>
