<script setup lang="ts">
import { NMessageProvider, NNotificationProvider } from 'naive-ui'
import { RouterView } from 'vue-router'

</script>

<template>
  <main
    class="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500
    flex flex-col justify-center items-center
    w-full min-h-screen
    ">
    <n-message-provider>
      <n-notification-provider>
        <RouterView />
      </n-notification-provider>
    </n-message-provider>
  </main>
</template>

<style>
/*:root对应html元素*/
body{
  margin: 0;
  padding: 0;
}
</style>
