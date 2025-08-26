<template>
  <div>
    <!-- Navigation -->
    <LuxuryNavigation />

    <!-- Main Content -->
    <main class="pt-20">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import LuxuryNavigation from '@/components/LuxuryNavigation.vue'
</script>
