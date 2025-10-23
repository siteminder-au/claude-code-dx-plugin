<template>
  <div class="home-page">
    <div class="home-wrapper">
      <h1>Welcome to SUI MCP DEMO</h1>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
function navigateTo(path) {
  if (path) router.push(path);
}

const features = [
  {
    icon: '📋',
    title: 'Task Management',
    description: 'Organize tasks with priorities, categories, and deadlines in one place.',
    ctaRoute: '/todo',
    ctaText: 'Try It Now'
  },
  {
    icon: '🎨',
    title: 'Beautiful Design',
    description: 'Clean, modern interface built with Siteminder UI components.',
    ctaRoute: '/accordion',
    ctaText: 'View Components'
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Vue 3 performance with local persistence for instant access.',
    ctaRoute: '/buttons',
    ctaText: 'Explore More'
  },
  {
    icon: '📱',
    title: 'Responsive',
    description: 'Works seamlessly on desktop, tablet, and mobile devices.',
    badge: { type: 'success', text: 'Mobile Ready' }
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    description: 'Local-only data storage. No servers, no tracking.',
    badge: { type: 'info', text: '100% Private' }
  },
  {
    icon: '🎯',
    title: 'Stay Focused',
    description: 'Filter tasks, prioritize, and track progress with stats.',
    badge: { type: 'warning', text: 'Goal Oriented' }
  }
];
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding-bottom: 60px;
}

.hero-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  align-items: center;
  gap: 60px;
  padding: 100px 60px 40px;
  background: linear-gradient(135deg, #42b983 0%, #2c3e50 100%);
  color: #fff;
  position: relative;
  overflow: hidden;
}

.hero-title {
  font-size: 3.2em;
  line-height: 1.1;
  margin: 0 0 20px;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.2em;
  max-width: 560px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 30px;
}

.hero-actions {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}

.hero-image img {
  width: 100%;
  max-width: 520px;
  border-radius: 24px;
  box-shadow: 0 10px 40px -10px rgba(0,0,0,.4);
}

.features-section {
  padding: 40px 60px 0;
}

.section-title {
  font-size: 2.4em;
  margin: 0 0 10px;
  text-align: center;
  color: #2c3e50;
}

.section-description {
  text-align: center;
  color: #666;
  margin: 0 0 40px;
  font-size: 1.05em;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.feature-card {
  transition: transform .25s ease, box-shadow .25s ease;
}
.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.home-wrapper { 
  display:flex; 
  min-height:40vh; 
  align-items:center; 
  justify-content:center; 
  font-family:system-ui, sans-serif; 
}

.home-wrapper h1 { 
  font-size:2.5rem; 
  font-weight:600; 
  color:#2c3e50; 
  text-align:center; 
  margin:0; 
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-section { padding: 70px 40px 30px; text-align: center; }
  .hero-title { font-size: 2.6em; }
  .hero-image { order: 2; }
  .hero-content { order: 1; }
  .features-section { padding: 30px 40px 0; }
}
@media (max-width: 680px) {
  .hero-title { font-size: 2.2em; }
  .hero-subtitle { font-size: 1.05em; }
  .features-grid { grid-template-columns: 1fr; }
  .home-page { gap: 50px; }
}
</style>
  border-top: 1px solid rgba(255, 255, 255, 0.1);
