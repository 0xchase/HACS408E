<template>
  <div class="directory-entry">
    <div class="entry-header" @click="toggleExpanded">
      <span class="expand-icon" :class="{ expanded: isExpanded }">▶</span>
      <span class="entry-icon">📁</span>
      <span class="entry-name directory-name">{{ name }}</span>
      <span v-if="description" class="entry-description">{{ description }}</span>
    </div>
    <div class="entry-children" v-if="$slots.default && isExpanded">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  name: string
  description?: string
  expanded?: boolean
}>()

const isExpanded = ref(props.expanded ?? false)

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.directory-entry {
  margin: 0.25rem 0;
}

.entry-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.25rem 0;
  cursor: pointer;
  user-select: none;
}

.entry-header:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
}

.expand-icon {
  color: #6b7280;
  font-size: 0.8rem;
  transition: transform 0.2s ease;
  min-width: 1rem;
  text-align: center;
}

.expand-icon.expanded {
  transform: rotate(90deg);
}

.dark .entry-header:hover {
  background-color: rgba(255, 255, 255, 0.05);
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

.directory-name {
  color: #3b82f6;
  font-weight: 600;
}

.entry-description {
  color: #6b7280;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.entry-children {
  margin-left: 1.5rem;
}

.dark .entry-name {
  color: #f3f4f6;
}

.dark .directory-name {
  color: #60a5fa;
}

.dark .entry-description {
  color: #9ca3af;
}
</style>
