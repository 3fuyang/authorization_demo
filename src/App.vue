<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="rootWrapper">
    <RouterView />
  </main>
</template>

<style>
/*:root对应html元素*/
body{
  margin: 0;
  padding: 0;
}
.rootWrapper{
  background-color: cadetblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
}
</style>
