<template>
  <img
    v-bind="$attrs"
    :src="resolvedSrc"
    :alt="props.alt || ''"
  />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{ 
  src: string
  alt?: string
  fallback?: string
}>()

const defaultPlaceholder = 'https://images.unsplash.com/photo-1540946485063-a40da4821b96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
const placeholder = props.fallback || defaultPlaceholder
const resolvedSrc = ref<string>(placeholder)

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

