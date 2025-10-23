<template>
  <div class="home-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">SUI MCP Server</h1>
        <p class="hero-subtitle">
          Accelerate Vue3 development with automated component discovery,
          intelligent snippet generation, and seamless integration with the
          SUI Design System.
        </p>
        <div class="hero-actions">
          <sm-button
            type="primary"
            size="large"
            icon-left="book"
            href="#documentation">
            View Documentation
          </sm-button>
          <sm-button
            type="secondary"
            size="large"
            icon-left="code"
            href="#features">
            Explore Features
          </sm-button>
        </div>
      </div>
      <div class="hero-image">
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop"
          alt="Development workspace"
        />
      </div>
    </div>

    <!-- Features Section -->
    <div class="features-section" id="features">
      <h2 class="section-title">Why Choose SUI MCP Server?</h2>
      <p class="section-description">
        Built for developers who value speed, consistency, and quality
      </p>

      <div class="features-grid">
        <!-- Feature 1: Faster Discovery -->
        <sm-card class="feature-card" interactive hover>
          <sm-card-graphic>
            <img
              src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop"
              alt="Fast discovery"
            />
          </sm-card-graphic>
          <sm-card-content>
            <h3>⚡ Faster Discovery</h3>
            <ul class="benefit-list">
              <li>Instant component search across 127+ UI components</li>
              <li>Real-time metadata retrieval via REST API</li>
              <li>Smart component name resolution (PascalCase, kebab-case)</li>
              <li>Zero manual documentation browsing</li>
            </ul>
          </sm-card-content>
          <sm-card-actions>
            <sm-button type="tertiary" size="small" icon-right="arrow-right">
              Learn More
            </sm-button>
          </sm-card-actions>
        </sm-card>

        <!-- Feature 2: Automated Snippets -->
        <sm-card class="feature-card" interactive hover>
          <sm-card-graphic>
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
              alt="Code generation"
            />
          </sm-card-graphic>
          <sm-card-content>
            <h3>🤖 Automated Snippet Generation</h3>
            <ul class="benefit-list">
              <li>Generate production-ready Vue3 templates instantly</li>
              <li>Pre-configured with proper prop bindings</li>
              <li>TypeScript-aware script setup blocks</li>
              <li>Eliminate boilerplate and copy-paste errors</li>
            </ul>
          </sm-card-content>
          <sm-card-actions>
            <sm-button type="tertiary" size="small" icon-right="arrow-right">
              Try It Now
            </sm-button>
          </sm-card-actions>
        </sm-card>

        <!-- Feature 3: Consistent Imports -->
        <sm-card class="feature-card" interactive hover>
          <sm-card-graphic>
            <img
              src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop"
              alt="Consistent patterns"
            />
          </sm-card-graphic>
          <sm-card-content>
            <h3>📦 Consistent Imports</h3>
            <ul class="benefit-list">
              <li>Auto-generated import statements from package registry</li>
              <li>Standardized import paths across your codebase</li>
              <li>Reduced dependency confusion and versioning issues</li>
              <li>Maintain architectural patterns effortlessly</li>
            </ul>
          </sm-card-content>
          <sm-card-actions>
            <sm-button type="tertiary" size="small" icon-right="arrow-right">
              See Examples
            </sm-button>
          </sm-card-actions>
        </sm-card>

        <!-- Feature 4: Live Previews -->
        <sm-card class="feature-card" interactive hover>
          <sm-card-graphic>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
              alt="Live preview"
            />
          </sm-card-graphic>
          <sm-card-content>
            <h3>👁️ Live Preview Rendering</h3>
            <ul class="benefit-list">
              <li>Render HTML previews before committing code</li>
              <li>Visual validation of component configurations</li>
              <li>Rapid prototyping and iteration cycles</li>
              <li>Share previews with designers and stakeholders</li>
            </ul>
          </sm-card-content>
          <sm-card-actions>
            <sm-button type="tertiary" size="small" icon-right="arrow-right">
              View Demo
            </sm-button>
          </sm-card-actions>
        </sm-card>

        <!-- Feature 5: SSE Support -->
        <sm-card class="feature-card" interactive hover>
          <sm-card-graphic>
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop"
              alt="Real-time updates"
            />
          </sm-card-graphic>
          <sm-card-content>
            <h3>🔄 Real-Time Updates</h3>
            <ul class="benefit-list">
              <li>Server-Sent Events (SSE) for live component updates</li>
              <li>Hot-reload metadata when design system changes</li>
              <li>Multi-client synchronization support</li>
              <li>Always in sync with latest component library</li>
            </ul>
          </sm-card-content>
          <sm-card-actions>
            <sm-button type="tertiary" size="small" icon-right="arrow-right">
              Integration Guide
            </sm-button>
          </sm-card-actions>
        </sm-card>

        <!-- Feature 6: Developer Experience -->
        <sm-card class="feature-card" interactive hover>
          <sm-card-graphic>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
              alt="Team collaboration"
            />
          </sm-card-graphic>
          <sm-card-content>
            <h3>💎 Enhanced DX</h3>
            <ul class="benefit-list">
              <li>RESTful API with intuitive endpoint design</li>
              <li>Comprehensive prop schemas with type information</li>
              <li>Built-in health checks and monitoring</li>
              <li>CORS-enabled for local and remote development</li>
            </ul>
          </sm-card-content>
          <sm-card-actions>
            <sm-button type="tertiary" size="small" icon-right="arrow-right">
              API Reference
            </sm-button>
          </sm-card-actions>
        </sm-card>
      </div>
    </div>

    <!-- Documentation Section -->
    <div class="documentation-section" id="documentation">
      <sm-card class="documentation-card">
        <sm-card-content>
          <h2>📚 Getting Started</h2>
          <p class="doc-intro">
            The SUI MCP Server is running at <code>http://localhost:3333/mcp</code>
          </p>
          <div class="endpoints-list">
            <h3>Available Endpoints:</h3>
            <div class="endpoint-item">
              <sm-badge type="info">GET</sm-badge>
              <code>/mcp/listComponents</code>
              <span>- List all 127+ components</span>
            </div>
            <div class="endpoint-item">
              <sm-badge type="info">GET</sm-badge>
              <code>/mcp/getComponentMeta/:name</code>
              <span>- Get component metadata</span>
            </div>
            <div class="endpoint-item">
              <sm-badge type="success">POST</sm-badge>
              <code>/mcp/generateSnippet</code>
              <span>- Generate Vue3 code snippet</span>
            </div>
            <div class="endpoint-item">
              <sm-badge type="success">POST</sm-badge>
              <code>/mcp/renderPreview</code>
              <span>- Render HTML preview</span>
            </div>
          </div>
        </sm-card-content>
        <sm-card-actions>
          <sm-button type="primary" size="medium" icon-left="external-link">
            Full API Documentation
          </sm-button>
          <sm-button type="secondary" size="medium" icon-left="github">
            View on GitHub
          </sm-button>
        </sm-card-actions>
      </sm-card>
    </div>
  </div>
