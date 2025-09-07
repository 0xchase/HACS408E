<template>
  <div class="file-entry">
    <div class="entry-header">
      <span class="entry-icon">📄</span>
      <span class="entry-name file-name">{{ name }}</span>
      <span v-if="description" class="entry-description">{{ description }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  description?: string
}>()
</script>

<style scoped>
.file-entry {
  margin: 0.25rem 0;
}

.entry-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.25rem 0;
}

.entry-icon {
  color: #6b7280;
  font-weight: bold;
  min-width: 1rem;
  text-align: center;
}

.entry-name {
  font-weight: 500;
  color: #1f2937;
}

.file-name {
  color: #059669;
}

.entry-description {
  color: #6b7280;
  font-style: italic;
  margin-left: 0.5rem;
}

.dark .entry-name {
  color: #f3f4f6;
}

.dark .file-name {
  color: #34d399;
}

.dark .entry-description {
  color: #9ca3af;
}
</style>
