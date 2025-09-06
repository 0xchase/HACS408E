<template>
  <div class="slidev-layout image-right-2">
    <!-- Global Progress Indicator -->
    <GlobalProgress />
    
    <!-- Main slide content with two images on the right -->
    <div class="slide-content">
      <div class="content-left">
        <slot />
      </div>
      
      <div class="content-right" v-if="$frontmatter.image1 || $frontmatter.image2">
        <div class="image-container">
          <img 
            v-if="$frontmatter.image1"
            :src="$frontmatter.image1" 
            :alt="$frontmatter.image1Alt || 'First image'"
            class="slide-image first-image"
          />
          
          <img 
            v-if="$frontmatter.image2"
            :src="$frontmatter.image2" 
            :alt="$frontmatter.image2Alt || 'Second image'"
            class="slide-image second-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlobalProgress from '../components/GlobalProgress.vue'
</script>

<style scoped>
.image-right-2 {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.slide-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  gap: 2rem;
  align-items: start;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.content-left {
  overflow-y: auto;
  max-height: 100%;
  grid-column: 1;
  grid-row: 1;
  align-self: start;
}

.content-right {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 100%;
  overflow: hidden;
  position: relative;
  grid-column: 2;
  grid-row: 1;
}

.image-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-wrap: nowrap;
}

.slide-image {
  max-width: 100%;
  max-height: 60vh;
  width: auto;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  object-fit: contain;
  object-position: center center;
  display: block;
  margin: 0;
  padding: 0;
  flex-shrink: 0;
}

.first-image {
  max-height: 35vh; /* Smaller to accommodate two images stacked */
}

.second-image {
  max-height: 35vh; /* Smaller to accommodate two images stacked */
}

/* Responsive design */
@media (max-width: 768px) {
  .slide-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .content-right {
    order: -1; /* Images appear above text on small screens */
  }
  
  .image-container {
    flex-direction: row;
    gap: 0.5rem;
  }
  
  .first-image,
  .second-image {
    max-height: 30vh;
    max-width: 48%;
  }
}

/* Ensure the layout container doesn't exceed slide bounds */
.slidev-layout.image-right-2 {
  overflow: hidden;
  max-height: 100vh;
}
</style>
