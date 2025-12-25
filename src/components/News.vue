<script>
export default {
  name: 'NewsCarousel',
}
</script>

<template>
  <v-carousel height="400" show-arrows="hover" cycle hide-delimiter-background>
    <v-carousel-item v-for="(slide, i) in slides" :key="i"> </v-carousel-item>
  </v-carousel>
</template>
