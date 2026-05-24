<template>
  <v-container fluid class="projects-page pa-0">
    <!-- Hero -->
    <div class="proj-hero d-flex align-center justify-center text-center">
      <div class="hero-content">
        <v-chip color="primary" variant="tonal" size="small" class="mb-5">
          <v-icon start size="small">mdi-flask-outline</v-icon>
          Research Projects
        </v-chip>
        <h1 class="hero-title mb-4">Open Research & Projects</h1>
        <p class="hero-subtitle">
          Experiments, prototypes, and published work built on the Thothcraft sensing platform.
        </p>
      </div>
    </div>

    <!-- Project Cards -->
    <v-container class="py-14" style="max-width: 1100px;">
      <v-row>
        <v-col v-for="project in projects" :key="project.title" cols="12" md="6" lg="4" class="mb-8">
          <v-card class="project-card h-100" elevation="0">
            <!-- Card Header Strip -->
            <div class="card-header-strip" :style="{ background: project.gradient }">
              <v-icon size="48" color="white" class="card-main-icon">{{ project.icon }}</v-icon>
            </div>

            <div class="pa-6">
              <!-- Tags -->
              <div class="d-flex flex-wrap gap-2 mb-4">
                <v-chip
                  v-for="tag in project.tags"
                  :key="tag"
                  size="x-small"
                  variant="tonal"
                  :color="project.accentColor"
                >{{ tag }}</v-chip>
              </div>

              <h3 class="project-title mb-2">{{ project.title }}</h3>
              <p class="project-desc mb-6">{{ project.desc }}</p>

              <!-- Stats row -->
              <div class="stats-row mb-6">
                <div v-for="stat in project.stats" :key="stat.label" class="stat-item">
                  <span class="stat-value">{{ stat.value }}</span>
                  <span class="stat-label">{{ stat.label }}</span>
                </div>
              </div>

              <v-btn
                :href="project.url"
                target="_blank"
                class="project-btn"
                :color="project.accentColor"
                variant="tonal"
                block
                size="large"
              >
                View Project
                <v-icon end>mdi-arrow-top-right</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- CTA -->
    <div class="proj-cta py-14">
      <v-container>
        <v-row justify="center" class="text-center">
          <v-col cols="12" md="7">
            <h2 class="cta-title mb-4">Building something with Thothcraft?</h2>
            <p class="cta-sub mb-8">
              Share your research or project and we'll feature it here.
            </p>
            <v-btn
              href="mailto:hello@thothcraft.com?subject=Project Submission"
              class="cta-btn"
              size="x-large"
            >
              <v-icon start>mdi-email-outline</v-icon>
              Submit Your Project
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script setup>
const projects = [
  {
    title: 'WiFi Sensing ESP32 HAR',
    desc: 'Human Activity Recognition using WiFi Channel State Information (CSI) captured from ESP32 microcontrollers. Classifies activities like walking, sitting, standing, and falling in real time — no camera required.',
    icon: 'mdi-wifi-strength-4',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
    accentColor: 'blue',
    url: 'https://gadm21.github.io/WifiSensingESP32HAR/',
    tags: ['WiFi CSI', 'ESP32', 'HAR', 'Edge ML'],
    stats: [
      { value: 'ESP32', label: 'Hardware' },
      { value: 'Real-time', label: 'Inference' },
      { value: 'No Camera', label: 'Privacy' },
    ],
  },
]
</script>

<style scoped>
.projects-page { background: var(--bg-primary); }

.proj-hero {
  background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  padding: 140px 20px 80px;
}
.hero-title { font-size: 3.5rem; font-weight: 700; letter-spacing: -0.03em; color: var(--text-primary); }
.hero-subtitle { font-size: 1.25rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; }

.project-card {
  background: var(--bg-card) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 20px !important;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.1) !important;
}

.card-header-strip {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-main-icon { opacity: 0.95; }

.project-title { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); line-height: 1.3; }
.project-desc { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; }

.stats-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 8px 14px;
  min-width: 72px;
}
.stat-value { font-weight: 700; font-size: 0.9rem; color: var(--text-primary); }
.stat-label { font-size: 0.72rem; color: var(--text-muted); margin-top: 2px; text-align: center; }

.project-btn { border-radius: 12px !important; font-weight: 600 !important; text-transform: none !important; }

/* CTA */
.proj-cta { background: var(--bg-secondary); }
.cta-title { font-size: 2rem; font-weight: 700; letter-spacing: -0.02em; color: var(--text-primary); }
.cta-sub { color: var(--text-muted); font-size: 1.1rem; }
.cta-btn {
  background: var(--accent) !important;
  color: white !important;
  border-radius: 14px !important;
  font-weight: 600 !important;
  text-transform: none !important;
}
.cta-btn:hover { background: var(--accent-hover) !important; transform: scale(1.02); }

@media (max-width: 768px) {
  .hero-title { font-size: 2.5rem; }
}
</style>
