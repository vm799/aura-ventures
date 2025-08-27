<template>
  <div class="p-2">
    <h1>{{ msg }}</h1>
  </div>
  </template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ msg: string }>()
</script>

<style scoped>
h1 {
  color: white;
}
</style>

