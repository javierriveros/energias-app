<template>
  <nav class="bg-blue-100 py-2 px-2 shadow-md">
  <ul class="flex justify-center">
    <li class="flex-1 mr-2 text-center">
      <router-link :to="{name: 'home'}" class="border border-teal-500 hover:bg-teal-500 hover:text-white font-sans rounded-lg w-full block py-2" exact-active-class=" bg-teal-500 text-white">Inicio</router-link>
    </li>
    <li class="flex-1 mr-2 text-center">
      <router-link :to="{name: 'panels'}" class="border border-teal-500 hover:bg-teal-500 hover:text-white font-sans rounded-lg w-full block py-2" exact-active-class=" bg-teal-500 text-white">Paneles</router-link>
    </li>
    <li class="flex-1 mr-2 text-center">
      <router-link :to="{name: 'demand'}" class="border border-teal-500 hover:bg-teal-500 hover:text-white font-sans rounded-lg w-full block py-2" exact-active-class=" bg-teal-500 text-white">Demanda</router-link>
    </li>
    <li class="flex-1 mr-2 text-center">
      <router-link :to="{name: 'cables'}" class="border border-teal-500 hover:bg-teal-500 hover:text-white font-sans rounded-lg w-full block py-2" exact-active-class=" bg-teal-500 text-white">Cables</router-link>
    </li>
  </ul>
  </nav>
</template>
