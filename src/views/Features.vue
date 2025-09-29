<template>
  <v-container fluid class="features-page pa-0">
    <!-- Hero Section with 3D Model -->
    <div class="hero-3d-section">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6" class="text-center text-md-left">
            <h1 class="hero-title-apple mb-4">Explore Thoth in 3D</h1>
            <p class="hero-subtitle-apple mb-6">
              Interact with our revolutionary AI/IoT device. Rotate, zoom, and explore every detail.
            </p>
            <div class="hero-buttons">
              <v-btn class="apple-btn-primary mr-4" size="large" @click="scrollToSpecs">View Specs</v-btn>
              <v-btn class="apple-btn-secondary" size="large" @click="scrollToVideos">Watch Demos</v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="sketchfab-embed-wrapper">
<iframe 
  title="Thoth 3D Model" 
  frameborder="0" 
  allowfullscreen 
  mozallowfullscreen="true" 
  webkitallowfullscreen="true" 
  allow="autoplay; fullscreen; xr-spatial-tracking" 
  xr-spatial-tracking 
  execution-while-out-of-viewport 
  execution-while-not-rendered 
  web-share 
  src="https://poly.cam/capture/ABE69FEA-A1DF-4CC5-BC65-CF1DB40BFEE8/embed" 
  class="model-iframe"
  style="height:100%;width:100%;max-height:720px;max-width:1280px;min-height:280px;min-width:280px"
