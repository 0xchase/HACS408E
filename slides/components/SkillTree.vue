<template>
  <div class="skill-tree" 
       @mousedown="startDrag" 
       @mousemove="onDrag" 
       @mouseup="stopDrag" 
       @wheel="onWheel"
       @mouseleave="stopDrag">
    <div class="tree-container" 
         :style="{ 
           transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
           cursor: isDragging ? 'grabbing' : 'grab'
         }">
      <!-- Root node -->
      <div class="tree-node root-node">
        <div class="node-content">
          <div class="node-icon">🎯</div>
          <div class="node-text">{{ rootNode.title }}</div>
        </div>
        
        <!-- Main branches -->
        <div class="tree-branches">
          <div 
            v-for="(branch, index) in rootNode.branches" 
            :key="index"
            class="tree-branch"
          >
            <div class="branch-line"></div>
            <div class="tree-node branch-node" :class="`branch-${index}`">
              <div class="node-content">
                <div class="node-icon">{{ branch.icon }}</div>
                <div class="node-text">{{ branch.title }}</div>
              </div>
              
              <!-- Sub-branches -->
              <div class="tree-branches sub-branches" v-if="branch.subBranches">
                <div 
                  v-for="(subBranch, subIndex) in branch.subBranches" 
                  :key="subIndex"
                  class="tree-branch sub-branch"
                >
                  <div class="branch-line sub-line"></div>
                  <div class="tree-node sub-node">
                    <div class="node-content">
                      <div class="node-icon">{{ subBranch.icon }}</div>
                      <div class="node-text">{{ subBranch.title }}</div>
                    </div>
                    
                    <!-- Leaf nodes -->
                    <div class="tree-branches leaf-branches" v-if="subBranch.leaves">
                      <div 
                        v-for="(leaf, leafIndex) in subBranch.leaves" 
                        :key="leafIndex"
                        class="tree-branch leaf-branch"
                      >
                        <div class="branch-line leaf-line"></div>
                        <div class="tree-node leaf-node">
                          <div class="node-content">
                            <div class="node-icon">{{ leaf.icon }}</div>
                            <div class="node-text">{{ leaf.title }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Zoom controls -->
    <div class="zoom-controls">
      <button @click="zoomIn" class="zoom-btn" title="Zoom In">+</button>
      <button @click="zoomOut" class="zoom-btn" title="Zoom Out">−</button>
      <button @click="resetView" class="zoom-btn reset-btn" title="Reset View">⌂</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface SkillNode {
  title: string
  icon: string
  subBranches?: SkillNode[]
  leaves?: SkillNode[]
}

interface SkillTreeData {
  rootNode: SkillNode
}

const props = defineProps<{
  data: SkillTreeData
}>()

const rootNode = props.data.rootNode

// Pan and zoom state
const pan = reactive({ x: 0, y: 0 })
const zoom = ref(1)
const isDragging = ref(false)
const dragStart = reactive({ x: 0, y: 0 })

// Drag functionality
const startDrag = (event: MouseEvent) => {
  isDragging.value = true
  dragStart.x = event.clientX - pan.x
  dragStart.y = event.clientY - pan.y
  event.preventDefault()
}

const onDrag = (event: MouseEvent) => {
  if (!isDragging.value) return
  
  pan.x = event.clientX - dragStart.x
  pan.y = event.clientY - dragStart.y
  event.preventDefault()
}

const stopDrag = () => {
  isDragging.value = false
}

// Zoom functionality
const onWheel = (event: WheelEvent) => {
  event.preventDefault()
  
  const delta = event.deltaY > 0 ? 0.9 : 1.1
  const newZoom = Math.max(0.3, Math.min(3, zoom.value * delta))
  
  // Zoom towards mouse position
  const rect = event.currentTarget.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top
  
  const scaleChange = newZoom / zoom.value
  pan.x = mouseX - (mouseX - pan.x) * scaleChange
  pan.y = mouseY - (mouseY - pan.y) * scaleChange
  
  zoom.value = newZoom
}

const zoomIn = () => {
  zoom.value = Math.min(3, zoom.value * 1.2)
}

const zoomOut = () => {
  zoom.value = Math.max(0.3, zoom.value / 1.2)
}

const resetView = () => {
  pan.x = 0
  pan.y = 0
  zoom.value = 1
}
</script>

<style scoped>
.skill-tree {
  width: 100%;
  height: calc(100vh - 120px);
  max-height: calc(100vh - 120px);
  overflow: hidden;
  padding: 1rem;
  position: relative;
  user-select: none;
  border: 2px solid rgba(75, 85, 99, 0.4);
  border-radius: 0.75rem;
  background: rgba(30, 30, 30, 0.1);
}

.tree-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100%;
  max-height: 100%;
  transform-origin: center center;
  transition: none;
  overflow: visible;
}

/* Zoom controls */
.zoom-controls {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 100;
}

.zoom-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(30, 30, 30, 0.8);
  color: rgba(156, 163, 175, 0.9);
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border: 1px solid rgba(75, 85, 99, 0.3);
}

.zoom-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.6);
  color: rgba(59, 130, 246, 0.9);
  transform: scale(1.1);
}

.reset-btn {
  font-size: 1rem;
}

.tree-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.node-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: rgba(30, 30, 30, 0.8);
  border: 2px solid rgba(75, 85, 99, 0.3);
  min-width: 120px;
  text-align: center;
  transition: all 0.3s ease;
}

.node-content:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.node-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.node-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(156, 163, 175, 0.9);
  line-height: 1.2;
}

.tree-branches {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  position: relative;
}

.sub-branches {
  margin-top: 0.75rem;
  gap: 0.75rem;
}

.leaf-branches {
  margin-top: 0.5rem;
  gap: 0.5rem;
}

.tree-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.branch-line {
  width: 2px;
  height: 1rem;
  background: linear-gradient(to bottom, rgba(75, 85, 99, 0.5), rgba(75, 85, 99, 0.2));
  margin-bottom: 0.5rem;
}

.sub-line {
  height: 0.75rem;
}

.leaf-line {
  height: 0.5rem;
}

/* Node type styling */
.root-node .node-content {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.6);
}

.branch-node .node-content {
  background: rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.6);
}

.branch-1 .node-content {
  background: rgba(245, 158, 11, 0.2);
  border-color: rgba(245, 158, 11, 0.6);
}

.branch-2 .node-content {
  background: rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.6);
}

.branch-3 .node-content {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.6);
}

.branch-4 .node-content {
  background: rgba(6, 182, 212, 0.2);
  border-color: rgba(6, 182, 212, 0.6);
}

.sub-node .node-content {
  background: rgba(75, 85, 99, 0.3);
  border-color: rgba(75, 85, 99, 0.5);
  min-width: 100px;
  padding: 0.5rem 0.75rem;
}

.leaf-node .node-content {
  background: rgba(75, 85, 99, 0.2);
  border-color: rgba(75, 85, 99, 0.4);
  min-width: 80px;
  padding: 0.375rem 0.5rem;
}

.sub-node .node-icon {
  font-size: 1.25rem;
}

.leaf-node .node-icon {
  font-size: 1rem;
}

.sub-node .node-text {
  font-size: 0.75rem;
}

.leaf-node .node-text {
  font-size: 0.625rem;
}

/* Responsive design */
@media (max-width: 1024px) {
  .tree-branches {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .sub-branches {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .leaf-branches {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
