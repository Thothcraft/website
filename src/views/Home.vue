<template>
  <v-container fluid class="home-page pa-0">
    <!-- Hero Section with Video Background -->
    <div class="hero-apple d-flex align-center justify-center text-center">
      <video 
        autoplay 
        muted 
        loop 
        playsinline
        class="hero-video-bg"
      >
        <source src="@/assets/hero_video_bg.mp4" type="video/mp4">
      </video>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title-apple mb-4">Thoth</h1>
        <p class="hero-subtitle-apple mb-6">
          The future of AI/IoT learning. Portable. Powerful. Private.
        </p>
        <div class="hero-buttons">
          <v-btn class="apple-btn-secondary mr-4 mb-2" size="large" @click="scrollToFeatures">Learn More</v-btn>
          <v-btn class="apple-btn-primary mb-2" size="large" href="https://thothfrontend.vercel.app/" target="_blank">Get Started</v-btn>
        </div>
      </div>
    </div>

    <!-- Product Showcase Section -->
    <v-container class="py-16">
      <v-row justify="center" align="center">
        <v-col cols="12" md="6" class="text-center text-md-left">
          <h2 class="section-title mb-6">Designed for Innovation</h2>
          <p class="section-text mb-8">
            A revolutionary platform combining Raspberry Pi and ESP32 technology. Seamlessly collect data, train models, and collaborate—all in a beautifully crafted, portable device.
          </p>
          <v-btn class="apple-btn-primary" size="large" to="/features">
            Explore 3D Model
            <v-icon class="ml-2">mdi-rotate-3d-variant</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows="hover"
            class="product-carousel"
          >
            <v-carousel-item>
              <img src="@/assets/white_bg.jpg" alt="Thoth Product" class="product-image">
            </v-carousel-item>
            <v-carousel-item>
              <img src="@/assets/closeup.jpg" alt="Thoth Closeup" class="product-image">
            </v-carousel-item>
            <v-carousel-item>
              <img src="@/assets/lifestyle.jpg" alt="Thoth in Use" class="product-image">
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>

    <!-- Animated Features Section -->
    <div class="section-light py-16">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="text-center mb-12">
            <h2 class="section-title">Core Capabilities</h2>
          </v-col>
          <v-col cols="12" md="3" class="text-center mb-8">
            <div class="animated-icon-wrapper mb-4">
              <img src="@/assets/artificial-intelligence.gif" alt="AI Processing" class="animated-icon">
            </div>
            <h3 class="feature-title mb-3">AI Processing</h3>
            <p class="feature-text">
              On-device machine learning with TensorFlow Lite and edge computing capabilities.
            </p>
          </v-col>
          <v-col cols="12" md="3" class="text-center mb-8">
            <div class="animated-icon-wrapper mb-4">
              <img src="@/assets/iot.gif" alt="IoT Connectivity" class="animated-icon">
            </div>
            <h3 class="feature-title mb-3">IoT Connectivity</h3>
            <p class="feature-text">
              Seamless integration with ESP32 modules for wireless sensor networks.
            </p>
          </v-col>
          <v-col cols="12" md="3" class="text-center mb-8">
            <div class="animated-icon-wrapper mb-4">
              <img src="@/assets/data-collection.gif" alt="Data Collection" class="animated-icon">
            </div>
            <h3 class="feature-title mb-3">Data Collection</h3>
            <p class="feature-text">
              Multi-sensor array for environmental, motion, and visual data capture.
            </p>
          </v-col>
          <v-col cols="12" md="3" class="text-center mb-8">
            <div class="animated-icon-wrapper mb-4">
              <img src="@/assets/privacy.gif" alt="Privacy First" class="animated-icon">
            </div>
            <h3 class="feature-title mb-3">Privacy First</h3>
            <p class="feature-text">
              Differential privacy and federated learning for secure collaboration.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Video Tutorials Section -->
    <v-container class="py-16" id="features">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-12">
          <h2 class="section-title mb-2">See It In Action</h2>
          <p class="section-text">Quick tutorials to get you started</p>
        </v-col>
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="apple-card video-card h-100" elevation="0">
            <video 
              autoplay
              muted
              loop
              playsinline
              class="tutorial-video"
              @loadedmetadata="limitVideoDuration($event, 10)"
            >
              <source src="@/assets/getting_started.mp4" type="video/mp4">
            </video>
            <v-card-title class="card-title mt-4">Getting Started</v-card-title>
            <v-card-text class="card-text">
              Set up your Thoth device in under 60 seconds.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="apple-card video-card h-100" elevation="0">
            <video 
              autoplay
              muted
              loop
              playsinline
              class="tutorial-video"
              @loadedmetadata="limitVideoDuration($event, 10)"
            >
              <source src="@/assets/first.mp4" type="video/mp4">
            </video>
            <v-card-title class="card-title mt-4">First Project</v-card-title>
            <v-card-text class="card-text">
              Build your first AI/IoT project step by step.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="apple-card video-card h-100" elevation="0">
            <video 
              autoplay
              muted
              loop
              playsinline
              class="tutorial-video"
              @loadedmetadata="limitVideoDuration($event, 10)"
            >
              <source src="@/assets/sensors.mp4" type="video/mp4">
            </video>
            <v-card-title class="card-title mt-4">Sensor Setup</v-card-title>
            <v-card-text class="card-text">
              Connect and configure multiple sensors.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Plans Teaser Carousel -->
    <div class="section-light py-16">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="text-center mb-12">
            <h2 class="section-title">Simple Pricing</h2>
          </v-col>
          <v-col cols="12" md="4" class="mb-6">
            <v-card class="apple-card h-100 pa-6" elevation="0">
              <v-card-title class="card-title mb-3">Free</v-card-title>
              <v-card-text class="card-text">
                Get started with basic features and community support.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" class="mb-6">
            <v-card class="apple-card-featured h-100 pa-6" elevation="0">
              <v-card-title class="card-title-primary mb-3">Pro</v-card-title>
              <v-card-subtitle class="card-subtitle mb-3">$9.99/mo</v-card-subtitle>
              <v-card-text class="card-text">
                Unlimited computing power and premium features.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" class="mb-6">
            <v-card class="apple-card h-100 pa-6" elevation="0">
              <v-card-title class="card-title mb-3">Enterprise</v-card-title>
              <v-card-subtitle class="card-subtitle mb-3">Custom</v-card-subtitle>
              <v-card-text class="card-text">
                Tailored solutions for organizations.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn class="apple-btn-primary" size="large" to="/plans">Compare Plans</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Community Teaser -->
    <v-container class="py-16">
      <v-row justify="center" align="center" class="text-center">
        <v-col cols="12" md="8">
          <h2 class="section-title mb-6">Join Our Community</h2>
          <p class="section-text mb-8">
            Connect with innovators worldwide. Share ideas. Build together.
          </p>
          <v-btn class="apple-btn-primary mr-4" size="large" to="/community">Explore</v-btn>
          <v-btn class="apple-btn-secondary" size="large" href="https://thothfrontend.vercel.app/" target="_blank">Sign In</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
}

