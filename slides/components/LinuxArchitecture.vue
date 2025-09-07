<template>
  <div class="linux-architecture">
    <div class="architecture-container">
      <!-- User Space -->
      <div class="layer user-space">
        <div class="layer-title">User Space</div>
        <div class="layer-content">
          <div class="component app">Applications</div>
        </div>
      </div>

      <!-- User/Kernel Boundary -->
      <div class="boundary">
        <div class="boundary-line"></div>
        <div class="boundary-label">User/Kernel Boundary</div>
      </div>

      <!-- System Call Interface -->
      <div class="layer system-calls">
        <div class="layer-title">System Call Interface</div>
        <div class="layer-content">
          <div class="component syscall">System Calls</div>
        </div>
      </div>

      <!-- Kernel Subsystems -->
      <div class="layer kernel-subsystems">
        <div class="layer-title">Kernel Subsystems</div>
        <div class="subsystems-grid">
          <div class="subsystem">Process Mgmt</div>
          <div class="subsystem">Memory Mgmt</div>
          <div class="subsystem">File System</div>
          <div class="subsystem">Network Stack</div>
          <div class="subsystem">Audio</div>
          <div class="subsystem">Device Mgmt</div>
        </div>
      </div>

      <!-- Device Drivers -->
      <div class="layer device-drivers">
        <div class="layer-title">Device Drivers</div>
        <div class="drivers-grid">
          <div class="driver">Block Drivers</div>
          <div class="driver">Network Drivers</div>
          <div class="driver">FS Drivers</div>
          <div class="driver">Char Drivers</div>
        </div>
      </div>

      <!-- Architecture Layer -->
      <div class="layer architecture">
        <div class="layer-title">Architecture Layer</div>
        <div class="layer-content">
          <div class="component arch">Architecture Specific Code</div>
        </div>
      </div>

      <!-- Hardware -->
      <div class="layer hardware">
        <div class="layer-title">Hardware</div>
        <div class="hardware-grid">
          <div class="hw-component">CPU</div>
          <div class="hw-component">Memory</div>
          <div class="hw-component">Storage</div>
          <div class="hw-component">Network</div>
          <div class="hw-component">Audio</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props needed for this static component
</script>

<style scoped>
.linux-architecture {
  width: 100%;
  padding: 0.5rem;
}

.architecture-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.boundary {
  position: relative;
  margin: 0.25rem 0;
}

.boundary-line {
  width: 100%;
  height: 2px;
  border-top: 2px dotted #6b7280;
  position: relative;
}

.boundary-label {
  position: absolute;
  right: 0;
  top: -0.75rem;
  background: #1f2937;
  color: #9ca3af;
  font-size: 0.7rem;
  padding: 0.125rem 0.5rem;
  border-radius: 3px;
  border: 1px solid #374151;
}

.layer {
  border: 1px solid #374151;
  border-radius: 4px;
  padding: 0.5rem;
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  position: relative;
}

.layer-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 0.25rem;
  text-align: center;
  border-bottom: 1px solid #4b5563;
  padding-bottom: 0.25rem;
}

.layer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.component {
  background: #3b82f6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-weight: 500;
  text-align: center;
  min-width: 150px;
  font-size: 0.8rem;
}

.subsystems-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.25rem;
}

.subsystem {
  background: #059669;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
}

.drivers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.25rem;
}

.driver {
  background: #dc2626;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
}

.arch {
  background: #7c3aed;
}

.hardware-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.25rem;
}

.hw-component {
  background: #6b7280;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
  font-size: 0.75rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .subsystems-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .drivers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .hardware-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
