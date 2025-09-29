<template>
  <v-container>
    <h2>Contact Us</h2>
    <p>If you have any questions, feel free to reach out to us through this form:</p>
    <v-form>
      <v-text-field
        label="Name"
        placeholder="Your Name"
        class="mb-3"
      />
      <v-text-field
        label="Email"
        placeholder="you@example.com"
        class="mb-3"
      />
      <v-textarea
        label="Message"
        placeholder="Your message..."
        rows="4"
        class="mb-4"
      />
      <v-btn color="primary">
        Send
      </v-btn>
    </v-form>
  </v-container>
</template>