>
</iframe>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Tabbed Content Section -->
    <v-container class="py-12" id="specs">
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <v-tabs v-model="activeTab" centered class="mb-8">
            <v-tab value="sensors">Sensors</v-tab>
            <v-tab value="interfaces">Interfaces</v-tab>
            <v-tab value="researcher">Researcher Kit</v-tab>
            <v-tab value="education">Education Kit</v-tab>
            <v-tab value="usecases">Use Cases</v-tab>
            <v-tab value="plans">Plans</v-tab>
          </v-tabs>

          <v-tabs-window v-model="activeTab">
            <!-- Sensors Tab -->
            <v-tabs-window-item value="sensors">
              <v-card class="glass-card-global pa-6" elevation="0">
                <v-card-title class="text-h5 mb-4">Precision Data Collection</v-card-title>
                <v-card-text class="text-body-1">
                  Capture environmental, motion, and visual inputs effortlessly. Out-of-the-box WiFi captive portal for headless Raspberry Pi setup—deploy in seconds.
                </v-card-text>
                <v-row class="mt-6">
                  <v-col cols="12" md="4" class="text-center">
                    <v-icon size="48" color="primary" class="mb-3">mdi-thermometer</v-icon>
                    <h4 class="text-h6 mb-2">Environmental</h4>
                    <p class="text-body-2">Temperature, humidity, pressure sensors</p>
                  </v-col>
                  <v-col cols="12" md="4" class="text-center">
                    <v-icon size="48" color="primary" class="mb-3">mdi-axis-arrow</v-icon>
                    <h4 class="text-h6 mb-2">Motion</h4>
                    <p class="text-body-2">Accelerometer, gyroscope, magnetometer</p>
                  </v-col>
                  <v-col cols="12" md="4" class="text-center">
                    <v-icon size="48" color="primary" class="mb-3">mdi-camera</v-icon>
                    <h4 class="text-h6 mb-2">Visual</h4>
                    <p class="text-body-2">High-quality camera for image capture</p>
                  </v-col>
                </v-row>
              </v-card>
            </v-tabs-window-item>

            <!-- Interfaces Tab -->
            <v-tabs-window-item value="interfaces">
              <v-card class="glass-card-global pa-6" elevation="0">
                <v-card-title class="text-h5 mb-4">Ubiquitous Access</v-card-title>
                <v-card-text class="text-body-1">
                  Multi-platform control (web/desktop/mobile/Chrome/voice/SMS) with Obsidian note-taking. Your data and ideas flow anywhere, organized as a personal knowledge hub.
                </v-card-text>
                <v-row class="mt-6">
                  <v-col cols="12" md="6">
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>
                          <v-icon class="mr-3">mdi-web</v-icon>
                          Web Interface
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>
                          <v-icon class="mr-3">mdi-desktop-mac</v-icon>
                          Desktop Application
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>
                          <v-icon class="mr-3">mdi-cellphone</v-icon>
                          Mobile App
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>
                          <v-icon class="mr-3">mdi-microphone</v-icon>
                          Voice Control
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>
                          <v-icon class="mr-3">mdi-message-text</v-icon>
                          SMS Interface
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>
                          <v-icon class="mr-3">mdi-note-text</v-icon>
                          Obsidian Integration
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-card>
            </v-tabs-window-item>

            <!-- Researcher Kit Tab -->
            <v-tabs-window-item value="researcher">
              <v-card class="glass-card-global pa-6" elevation="0">
                <v-card-title class="text-h5 mb-4">Deep Learning & Collaboration</v-card-title>
                <v-card-text class="text-body-1">
                  Train models on-device or federated across Thoths. Multi-device sync with differential privacy protects sensitive data while enabling global teamwork.
                </v-card-text>
                <v-row class="mt-6">
                  <v-col cols="12" md="6" class="mb-4">
                    <v-card class="pa-4" color="grey lighten-5">
                      <v-card-title class="text-h6">Federated Learning</v-card-title>
                      <v-card-text>Collaborate across multiple devices while keeping data private</v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="6" class="mb-4">
                    <v-card class="pa-4" color="grey lighten-5">
                      <v-card-title class="text-h6">Differential Privacy</v-card-title>
                      <v-card-text>Protect sensitive information during collaborative research</v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-tabs-window-item>

            <!-- Education Kit Tab -->
            <v-tabs-window-item value="education">
              <v-card class="glass-card-global pa-6" elevation="0">
                <v-card-title class="text-h5 mb-4">Curriculum-Ready</v-card-title>
                <v-card-text class="text-body-1">
                  Pre-built lessons on AI/IoT, from basics to advanced. Pitch to students: 'Build, learn, share'—with guided projects for immediate impact.
                </v-card-text>
                <v-row class="mt-6">
                  <v-col cols="12" md="4" class="text-center mb-4">
                    <v-icon size="64" color="primary" class="mb-3">mdi-book-open-page-variant</v-icon>
                    <h4 class="text-h6 mb-2">Structured Curriculum</h4>
                    <p class="text-body-2">Week-long projects from beginner to advanced</p>
                  </v-col>
                  <v-col cols="12" md="4" class="text-center mb-4">
                    <v-icon size="64" color="primary" class="mb-3">mdi-puzzle</v-icon>
                    <h4 class="text-h6 mb-2">Hands-on Projects</h4>
                    <p class="text-body-2">Build real AI/IoT applications</p>
                  </v-col>
                  <v-col cols="12" md="4" class="text-center mb-4">
                    <v-icon size="64" color="primary" class="mb-3">mdi-account-group</v-icon>
                    <h4 class="text-h6 mb-2">Collaborative Learning</h4>
                    <p class="text-body-2">Share and learn from peers</p>
                  </v-col>
                </v-row>
              </v-card>
            </v-tabs-window-item>

            <!-- Use Cases Tab -->
            <v-tabs-window-item value="usecases">
              <v-card class="glass-card-global pa-6" elevation="0">
                <v-card-title class="text-h5 mb-4">Tailored Pitches</v-card-title>
                <v-row>
                  <v-col cols="12" md="4" class="mb-4">
                    <v-card class="pa-4 h-100" color="blue lighten-5">
                      <v-card-title class="text-h6">
                        <v-icon class="mr-2">mdi-school</v-icon>
                        Students
                      </v-card-title>
                      <v-card-text>Boost productivity with AI-assisted notes and hands-on learning experiences</v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="4" class="mb-4">
                    <v-card class="pa-4 h-100" color="green lighten-5">
                      <v-card-title class="text-h6">
                        <v-icon class="mr-2">mdi-flask</v-icon>
                        Researchers
                      </v-card-title>
                      <v-card-text>Scale experiments ethically with federated learning and privacy protection</v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="4" class="mb-4">
                    <v-card class="pa-4 h-100" color="orange lighten-5">
                      <v-card-title class="text-h6">
                        <v-icon class="mr-2">mdi-hammer-wrench</v-icon>
                        Makers
                      </v-card-title>
                      <v-card-text>Hack and collaborate endlessly with open-source extensibility</v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-tabs-window-item>

            <!-- Plans Tab -->
            <v-tabs-window-item value="plans">
              <v-card class="glass-card-global pa-6" elevation="0">
                <v-card-title class="text-h5 mb-4">Flexible Tiers</v-card-title>
                <v-row>
                  <v-col cols="12" md="4" class="mb-4">
                    <v-card class="pa-4 h-100" elevation="2">
                      <v-card-title class="text-h6">Free</v-card-title>
                      <v-card-text>For entry-level exploration and learning</v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="4" class="mb-4">
                    <v-card class="pa-4 h-100" elevation="2" color="primary" dark>
                      <v-card-title class="text-h6">Paid</v-card-title>
                      <v-card-subtitle>$9.99/mo</v-card-subtitle>
                      <v-card-text>For power users and dedicated researchers</v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="4" class="mb-4">
                    <v-card class="pa-4 h-100" elevation="2">
                      <v-card-title class="text-h6">Organization</v-card-title>
                      <v-card-subtitle>Custom</v-card-subtitle>
                      <v-card-text>For teams with institutional discounts</v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-col>
      </v-row>
    </v-container>

    <!-- Feature Comparison Table -->
    <v-container class="py-12 grey lighten-5">
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <h2 class="text-h4 text-center mb-8">Feature Comparison</h2>
          <v-table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Thoth</th>
                <th>Traditional Tools</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Multi-Platform Access</td>
                <td>✓ Web, Mobile, Desktop, Voice, SMS</td>
                <td>Limited platforms</td>
              </tr>
              <tr>
                <td>Sensor Integration</td>
                <td>✓ Built-in comprehensive kit</td>
                <td>Separate purchases required</td>
              </tr>
              <tr>
                <td>Note-taking Integration</td>
                <td>✓ Obsidian sync</td>
                <td>Manual organization</td>
              </tr>
              <tr>
                <td>Collaboration</td>
                <td>✓ Federated + Privacy</td>
                <td>N/A in most tools</td>
              </tr>
              <tr>
                <td>Education Ready</td>
                <td>✓ Pre-built curriculum</td>
                <td>DIY setup required</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>

    <!-- Demo Video Section -->
    <v-container class="py-12" id="videos">
      <v-row justify="center" align="center" class="text-center">
        <v-col cols="12">
          <h2 class="section-title mb-6">See Thoth in Action</h2>
          <p class="section-text mb-8">
            Watch how students, researchers, and makers use Thoth to bring their ideas to life.
          </p>
        </v-col>
        <v-col cols="12" md="6" class="mb-6">
          <v-card class="apple-card video-card" elevation="0">
            <video 
              autoplay
              muted
              loop
              playsinline
              class="demo-video"
              @loadedmetadata="limitVideoDuration($event, 10)"
            >
              <source src="@/assets/first.mp4" type="video/mp4">
            </video>
            <v-card-title class="card-title mt-4">Complete Overview</v-card-title>
            <v-card-text class="card-text">
              Full walkthrough of Thoth's capabilities and features.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" class="mb-6">
          <v-card class="apple-card video-card" elevation="0">
            <video 
              autoplay
              muted
              loop
              playsinline
              class="demo-video"
              @loadedmetadata="limitVideoDuration($event, 10)"
            >
              <source src="@/assets/sensors.mp4" type="video/mp4">
            </video>
            <v-card-title class="card-title mt-4">Sensor Integration</v-card-title>
            <v-card-text class="card-text">
              Deep dive into our comprehensive sensor array.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('sensors')

