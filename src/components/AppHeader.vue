<template>
  <div class="pb-4 px-3 sm:px-0 flex items-center justify-between">
    <router-link :to="{name: 'home'}" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg inline-flex items-center focus:outline-none focus:shadow-outline">
      <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"/></svg>
      <span>Volver</span>
    </router-link>
    <h2 class="text-xl sm:text-4xl md:text-4xl xl:text-4xl text-teal-700 font-mono text-center w-full">
      {{title}}
    </h2>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

