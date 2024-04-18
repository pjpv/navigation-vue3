<template>
  <div class="home">
    <VHeader @addGroup="onAddGroup"></VHeader>
    <VContent ref="contentRef"></VContent>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VHeader from '@/components/VHeader.vue'
import VContent from '@/components/VContent.vue'

// defineProps<{}>()
const contentRef: any = ref(null)
const onAddGroup = () => {
  console.log('onAddGroup')
  contentRef.value.onAddGroup()
}
</script>

<style scoped>
.home {
  filter: none !important;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
  height: inherit;
  color: #e8e8e8;
  font-size: 14px;
}
</style>
