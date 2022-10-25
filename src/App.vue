<script setup lang="ts">
</script>

<template>
  <p>
    <router-link to="/first">Go to First</router-link>
    <div style="display: inline-block; width: 100px"></div>
    <router-link to="/second">Go to Second</router-link>
  </p>
  <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