// Limit video playback to specific duration and loop
const limitVideoDuration = (event, duration) => {
  const video = event.target;
  video.addEventListener('timeupdate', () => {
    if (video.currentTime >= duration) {
      video.currentTime = 0; // Reset to beginning
    }
  });
}
</script>

<style scoped>
/* Apple-style Hero Section with Video */
.hero-apple {
  position: relative;
  padding: 160px 20px 120px;
  min-height: 70vh;
  overflow: hidden;
}

.hero-video-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, 
    rgba(251, 251, 253, 0.85) 0%, 
    rgba(245, 245, 247, 0.9) 100%);
  z-index: 1;
}

.hero-content {
  max-width: 900px;
  position: relative;
  z-index: 2;
}

.hero-title-apple {
  font-size: 5rem;
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
  color: #1d1d1f;
  margin-bottom: 24px;
}

.hero-subtitle-apple {
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.4;
  color: #86868b;
  max-width: 600px;
  margin: 0 auto;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 48px;
}

/* Apple-style Buttons */
.apple-btn-primary {
  background: #0071e3 !important;
  color: white !important;
  border-radius: 12px !important;
  padding: 12px 24px !important;
  font-weight: 500 !important;
  letter-spacing: -0.01em !important;
  transition: all 0.2s ease !important;
  text-transform: none !important;
}

