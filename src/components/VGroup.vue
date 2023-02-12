<template>
  <div :class="{ edit: edit }" class="v-group">
    <div class="v-group-wrapper">
      <div class="v-group-header">
        <div v-if="edit" class="handle-group">
          <MoveIcon class="icon-btn" name="move"/>
        </div>
        <div class="v-group-header-text" @click="edit ? emit('editGroup') : ''">
          {{ data.name }}
        </div>
        <AddIcon
          v-if="edit"
          class="v-group-header-delete-group icon-btn"
          name="add"
          @click="onAddWebsite"
        />
        <CloseIcon
          v-if="edit"
          class="v-group-header-delete-group icon-btn"
          name="close"
          @click="onIconClose"
        />
      </div>
      <div class="v-group-items">
        <draggable
          v-model="list"
          :animation="200"
          handle=".handle-item"
          :group="groupIndex"
          @start="drag = true"
          @end="onDragEnd"
          item-key="id"
        >
          <template #item="{ element, index }">
            <v-item
              :data="element"
              :edit="edit"
              :index="index"
              @editWebsite="emit('editWebsite', index)"
              @deleteWebsite="emit('deleteWebsite', index)"
            />
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import draggable from 'vuedraggable'
import VItem from '@/components/VItem.vue'
import type {WebsiteGroup} from '@/stores/list'
import { MoveIcon, AddIcon, CloseIcon } from 'tdesign-icons-vue-next';


const emit = defineEmits([
  'editGroup',
  'deleteGroup',
  'addWebsite',
  'editWebsite',
  'deleteWebsite',
  'updateWebsiteSeq',
])
const props = defineProps<{
  data: WebsiteGroup
  edit: boolean
  groupIndex: number
}>()
const list: any = ref(props.data.data)
const drag = ref(false)
const onIconClose = () => {
  emit('deleteGroup')
}
const onAddWebsite = () => {
  emit('addWebsite')
}
const onDragEnd = (e: any) => {
  console.log('onDragEnd', e)
  e.oldIndex
  emit('updateWebsiteSeq', {oldIndex: e.oldIndex, newIndex: e.newIndex})
}
</script>

<style scoped lang="less">
.v-group {
  line-height: 1.3;
  //margin: 20px 0;
  position: relative;
  display: inline-block;
  width: 100%;
  padding: 20px;
  &-wrapper {
    display: inline-block;
    width: 100%;
    border-radius: 6px;
    background: rgba(245, 245, 245, 0.1);
    padding: 10px;
    //filter: drop-shadow(4px 5px 3px #000000)!important;
    box-shadow: 1px 2px 7px 0px #0000006b;
  }

  &-header {
    padding: 5px;
    position: relative;

    &-text {
      display: inline-block;
      font-weight: bold;
      font-size: 18px;
      vertical-align: middle;
      text-shadow: 0px 0px 12px #000000;
    }

    &-delete-group {
      display: inline-block;
    }
  }

  .icon-btn {
    margin: 0 8px;
    padding: 0 0;
    height: 20px;
    width: 20px;
    cursor: pointer;
  }

  .handle-group {
    display: inline-block;
    cursor: move;
    margin: 4px 10px 4px 0;
    vertical-align: middle;
  }

  .edit & {
    &-header {
      //background: rgba(245, 245, 245, 0.2);
      //margin-right: 20px;
    }
  }
}
</style>
