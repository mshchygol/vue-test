<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
import ContactForm from "./components/ContactForm.vue";
</script>

<template>
  <AppHeader />
  <ContactForm />
  <vue3-snackbar bottom right :duration="15000"></vue3-snackbar>
  <RouterView />
</template>
