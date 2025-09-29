<template>
  <v-container fluid class="pa-0">
    <!-- Hero Section -->
    <div class="hero d-flex align-center justify-center text-center py-12">
      <div>
        <h1 class="display-2 font-weight-bold mb-2">Meet the WAGILAB Team</h1>
        <p class="subtitle-1">The Minds Behind the Future of AGI</p>
      </div>
    </div>

    <!-- Team Section -->
    <v-container class="py-12">
      <v-row>
        <v-col v-for="member in members" :key="member.name" cols="12" sm="6" md="4" class="mb-6">
          <v-card class="member-card">
            <v-card-title class="text-h5">{{ member.name }}</v-card-title>
            <v-card-subtitle class="text-subtitle-1 mt-1">{{ member.role }}</v-card-subtitle>
            <v-card-text>
              <p>{{ member.bio }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      members: [
        {
          name: 'Gad Gad',
          role: 'AI researcher and developer',
          bio: `Gad is passionate about building AI applications that span across physical and digital. 
          He has experience building AI applications for healthcare applications using sensory data from wearable devices. 
          He is currently working on Wifi-sensing to give AI agents environmental awareness.`
        }
      ]
    }
  }
}
</script>

<style scoped>
.hero {
  background: linear-gradient(120deg, #008CFF, #00C6FF);
  color: white;
}

.member-card {
  height: 100%;
  transition: transform 0.3s ease;
}

.member-card:hover {
  transform: translateY(-8px);
}
</style>