<template>
  <div class="scrollable-view" :style="{ height: height }">
    <div class="scrollable-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  height?: string
}>()
</script>

<style scoped>
.scrollable-view {
  background-color: rgb(var(--slidev-theme-secondary-bg-light));
  border: 1px solid rgb(var(--slidev-theme-secondary-bg-light-outline));
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.scrollable-content {
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* Custom scrollbar styling */
.scrollable-view::-webkit-scrollbar {
  width: 8px;
}

.scrollable-view::-webkit-scrollbar-track {
  background: rgb(var(--slidev-theme-secondary-bg));
  border-radius: 4px;
}

.scrollable-view::-webkit-scrollbar-thumb {
  background: rgb(var(--slidev-theme-secondary-bg-light-outline));
  border-radius: 4px;
}

.scrollable-view::-webkit-scrollbar-thumb:hover {
  background: rgb(var(--slidev-theme-secondary-bg));
}
</style>
