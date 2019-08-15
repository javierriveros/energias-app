<template>
  <div>
    <AppHeader
      title="Acerca del proyecto"
      @showHelp="handleShowHelp"
    ></AppHeader>
    <div class="w-full">
      <div class="text-center">
        <img
          src="@/assets/images/unillanos-logo.png"
          class="mx-auto mb-2"
          alt="Logo Unillanos"
        />
        <h2 class="text-2xl sm:text-3xl md:text-4xl xl:text-3xl font-light leading-tight">Proyecto realizado para la materia Gestión y Uso Racional de Energías</h2>
        <p class="my-4 leading-relaxed sm:text-lg md:text-xl xl:text-lg text-gray-600">Realizado por:</p>
      </div>
      <div class="flex flex-wrap items-center md:-mx-3 mb-0 justify-around text-center">
        <div class="w-full md:w-1/2 px-3 sm:px-0 md:px-3 mb-6">
          <h3>Walter Javier Riveros Castro</h3>
          <p><strong class="font-semibold">Código:</strong> 160003532</p>
          <p>Ingeniería de sistemas</p>
        </div>
        <div class="w-full md:w-1/2 px-3 sm:px-0 md:px-3 mb-6">
          <h3>Yamid Mauricio Leal García</h3>
          <p><strong class="font-semibold">Código:</strong> 160003546</p>
          <p>Ingeniería de sistemas</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";

export default {
  components: {
    AppHeader
  },
  methods: {
    handleShowHelp () {

    }
  },
};
</script>