<template>
  <HomePage></HomePage>
</template>

<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import HomePage from './components/HomePage.vue'

onErrorCaptured((err: Error, vm: any, info: string) => {
  console.error('errorCaptured', {
    component: vm.$options.__name,
    componentProps: JSON.stringify(vm.$props),
    componentData: JSON.stringify(vm.data),
    errorMessage: err.message,
    errorStack: err.stack,
    info,
  })
})
</script>

<style scoped></style>
