<template>
  <div class="arrow-container" :style="{ height: height }">
    <div class="arrow-content">
      <slot />
    </div>
    <div class="arrow-down">↓</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  height?: string
}>()
</script>

<style scoped>
.arrow-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-height: 2rem;
}

.arrow-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.arrow-down {
  color: #9ca3af;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1;
}
</style>
