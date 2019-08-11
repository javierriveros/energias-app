<template>
  <div class="pb-4 px-3 sm:px-0 flex items-center justify-between">
    <router-link
      :to="{name: 'home'}"
      title="Volver al inicio"
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg inline-flex items-center focus:outline-none focus:shadow-outline"
    >
      <svg
        class="fill-current w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z" /></svg>
      <span>Volver</span>
    </router-link>
    <h2 class="text-xl sm:text-4xl md:text-4xl xl:text-4xl text-teal-700 font-mono text-center w-full">
      {{title}}
    </h2>
    <button @click.prevent="showHelp" title="Mostrar ayuda" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded-lg inline-flex items-center focus:outline-none focus:shadow-outline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10.59 8.59a1 1 0 1 1-1.42-1.42 4 4 0 1 1 5.66 5.66l-2.12 2.12a1 1 0 1 1-1.42-1.42l2.12-2.12A2 2 0 0 0 10.6 8.6zM12 18a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" /></svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['title'],
  methods: {
    showHelp() {
      this.$emit('showHelp');
    }
  }
}
</script>

