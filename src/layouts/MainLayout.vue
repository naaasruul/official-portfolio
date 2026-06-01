<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden relative">
    <!-- Top glowing neon mesh overlay -->
    <div 
      style="background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6, 182, 212, 0.12), transparent 70%)"
      class="absolute top-0 left-0 w-full h-[600px] pointer-events-none z-0" 
    />
    
    <!-- Main Content Slot -->
    <main class="relative z-10">
      <slot />
    </main>
  </div>
</template>