.apple-btn-primary:hover {
  background: #0077ed !important;
  transform: scale(1.02);
}

.apple-btn-secondary {
  background: transparent !important;
  color: #0071e3 !important;
  border: 1px solid #0071e3 !important;
  border-radius: 12px !important;
  padding: 12px 24px !important;
  font-weight: 500 !important;
  letter-spacing: -0.01em !important;
  transition: all 0.2s ease !important;
  text-transform: none !important;
}

.apple-btn-secondary:hover {
  background: rgba(0, 113, 227, 0.04) !important;
  transform: scale(1.02);
}

/* Apple-style Cards */
.apple-card {
  background: white !important;
  border: 1px solid rgba(0, 0, 0, 0.04) !important;
  border-radius: 18px !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04) !important;
}

.apple-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
}

.apple-card-featured {
  background: white !important;
  border: 2px solid #0071e3 !important;
  border-radius: 18px !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 4px 16px rgba(0, 113, 227, 0.1) !important;
}

.apple-card-featured:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 113, 227, 0.15) !important;
}

.card-title {
  color: #1d1d1f !important;
  font-weight: 600 !important;
  font-size: 1.25rem !important;
  letter-spacing: -0.01em !important;
}

.card-title-primary {
  color: #0071e3 !important;
  font-weight: 600 !important;
  font-size: 1.25rem !important;
  letter-spacing: -0.01em !important;
}

.card-text {
  color: #515154 !important;
  font-weight: 400 !important;
  line-height: 1.5 !important;
  font-size: 0.95rem !important;
}

.card-subtitle {
  color: #86868b !important;
  font-weight: 400 !important;
  font-size: 0.9rem !important;
}

/* Section Styles */
.section-light {
  background: #f5f5f7;
}

.section-title {
  color: #1d1d1f !important;
  font-weight: 600 !important;
  font-size: 2.5rem !important;
  letter-spacing: -0.02em !important;
}

.section-text {
  color: #515154 !important;
  font-size: 1.125rem !important;
  line-height: 1.6 !important;
  max-width: 800px;
  margin: 0 auto;
}

.feature-title {
  color: #1d1d1f !important;
  font-weight: 600 !important;
  font-size: 1.25rem !important;
  letter-spacing: -0.01em !important;
}

.feature-text {
  color: #86868b !important;
  font-size: 1rem !important;
  line-height: 1.5 !important;
}

/* Product Carousel */
.product-carousel {
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Animated Icons */
.animated-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.animated-icon-wrapper:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.animated-icon {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

/* Video Cards */
.video-card {
  padding: 0 !important;
  overflow: hidden;
}

.tutorial-video {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 18px 18px 0 0;
  background: linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%);
  display: block;
}

.video-card .card-title {
  padding: 0 24px;
}

.video-card .card-text {
  padding: 0 24px 24px;
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 16px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title-apple {
    font-size: 3rem;
  }
  
  .hero-subtitle-apple {
    font-size: 1.25rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-buttons .v-btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .hero-apple {
    padding: 120px 20px 80px;
  }
  
  .hero-title-apple {
    font-size: 2.5rem;
  }
}

/* Smooth Animations */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>