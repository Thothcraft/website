<template>
  <v-container fluid class="about-page pa-0">
    <!-- Hero Section -->
    <div class="hero-minimal d-flex align-center justify-center text-center">
      <div class="hero-content">
        <h1 class="hero-title mb-4">About Thoth</h1>
        <p class="hero-subtitle">
          Revolutionary AI/IoT platform designed with precision and purpose.
        </p>
      </div>
    </div>

    <!-- Mission Section -->
    <v-container class="py-16">
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8" class="text-center">
          <h2 class="section-title mb-6">Our Mission</h2>
          <p class="section-text">
            Thoth bridges the gap between learning and innovation. We believe in democratizing access to AI and IoT technologies, 
            empowering students, researchers, and makers to build the future with tools that are powerful yet accessible.
          </p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Values Section -->
    <div class="values-section py-16">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="text-center mb-12">
            <h2 class="section-title">Our Values</h2>
          </v-col>
          <v-col cols="12" md="4" class="text-center mb-8">
            <div class="value-icon mb-4">
              <v-icon size="48" color="grey-darken-3">mdi-lightbulb-outline</v-icon>
            </div>
            <h3 class="value-title mb-3">Innovation</h3>
            <p class="value-text">
              Pushing boundaries in AI/IoT integration with cutting-edge technology.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center mb-8">
            <div class="value-icon mb-4">
              <v-icon size="48" color="grey-darken-3">mdi-account-group-outline</v-icon>
            </div>
            <h3 class="value-title mb-3">Community</h3>
            <p class="value-text">
              Building a global network of innovators sharing knowledge and ideas.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center mb-8">
            <div class="value-icon mb-4">
              <v-icon size="48" color="grey-darken-3">mdi-shield-check-outline</v-icon>
            </div>
            <h3 class="value-title mb-3">Privacy</h3>
            <p class="value-text">
              Protecting your data with advanced privacy-preserving technologies.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Team Section -->
    <v-container class="py-16">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-12">
          <h2 class="section-title">Built by Experts</h2>
          <p class="section-text mt-4">
            Our team combines decades of experience in AI, hardware engineering, and education technology.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
// About page component
</script>

<style scoped>
/* Minimalist Hero */
.hero-minimal {
  background: linear-gradient(180deg, #f5f5f7 0%, #ffffff 100%);
  padding: 160px 20px 120px;
  position: relative;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: #1d1d1f;
}

.hero-subtitle {
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 1.4;
  color: #86868b;
  max-width: 600px;
  margin: 0 auto;
}

/* Section Styles */
.section-title {
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #1d1d1f;
}

.section-text {
  font-size: 1.125rem;
  line-height: 1.6;
  color: #515154;
  max-width: 800px;
  margin: 0 auto;
}

/* Values Section */
.values-section {
  background: #f5f5f7;
}

.value-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.value-title {
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #1d1d1f;
}

.value-text {
  font-size: 1rem;
  line-height: 1.5;
  color: #86868b;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.125rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>