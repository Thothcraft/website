<template>
  <v-container fluid class="plans-page pa-0">
    <!-- Hero Section -->
    <div class="glass-hero-global d-flex align-center justify-center text-center">
      <div class="hero-content">
        <h1 class="hero-title mb-4">Thoth Plans: Scale Your Innovation</h1>
        <p class="hero-subtitle mb-6">
          From free trials to enterprise support—choose what fits your role as student, researcher, or maker.
        </p>
      </div>
    </div>

    <!-- Pricing Table Section -->
    <v-container class="py-12">
      <v-row justify="center">
        <v-col cols="12" lg="11">
          <v-card class="glass-card-global" elevation="0">
            <v-table class="pricing-table">
              <thead>
                <tr>
                  <th class="feature-column">Feature</th>
                  <th class="plan-column">
                    <div class="plan-header">
                      <h3 class="text-h6">Free</h3>
                      <div class="price">$0/mo</div>
                    </div>
                  </th>
                  <th class="plan-column featured-plan">
                    <div class="plan-header">
                      <h3 class="text-h6">Paid</h3>
                      <div class="price">$9.99/mo</div>
                      <v-chip color="white" text-color="primary" size="small" class="mt-2">Most Popular</v-chip>
                    </div>
                  </th>
                  <th class="plan-column">
                    <div class="plan-header">
                      <h3 class="text-h6">Organization</h3>
                      <div class="price">Custom</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="feature-name">Sensor Data Collection</td>
                  <td class="text-center">✓ Basic</td>
                  <td class="text-center featured-cell">✓ Full</td>
                  <td class="text-center">✓ Full + Custom</td>
                </tr>
                <tr>
                  <td class="feature-name">Multi-Platform Interface</td>
                  <td class="text-center">✓</td>
                  <td class="text-center featured-cell">✓ + Premium</td>
                  <td class="text-center">✓ Enterprise</td>
                </tr>
                <tr>
                  <td class="feature-name">Obsidian Integration</td>
                  <td class="text-center">✓</td>
                  <td class="text-center featured-cell">✓ Advanced</td>
                  <td class="text-center">✓ Team Sync</td>
                </tr>
                <tr>
                  <td class="feature-name">Deep Learning Training</td>
                  <td class="text-center">-</td>
                  <td class="text-center featured-cell">✓</td>
                  <td class="text-center">✓ Scalable</td>
                </tr>
                <tr>
                  <td class="feature-name">Collaborative Learning</td>
                  <td class="text-center">Community</td>
                  <td class="text-center featured-cell">✓ Private</td>
                  <td class="text-center">✓ Institutional</td>
                </tr>
                <tr>
                  <td class="feature-name">Differential Privacy</td>
                  <td class="text-center">Basic</td>
                  <td class="text-center featured-cell">✓ Full</td>
                  <td class="text-center">✓ Compliant</td>
                </tr>
                <tr>
                  <td class="feature-name">Education Curriculum</td>
                  <td class="text-center">✓ Intro</td>
                  <td class="text-center featured-cell">✓ Full</td>
                  <td class="text-center">✓ Licensed</td>
                </tr>
                <tr class="cta-row">
                  <td class="feature-name"></td>
                  <td class="text-center">
                    <v-btn class="glass-btn-outline-global" size="large" href="https://thothfrontend.vercel.app/" target="_blank">Get Started</v-btn>
                  </td>
                  <td class="text-center featured-cell">
                    <v-btn class="glass-btn-primary-global" size="large" href="https://thothfrontend.vercel.app/" target="_blank">Select Plan</v-btn>
                  </td>
                  <td class="text-center">
                    <v-btn class="glass-btn-outline-global" size="large" href="https://thothfrontend.vercel.app/" target="_blank">Contact Sales</v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Details Accordion Section -->
    <v-container class="py-12 grey lighten-5">
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <h2 class="text-h4 text-center mb-8">Plan Details</h2>
          
          <v-expansion-panels variant="accordion" class="mb-6">
            <!-- Free Plan Details -->
            <v-expansion-panel>
              <v-expansion-panel-title class="text-h6">
                <v-icon class="mr-3">mdi-gift</v-icon>
                Free Plan - Perfect for Getting Started
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div class="pa-4">
                  <h4 class="text-h6 mb-3">Pitch to Students/Makers:</h4>
                  <p class="text-body-1 mb-4">
                    Dive in risk-free—collect data, take notes, join forums. Upgrade anytime.
                  </p>
                  
                  <h4 class="text-h6 mb-3">What's Included:</h4>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="green">mdi-check</v-icon>
                            Basic sensor data collection
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="green">mdi-check</v-icon>
                            Community forum access
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="green">mdi-check</v-icon>
                            Introductory curriculum
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="green">mdi-check</v-icon>
                            Basic Obsidian integration
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="green">mdi-check</v-icon>
                            Multi-platform access
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="green">mdi-check</v-icon>
                            Basic privacy features
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- Paid Plan Details -->
            <v-expansion-panel>
              <v-expansion-panel-title class="text-h6">
                <v-icon class="mr-3">mdi-star</v-icon>
                Paid Plan - For Serious Researchers
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div class="pa-4">
                  <h4 class="text-h6 mb-3">Pitch to Researchers:</h4>
                  <p class="text-body-1 mb-4">
                    Unlock pro tools for training and privacy. Ideal for solo deep dives.
                  </p>
                  
                  <h4 class="text-h6 mb-3">Everything in Free, Plus:</h4>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="primary">mdi-plus</v-icon>
                            Full sensor data collection
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="primary">mdi-plus</v-icon>
                            Deep learning training
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="primary">mdi-plus</v-icon>
                            Private collaboration tools
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="primary">mdi-plus</v-icon>
                            Full differential privacy
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="primary">mdi-plus</v-icon>
                            Complete curriculum access
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="primary">mdi-plus</v-icon>
                            Advanced Obsidian features
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- Organization Plan Details -->
            <v-expansion-panel>
              <v-expansion-panel-title class="text-h6">
                <v-icon class="mr-3">mdi-domain</v-icon>
                Organization Plan - For Teams & Institutions
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div class="pa-4">
                  <h4 class="text-h6 mb-3">Pitch to Educators:</h4>
                  <p class="text-body-1 mb-4">
                    Bulk kits, dedicated onboarding, and curricula tailored to your syllabus.
                  </p>
                  
                  <h4 class="text-h6 mb-3">Everything in Paid, Plus:</h4>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="orange">mdi-plus</v-icon>
                            Custom sensor configurations
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="orange">mdi-plus</v-icon>
                            Enterprise-grade interfaces
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="orange">mdi-plus</v-icon>
                            Team synchronization
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="orange">mdi-plus</v-icon>
                            Scalable deep learning
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="orange">mdi-plus</v-icon>
                            Institutional collaboration
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="orange">mdi-plus</v-icon>
                            Compliance-ready privacy
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="orange">mdi-plus</v-icon>
                            Licensed curriculum
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <v-icon class="mr-2" size="small" color="orange">mdi-plus</v-icon>
                            Dedicated support team
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>

    <!-- FAQ Section -->
    <v-container class="py-12">
      <v-row justify="center">
        <v-col cols="12" lg="8">
          <h2 class="text-h4 text-center mb-8">Frequently Asked Questions</h2>
          
          <v-expansion-panels variant="accordion">
            <v-expansion-panel>
              <v-expansion-panel-title>Can I switch plans anytime?</v-expansion-panel-title>
              <v-expansion-panel-text>
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and you'll be billed pro-rata for any upgrades.
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title>What happens to my data if I downgrade?</v-expansion-panel-title>
              <v-expansion-panel-text>
                Your data remains safe. However, some advanced features may become read-only until you upgrade again. We provide 30 days to export any data before permanent restrictions apply.
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title>Do you offer educational discounts?</v-expansion-panel-title>
              <v-expansion-panel-text>
                Yes! We offer significant discounts for educational institutions. Contact our sales team for custom pricing based on your needs and student count.
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title>Is there a free trial for paid plans?</v-expansion-panel-title>
              <v-expansion-panel-text>
                The Free plan serves as our trial. However, we offer a 14-day money-back guarantee on all paid plans, so you can try risk-free.
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>

    <!-- CTA Section -->
    <v-container class="py-12 grey lighten-5">
      <v-row justify="center" align="center" class="text-center">
        <v-col cols="12" md="8">
          <h2 class="text-h4 mb-6">Ready to Choose Your Plan?</h2>
          <p class="text-body-1 mb-6">
            Start with our free plan and upgrade as your projects grow. Join the Thoth community today!
          </p>
          <v-btn color="primary" size="large" class="mr-4">Select Plan</v-btn>
          <v-btn color="primary" variant="outlined" size="large">Login to Manage</v-btn>
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

.pricing-table-card {
  border-radius: 16px;
  overflow: hidden;
}

.pricing-table {
  width: 100%;
}

.pricing-table th,
.pricing-table td {
  padding: 20px 16px;
  border-bottom: 1px solid #e0e0e0;
}

.feature-column {
  background-color: #f8f9fa;
  font-weight: 600;
  width: 25%;
}

.plan-column {
  text-align: center;
  width: 25%;
  background-color: #fff;
}

.featured-plan {
  background-color: #008CFF;
  color: white;
}

.featured-cell {
  background-color: #f0f8ff;
  font-weight: 600;
}

.plan-header {
  padding: 10px 0;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 8px;
}

.feature-name {
  font-weight: 500;
}

.cta-row td {
  padding: 30px 16px;
  border-bottom: none;
}

.v-expansion-panels {
  border-radius: 12px;
}

.v-expansion-panel {
  margin-bottom: 8px;
  border-radius: 8px !important;
}
</style>
