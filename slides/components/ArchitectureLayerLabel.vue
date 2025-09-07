<template>
  <div class="layer-label-container">
    <div class="layer-label-text" :style="{ width: labelWidth }">{{ label }}</div>
    <div class="layer-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  labelWidth?: string
}>()
</script>

<style scoped>
.layer-label-container {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.layer-label-text {
  color: #9ca3af;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: right;
  flex-shrink: 0;
  padding: 0.5rem 0;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 2rem;
}

.layer-content {
  flex: 1;
}
</style>
