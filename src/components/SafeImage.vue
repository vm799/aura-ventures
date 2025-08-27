<template>
  <img
    :src="resolvedSrc"
    :alt="alt"
    :class="cls"
    :style="style"
    :decoding="decoding"
    :loading="loading"
  />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{ 
  src: string
  alt?: string
  fallback?: string
  class?: string
  style?: string | Record<string, string>
  decoding?: 'sync' | 'async' | 'auto'
  loading?: 'eager' | 'lazy'
}>()

const placeholder = props.fallback || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22150%22%3E%3Crect width=%22300%22 height=%22150%22 fill=%22%23222228%22/%3E%3Ctext x=%22150%22 y=%2275%22 fill=%22%23aaaaaa%22 font-size=%2214%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22%3EImage unavailable%3C/text%3E%3C/svg%3E'
const resolvedSrc = ref<string>(placeholder)

const cls = (props as any).class
const alt = props.alt || ''
const style = props.style as any
const decoding = props.decoding || 'auto'
const loading = props.loading || 'lazy'

function tryLoad(src: string) {
  if (!src) {
    resolvedSrc.value = placeholder
    return
  }
  const img = new Image()
  img.onload = () => {
    resolvedSrc.value = src
  }
  img.onerror = () => {
    resolvedSrc.value = placeholder
  }
  img.src = src
}

onMounted(() => {
  tryLoad(props.src)
})

watch(() => props.src, (newSrc) => {
  tryLoad(newSrc)
})
</script>