const scrollToSpecs = () => {
  document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' });
}

const scrollToVideos = () => {
  document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' });
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
/* Hero Section with 3D Model */
.hero-3d-section {
  background: linear-gradient(180deg, #fbfbfd 0%, #f5f5f7 100%);
  padding: 120px 20px 80px;
  min-height: 70vh;
  position: relative;
}

.hero-3d-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 70% 50%, 
    rgba(0, 113, 227, 0.03) 0%, 
    transparent 50%);
  pointer-events: none;
}

.hero-title-apple {
  font-size: 3.5rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: #1d1d1f;
}

.hero-subtitle-apple {
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.4;
  color: #86868b;
  max-width: 500px;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 32px;
}

/* 3D Model Embed - Blended Background */
.sketchfab-embed-wrapper {
  position: relative;
  padding-bottom: 75%;
  height: 0;
  overflow: hidden;
  border-radius: 24px;
  background: linear-gradient(135deg, 
    rgba(245, 245, 247, 0.6) 0%, 
    rgba(255, 255, 255, 0.4) 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
    0 20px 40px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.sketchfab-embed-wrapper:hover {
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
    0 30px 60px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.05);
  transform: scale(1.01);
}

.model-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 24px;
  opacity: 0.95;
  transition: opacity 0.3s ease;
}

.model-iframe:hover {
  opacity: 1;
}

/* Apple Buttons */
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

/* Section Typography */
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

/* Cards */
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

.card-title {
  color: #1d1d1f !important;
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

/* Video Cards */
.video-card {
  padding: 0 !important;
  overflow: hidden;
}

.demo-video {
  width: 100%;
  height: 300px;
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

/* Table Styling */
.v-table {
  background: white;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.v-table th {
  background-color: #f5f5f7;
  font-weight: 600;
  color: #1d1d1f;
}

.v-table td {
  padding: 16px;
  color: #515154;
}

/* Responsive */
@media (max-width: 960px) {
  .hero-title-apple {
    font-size: 2.5rem;
  }
  
  .hero-3d-section {
    padding: 100px 20px 60px;
  }
}
</style>
