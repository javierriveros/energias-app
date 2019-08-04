<template>
  <div>
    <h1 class="text-3xl sm:text-4xl md:text-5xl xl:text-4xl font-light leading-tight text-center">
      Proyecto de energías
      <span class="sm:block text-teal-500 font-normal font-mono">¿Qué desea hacer?</span>
    </h1>

    <div class="container mx-auto px-4 py-4">
      <div class="sm:flex sm:-mx-2 sm:flex-wrap">
        <div class="flex items-center px-2 sm:w-full md:w-1/2 lg:w-1/3">
          <router-link :to="{name: 'panels'}" tag="div" class="w-full rounded overflow-hidden shadow-md hover:bg-gray-200 py-2">
            <a><img src="@/assets/images/panels.png" class="mx-auto" width="200" alt="Sunset in the mountains"></a>
            <div class="px-6 py-4 text-center">
              <div class="font-bold text-xl mb-2">Paneles solares</div>
              <p class="text-gray-700 text-base">
                Lorem ipsum dolor sit amet
              </p>
            </div>
          </router-link>
        </div>
        <div class="flex items-center px-2 sm:w-full md:w-1/2 lg:w-1/3">
          <router-link :to="{name: 'demand'}" tag="div" class="w-full rounded overflow-hidden shadow-md hover:bg-gray-200 py-2">
            <a><img src="@/assets/images/demand.jpg" class="mx-auto rounded-full" width="200" alt="Sunset in the mountains"></a>
            <div class="px-6 py-4 text-center">
              <div class="font-bold text-xl mb-2">Cálculo de demanda</div>
              <p class="text-gray-700 text-base">
                Lorem ipsum dolor sit amet
              </p>
            </div>
          </router-link>
        </div>
        <div class="flex items-center px-2 sm:w-full md:w-1/2 lg:w-1/3">
          <router-link :to="{name: 'cables'}" tag="div" class="w-full rounded overflow-hidden shadow-md hover:bg-gray-200 py-2">
            <a><img src="@/assets/images/cables.png" class="mx-auto" width="200" alt="Sunset in the mountains"></a>
            <div class="px-6 py-4 text-center">
              <div class="font-bold text-xl mb-2">Cálculo de cables</div>
              <p class="text-gray-700 text-base">
                Calcular la sección de un cable 
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>