<template>
  <v-container fluid class="shop-page pa-0">
    <!-- Hero Section -->
    <div class="glass-hero-global d-flex align-center justify-center text-center">
      <div class="hero-content">
        <h1 class="hero-title mb-4">Shop Thoth Kits: Start Building Today</h1>
        <p class="hero-subtitle mb-6">
          Kits include Raspberry Pi, ESP32, Sense HAT sensors, camera, 500mAh battery, and case. Pair with a plan for full unlock.
        </p>
      </div>
    </div>

    <!-- Product Cards Section -->
    <v-container class="py-12">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h4 mb-6">Choose Your Kit</h2>
        </v-col>
        
        <!-- Starter Kit -->
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="product-card h-100 pa-6" elevation="4">
            <v-card-title class="text-h5 mb-3 text-center">Starter Kit</v-card-title>
            <div class="text-center mb-4">
              <span class="text-h4 font-weight-bold">$99</span>
            </div>
            <v-card-text>
              <p class="text-body-1 mb-4">
                <strong>For students/makers:</strong> Core sensors + free tier access. 
                Pitch: 'Your first AI project, out-of-the-box.' Includes curriculum basics.
              </p>
              <v-list dense>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon class="mr-2" size="small">mdi-check</v-icon>
                    Raspberry Pi 4
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon class="mr-2" size="small">mdi-check</v-icon>
                    ESP32 Module
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon class="mr-2" size="small">mdi-check</v-icon>
                    Basic Sensors
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon class="mr-2" size="small">mdi-check</v-icon>
                    Durable Case
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon class="mr-2" size="small">mdi-check</v-icon>
                    Free Tier Access
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn class="glass-btn-primary-global" size="large" block href="https://thothfrontend.vercel.app/" target="_blank">Buy & Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Pro Kit -->
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="glass-card-featured h-100 pa-6" elevation="0">
            <v-card-title class="text-h5 mb-3 text-center">Pro Kit</v-card-title>
            <div class="text-center mb-4">
              <span class="text-h4 font-weight-bold">$149</span>
              <v-chip class="ml-2" color="white" text-color="primary" size="small">Popular</v-chip>
            </div>
            <v-card-text>
              <p class="text-body-1 mb-4">
                <strong>For researchers:</strong> Full camera + paid tier trial. 
                Pitch: 'Deep learning ready—collaborate securely.'
              </p>
              <v-list dense dark>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon class="mr-2" size="small">mdi-check</v-icon>
                    Everything in Starter
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon class="mr-2" size="small">mdi-check</v-icon>
                    High-Quality Camera
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon class="mr-2" size="small">mdi-check</v-icon>
                    Advanced Sensors
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon class="mr-2" size="small">mdi-check</v-icon>
                    1-Month Paid Tier Trial
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon class="mr-2" size="small">mdi-check</v-icon>
                    Deep Learning Ready
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn class="glass-btn-filled" size="large" block href="https://thothfrontend.vercel.app/" target="_blank">Buy & Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Classroom Bundle -->
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="glass-card-global h-100 pa-6" elevation="0">
            <v-card-title class="text-h5 mb-3 text-center">Classroom Bundle</v-card-title>
            <div class="text-center mb-4">
              <span class="text-h4 font-weight-bold">$499</span>
              <div class="text-body-2">5 units</div>
            </div>
            <v-card-text>
              <p class="text-body-1 mb-4">
                <strong>For organizations:</strong> Education kit + custom plan. 
                Pitch: 'Equip your lab for collaborative innovation.'
              </p>
              <v-list dense>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon class="mr-2" size="small">mdi-check</v-icon>
                    5x Starter Kits
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon class="mr-2" size="small">mdi-check</v-icon>
                    Education Curriculum
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon class="mr-2" size="small">mdi-check</v-icon>
                    Team Dashboard
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon class="mr-2" size="small">mdi-check</v-icon>
                    Instructor Support
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon class="mr-2" size="small">mdi-check</v-icon>
                    Custom Plan Access
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn class="glass-btn-primary-global" size="large" block href="https://thothfrontend.vercel.app/" target="_blank">Contact Sales</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Portal Login Reminder -->
      <v-row justify="center" class="mt-8">
        <v-col cols="12" md="8" class="text-center">
          <v-alert type="info" variant="tonal" class="mb-6">
            <v-icon class="mr-2">mdi-information</v-icon>
            <strong>Post-Purchase:</strong> Login to Portal for setup guide and full device configuration.
          </v-alert>
        </v-col>
      </v-row>
    </v-container>

    <!-- Plans Section -->
    <v-container class="py-12 grey lighten-5">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h4 mb-6">Software Plans</h2>
          <p class="text-body-1">Unlock the full potential of your Thoth kit with our software plans</p>
        </v-col>
        <v-col cols="12" lg="10">
          <v-table class="plans-table">
            <thead>
              <tr>
                <th class="text-left">Tier</th>
                <th class="text-left">Price</th>
                <th class="text-left">Key Perks</th>
                <th class="text-left">Best For</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="font-weight-bold">Free</td>
                <td class="font-weight-bold">$0/mo</td>
                <td>Basic sensors, forums, curricula</td>
                <td>Students & solo makers</td>
                <td class="text-center">
                  <v-btn color="primary" variant="outlined" size="small">Get Started</v-btn>
                </td>
              </tr>
              <tr class="highlighted-row">
                <td class="font-weight-bold">Paid</td>
                <td class="font-weight-bold">$9.99/mo</td>
                <td>Deep learning, unlimited sync</td>
                <td>Dedicated researchers</td>
                <td class="text-center">
                  <v-btn color="primary" size="small">Subscribe</v-btn>
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold">Organization</td>
                <td class="font-weight-bold">Custom</td>
                <td>Bundles, support, team dashboards</td>
                <td>Educators & institutions</td>
                <td class="text-center">
                  <v-btn color="primary" variant="outlined" size="small">Contact Us</v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>

    <!-- What's Included Section -->
    <v-container class="py-12">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h4 mb-6">What's in Every Kit</h2>
        </v-col>
        <v-col cols="12" md="6" lg="3" class="text-center mb-6">
          <v-icon size="64" color="primary" class="mb-3">mdi-memory</v-icon>
          <h4 class="text-h6 mb-2">Raspberry Pi 4</h4>
          <p class="text-body-2">Powerful ARM-based computer for AI processing</p>
        </v-col>
        <v-col cols="12" md="6" lg="3" class="text-center mb-6">
          <v-icon size="64" color="primary" class="mb-3">mdi-wifi</v-icon>
          <h4 class="text-h6 mb-2">ESP32 Module</h4>
          <p class="text-body-2">Wireless connectivity and edge computing</p>
        </v-col>
        <v-col cols="12" md="6" lg="3" class="text-center mb-6">
          <v-icon size="64" color="primary" class="mb-3">mdi-gauge</v-icon>
          <h4 class="text-h6 mb-2">Sensor Suite</h4>
          <p class="text-body-2">Environmental, motion, and visual sensors</p>
        </v-col>
        <v-col cols="12" md="6" lg="3" class="text-center mb-6">
          <v-icon size="64" color="primary" class="mb-3">mdi-battery</v-icon>
          <h4 class="text-h6 mb-2">Portable Power</h4>
          <p class="text-body-2">500mAh battery in durable case</p>
        </v-col>
      </v-row>
    </v-container>

    <!-- CTA Section -->
    <v-container class="py-12 grey lighten-5">
      <v-row justify="center" align="center" class="text-center">
        <v-col cols="12" md="8">
          <h2 class="text-h4 mb-6">Ready to Start Your AI/IoT Journey?</h2>
          <p class="text-body-1 mb-6">
            Join hundreds of students, researchers, and makers who are already building the future with Thoth.
          </p>
          <v-btn color="primary" size="large" class="mr-4">Shop Now</v-btn>
          <v-btn color="primary" variant="outlined" size="large" to="/plans">Compare Plans</v-btn>
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

.product-card {
  transition: transform 0.3s ease;
  border-radius: 16px;
}

.product-card:hover {
  transform: translateY(-8px);
}

.plans-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.plans-table th {
  background-color: #f5f5f5;
  font-weight: 600;
  padding: 20px 16px;
}

.plans-table td {
  padding: 20px 16px;
}

.highlighted-row {
  background-color: #f0f8ff;
}

.highlighted-row td {
  border-top: 2px solid #008CFF;
  border-bottom: 2px solid #008CFF;
}

.highlighted-row:first-child td:first-child {
  border-left: 2px solid #008CFF;
}

.highlighted-row:first-child td:last-child {
  border-right: 2px solid #008CFF;
}
</style>
