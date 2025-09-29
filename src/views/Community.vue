<template>
  <v-container fluid class="community-page pa-0">
    <!-- Hero Section -->
    <div class="glass-hero-global d-flex align-center justify-center text-center">
      <div class="hero-content">
        <h1 class="hero-title mb-4">Thoth Community: Collaborate & Create</h1>
        <p class="hero-subtitle mb-6">
          Free tier users: Share projects in forums. Paid/Org: Host private federated sessions. Login to connect.
        </p>
        <v-btn class="glass-btn-filled mr-4" size="large">Join Community</v-btn>
        <v-btn class="glass-btn-outline" size="large" href="https://thothfrontend.vercel.app/" target="_blank">Login to Portal</v-btn>
      </div>
    </div>

    <!-- Community Resources Section -->
    <v-container class="py-12">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h4 mb-6">Community Resources</h2>
        </v-col>
        
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="resource-card h-100 pa-6" elevation="2">
            <v-card-title class="text-h6 mb-3">
              <v-icon class="mr-3" color="primary">mdi-forum</v-icon>
              Discussion Forums
            </v-card-title>
            <v-card-text>
              Connect with fellow innovators, ask questions, and share your discoveries. Open to all free tier users.
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" variant="outlined">Browse Forums</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" class="mb-6">
          <v-card class="resource-card h-100 pa-6" elevation="2">
            <v-card-title class="text-h6 mb-3">
              <v-icon class="mr-3" color="primary">mdi-book-open-variant</v-icon>
              Documentation
            </v-card-title>
            <v-card-text>
              Comprehensive guides, tutorials, and API documentation to help you get the most out of your Thoth device.
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" variant="outlined">View Docs</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" class="mb-6">
          <v-card class="resource-card h-100 pa-6" elevation="2">
            <v-card-title class="text-h6 mb-3">
              <v-icon class="mr-3" color="primary">mdi-github</v-icon>
              Open Source
            </v-card-title>
            <v-card-text>
              Contribute to Thoth's development, share custom sensors, and collaborate on community-driven features.
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" variant="outlined">GitHub Repo</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Success Stories Section -->
    <v-container class="py-12 grey lighten-5">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h4 mb-6">Success Stories</h2>
          <p class="text-body-1">See how our community members are using Thoth to innovate</p>
        </v-col>

        <!-- Student Story -->
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="story-card h-100" elevation="4">
            <v-card-text class="pa-6">
              <div class="text-center mb-4">
                <v-avatar size="80" color="blue lighten-2">
                  <v-icon size="40" color="white">mdi-school</v-icon>
                </v-avatar>
              </div>
              <h3 class="text-h6 mb-3 text-center">Student Success</h3>
              <p class="text-body-2 mb-4">
                "Used free sensors + Obsidian for thesis notes—boosted my grades! The integration made it so easy to organize my research data and findings."
              </p>
              <div class="text-center">
                <v-chip color="blue" text-color="white" size="small">Computer Science Student</v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Researcher Story -->
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="story-card h-100" elevation="4">
            <v-card-text class="pa-6">
              <div class="text-center mb-4">
                <v-avatar size="80" color="green lighten-2">
                  <v-icon size="40" color="white">mdi-flask</v-icon>
                </v-avatar>
              </div>
              <h3 class="text-h6 mb-3 text-center">Research Breakthrough</h3>
              <p class="text-body-2 mb-4">
                "Trained models across 10 devices with privacy—published in IEEE. The federated learning capabilities opened up entirely new research possibilities."
              </p>
              <div class="text-center">
                <v-chip color="green" text-color="white" size="small">PhD Researcher</v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Maker Story -->
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="story-card h-100" elevation="4">
            <v-card-text class="pa-6">
              <div class="text-center mb-4">
                <v-avatar size="80" color="orange lighten-2">
                  <v-icon size="40" color="white">mdi-hammer-wrench</v-icon>
                </v-avatar>
              </div>
              <h3 class="text-h6 mb-3 text-center">Maker Innovation</h3>
              <p class="text-body-2 mb-4">
                "Extended with custom ESP code—collaborated globally via portal. The open-source nature let me build exactly what I envisioned."
              </p>
              <div class="text-center">
                <v-chip color="orange" text-color="white" size="small">Hardware Maker</v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Pitch Your Use Case Section -->
    <v-container class="py-12">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="glass-card-global pa-8" elevation="0">
            <v-card-title class="text-h5 mb-6 text-center">Pitch Your Use Case</v-card-title>
            <v-card-text>
              <p class="text-body-1 mb-6 text-center">
                How does Thoth fit into your work as a student, researcher, or maker? Share your story with the community!
              </p>
              
              <v-form>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      label="Your Role"
                      :items="['Student', 'Researcher', 'Maker', 'Educator', 'Other']"
                      variant="outlined"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Project Title"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      label="Describe how Thoth fits into your project or workflow"
                      rows="4"
                      variant="outlined"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" class="text-center">
                    <v-btn color="primary" size="large">Submit Your Story</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Community Challenges Section -->
    <v-container class="py-12 grey lighten-5">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h4 mb-6">Community Challenges</h2>
          <p class="text-body-1">Join monthly contests and collaborative projects</p>
        </v-col>

        <v-col cols="12" md="6" class="mb-6">
          <v-card class="challenge-card pa-6" elevation="2">
            <v-card-title class="text-h6 mb-3">
              <v-icon class="mr-3" color="primary">mdi-trophy</v-icon>
              Monthly Federated Learning Contest
            </v-card-title>
            <v-card-text>
              <p class="text-body-2 mb-3">
                Collaborate with researchers worldwide to train models on distributed datasets. 
                This month's challenge: Environmental monitoring across continents.
              </p>
              <v-chip color="green" text-color="white" size="small" class="mr-2">Active</v-chip>
              <v-chip color="grey" text-color="white" size="small">15 participants</v-chip>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary">Join Challenge</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" class="mb-6">
          <v-card class="challenge-card pa-6" elevation="2">
            <v-card-title class="text-h6 mb-3">
              <v-icon class="mr-3" color="primary">mdi-lightbulb</v-icon>
              Innovation Showcase
            </v-card-title>
            <v-card-text>
              <p class="text-body-2 mb-3">
                Share your most creative Thoth applications. From smart gardens to 
                AI-powered art installations—show us what you've built!
              </p>
              <v-chip color="blue" text-color="white" size="small" class="mr-2">Ongoing</v-chip>
              <v-chip color="grey" text-color="white" size="small">32 submissions</v-chip>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary">Submit Project</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Community Stats Section -->
    <v-container class="py-12">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h4 mb-6">Community by the Numbers</h2>
        </v-col>
        
        <v-col cols="6" md="3" class="text-center mb-6">
          <div class="stat-number">500+</div>
          <div class="stat-label">Active Users</div>
        </v-col>
        
        <v-col cols="6" md="3" class="text-center mb-6">
          <div class="stat-number">1,200+</div>
          <div class="stat-label">Projects Shared</div>
        </v-col>
        
        <v-col cols="6" md="3" class="text-center mb-6">
          <div class="stat-number">50+</div>
          <div class="stat-label">Countries</div>
        </v-col>
        
        <v-col cols="6" md="3" class="text-center mb-6">
          <div class="stat-number">25+</div>
          <div class="stat-label">Universities</div>
        </v-col>
      </v-row>
    </v-container>

    <!-- CTA Section -->
    <v-container class="py-12 grey lighten-5">
      <v-row justify="center" align="center" class="text-center">
        <v-col cols="12" md="8">
          <h2 class="text-h4 mb-6">Ready to Join the Community?</h2>
          <p class="text-body-1 mb-6">
            Connect with innovators worldwide, share your projects, and collaborate on the future of AI/IoT.
          </p>
          <v-btn class="glass-btn-primary-global mr-4" size="large" href="https://thothfrontend.vercel.app/" target="_blank">Login & Join a Challenge</v-btn>
          <v-btn class="glass-btn-outline-global" size="large">Browse Projects</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<style scoped>
.hero {
  background: linear-gradient(120deg, #008CFF, #00C6FF);
  color: white;
  padding: 100px 20px;
  min-height: 50vh;
}

.hero-content {
  max-width: 800px;
}

.resource-card {
  transition: transform 0.3s ease;
}

.resource-card:hover {
  transform: translateY(-4px);
}

.story-card {
  transition: transform 0.3s ease;
  border-radius: 16px;
}

.story-card:hover {
  transform: translateY(-4px);
}

.challenge-card {
  transition: transform 0.3s ease;
}

.challenge-card:hover {
  transform: translateY(-4px);
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  color: #008CFF;
  line-height: 1;
}

.stat-label {
  font-size: 1.1rem;
  color: #666;
  margin-top: 8px;
}

@media (max-width: 600px) {
  .stat-number {
    font-size: 2rem;
  }
}
</style>
