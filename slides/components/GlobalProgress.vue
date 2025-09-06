<template>
  <div class="global-progress">
    <div class="progress-content">
      <!-- Use direct Slidev template syntax -->
      <template v-if="$slidev?.configs?.slides">
        <template v-for="(slide, index) in $slidev.configs.slides" :key="index">
          <!-- Slide item -->
          <div 
            class="slide-item"
            :class="{ 'current': slide === currentNav }"
            @click="goToSlide(index + 1)"
          >
            {{ slide }}
          </div>
          
          <!-- Chevron separator (except after the last item) -->
          <div 
            v-if="index < $slidev.configs.slides.length - 1"
            :key="`chevron-${index}`"
            class="chevron-separator"
          >
            ›
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Get the current navigation section from frontmatter
const currentNav = computed(() => {
  // Get currentNav from the slide's frontmatter
  return $frontmatter?.currentNav || ''
})

const goToSlide = (slideNumber: number) => {
  // Use Slidev's navigation
  $nav.go(slideNumber)
}
</script>

<style scoped>
.global-progress {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: rgba(30, 30, 30, 0.3);
  backdrop-filter: blur(4px);
  border-top: 1px solid rgba(75, 85, 99, 0.2);
  z-index: 200;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.progress-content {
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 9px;
  font-weight: 300;
  line-height: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  overflow: hidden;
}

.slide-item {
  color: rgba(156, 163, 175, 0.7);
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  padding: 1px 6px;
  border-radius: 2px;
  cursor: pointer;
  pointer-events: auto;
  position: relative;
  height: 16px;
  display: flex;
  align-items: center;
}

.slide-item.current {
  background: rgba(59, 130, 246, 0.15);
  color: rgba(59, 130, 246, 0.9);
  font-weight: 400;
}

.slide-item:not(.current):hover {
  color: rgba(156, 163, 175, 0.9);
  background: rgba(75, 85, 99, 0.1);
}

.chevron-separator {
  color: rgba(156, 163, 175, 0.3);
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin: 0 2px;
}
</style>
