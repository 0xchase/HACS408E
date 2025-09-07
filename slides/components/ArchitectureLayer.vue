<template>
  <div class="layer" :class="layerClass">
    <div class="layer-title">{{ title }}</div>
    <div class="layer-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  layerClass?: string
}>()
</script>

<style scoped>
.layer {
  border: 1px solid rgb(var(--slidev-theme-secondary-bg-light-outline));
  border-radius: 4px;
  padding: 0.5rem;
  background-color: rgb(var(--slidev-theme-secondary-bg-light));
  position: relative;
}

.layer-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 0.25rem;
  text-align: left;
}

.layer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}
</style>