</template>

<script setup>
import {
  SmButton,
  SmCard,
  SmCardGraphic,
  SmCardContent,
  SmCardActions,
  SmBadge
} from '@siteminder/sui-core';
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
  padding: 100px 60px 60px;
  background: linear-gradient(135deg, #42b983 0%, #2c3e50 100%);
  color: #fff;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5em;
  line-height: 1.1;
  margin: 0 0 24px;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.25em;
  max-width: 560px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 36px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero-image {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
}

.hero-image img {
  width: 100%;
  max-width: 540px;
  border-radius: 16px;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.5);
  border: 4px solid rgba(255, 255, 255, 0.1);
}

.features-section {
  padding: 60px 60px 40px;
}

.section-title {
  font-size: 2.8em;
  margin: 0 0 16px;
  text-align: center;
  color: #2c3e50;
  font-weight: 700;
}

.section-description {
  text-align: center;
  color: #666;
  margin: 0 0 60px;
  font-size: 1.15em;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
}

.feature-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.feature-card h3 {
  font-size: 1.4em;
  margin: 0 0 16px;
  color: #2c3e50;
  font-weight: 600;
}

.benefit-list {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #555;
}

.benefit-list li {
  padding: 8px 0 8px 24px;
  position: relative;
  line-height: 1.5;
}

.benefit-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #42b983;
  font-weight: bold;
  font-size: 1.1em;
}

.documentation-section {
  padding: 0 60px 40px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.documentation-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.documentation-card h2 {
  font-size: 2em;
  margin: 0 0 16px;
  color: #2c3e50;
}

.doc-intro {
  font-size: 1.1em;
  color: #555;
  margin-bottom: 32px;
  line-height: 1.6;
}

.doc-intro code {
  background: #f5f5f5;
  padding: 4px 12px;
  border-radius: 6px;
  font-family: 'Monaco', 'Courier New', monospace;
  color: #42b983;
  font-weight: 600;
  font-size: 0.95em;
}

.endpoints-list {
  margin-top: 32px;
}

.endpoints-list h3 {
  font-size: 1.3em;
  margin: 0 0 20px;
  color: #2c3e50;
}

.endpoint-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  flex-wrap: wrap;
}

.endpoint-item:last-child {
  border-bottom: none;
}

.endpoint-item code {
  background: #f8f8f8;
  padding: 6px 12px;
  border-radius: 6px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  color: #333;
  font-weight: 500;
}

.endpoint-item span {
  color: #666;
  font-size: 0.95em;
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-section {
    padding: 80px 40px 50px;
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-title {
    font-size: 2.8em;
  }

  .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-image {
    order: -1;
  }

  .features-section {
    padding: 50px 40px 30px;
  }

  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .documentation-section {
    padding: 0 40px 30px;
  }
}

@media (max-width: 680px) {
  .hero-section {
    padding: 60px 24px 40px;
  }

  .hero-title {
    font-size: 2.2em;
  }

  .hero-subtitle {
    font-size: 1.1em;
  }

  .features-section {
    padding: 40px 24px 20px;
  }

  .section-title {
    font-size: 2em;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .documentation-section {
    padding: 0 24px 20px;
  }

  .home-page {
    gap: 60px;
  }

  .endpoint-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8em;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .hero-actions :deep(button) {
    width: 100%;
  }
}
</style>
