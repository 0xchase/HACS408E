<template>
  <div class="slidev-layout default">
    <!-- Global Progress Indicator -->
    <GlobalProgress />
    
    <!-- Main slide content -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import GlobalProgress from '../components/GlobalProgress.vue'
</script>

<style scoped>
.default {
  width: 100%;
  height: 100%;
}
</style>
