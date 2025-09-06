<template>
  <div class="browser-container" :style="{ width: width, height: height }">
    <!-- Mac-style title bar -->
    <div class="browser-titlebar">
      <div class="titlebar-buttons">
        <div class="titlebar-button close"></div>
        <div class="titlebar-button minimize"></div>
        <div class="titlebar-button maximize"></div>
      </div>
      <div class="titlebar-url" @click="openInNewTab" role="button" tabindex="0">
        <div class="url-icon">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10z"/>
          </svg>
        </div>
        <span class="url-text">{{ displayUrl }}</span>
      </div>
    </div>
    
    <!-- Browser content area -->
    <div class="browser-content">
      <iframe 
        :src="url" 
        width="100%" 
        height="100%" 
        frameborder="0"
        class="browser-iframe"
        style="transform: scale(1.0); transform-origin: 0 0;"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  url: string
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '500px'
})

// Format URL for display (remove protocol and www)
const displayUrl = computed(() => {
  try {
    const urlObj = new URL(props.url)
    let display = urlObj.hostname
    if (urlObj.pathname !== '/') {
      display += urlObj.pathname
    }
    return display
  } catch {
    return props.url
  }
})

const openInNewTab = () => {
  window.open(props.url, '_blank')
}
</script>

<style scoped>
.browser-container {
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
}

.browser-titlebar {
  background: linear-gradient(to bottom, #f8f8f8, #e8e8e8);
  border-bottom: 1px solid #d0d0d0;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 32px;
  flex-shrink: 0;
}

.titlebar-buttons {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.titlebar-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
}

.titlebar-button.close {
  background: #ff5f57;
  border: 1px solid #e0443e;
}

.titlebar-button.minimize {
  background: #ffbd2e;
  border: 1px solid #dea123;
}

.titlebar-button.maximize {
  background: #28ca42;
  border: 1px solid #1aab29;
}

.titlebar-url {
  flex: 1;
  background: white;
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #d0d0d0;
  min-width: 0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.titlebar-url:hover {
  background: #f8f9fa;
  border-color: #4a90e2;
  box-shadow: 0 0 0 1px rgba(74, 144, 226, 0.2);
}

.titlebar-url:active {
  background: #e9ecef;
  transform: translateY(1px);
}

.url-icon {
  font-size: 12px;
  color: #4a90e2;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.url-text {
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 11px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.browser-content {
  background: white;
  padding: 0;
  flex: 1;
  min-height: 0;
}

.browser-iframe {
  display: block;
  border: none;
  width: 100%;
  height: 100%;
}
</style>
