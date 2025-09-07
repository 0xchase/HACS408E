<template>
  <div class="item" :style="{ backgroundColor: color }">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  color: string
}>()
</script>

<style scoped>
.item {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
  width: fit-content;
  white-space: nowrap;
}
</style>
