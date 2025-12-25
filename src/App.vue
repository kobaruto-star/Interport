<script setup>
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <v-app>
    <header>
      <TheHeader />
    </header>
    <main>
      <RouterView />
    </main>
  </v-app>
</template>
