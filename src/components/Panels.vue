<template>
  <div>
    <AppHeader title="Cálculo de paneles solares" @showHelp="handleShowHelp"></AppHeader>
    <form class="w-full" @submit.prevent="calculate">
      <div class="flex flex-wrap items-center md:-mx-3 mb-0">
        <div class="w-full md:w-1/2 px-3 sm:px-0 md:px-3 mb-6">
          <label class="block">
            <span class="form-label">Tiempo conectado (h)</span>
            <input
              class="form-input mt-1 block w-full"
              type="number"
              placeholder="Tiempo"
              v-model="timeConnected"
            />
          </label>
        </div>
        <div class="w-full md:w-1/2 px-3 sm:px-0 md:px-3 mb-6">
          <label class="block">
            <span class="form-label">Potencia máxima (kW)</span>
            <input
              class="form-input mt-1 block w-full"
              type="number"
              placeholder="Potencia"
              v-model="power"
            />
          </label>
        </div>
      </div>
      <div class="mx-3 sm:mx-0">
        <button
          class="block bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:shadow-outline font-semibold text-white px-4 py-2 rounded-lg"
          type="submit"
        >Calcular</button>
      </div>
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import AppHeader from "@/components/AppHeader";

export default {
  components: {
    AppHeader
  },
  data() {
    return {
      timeConnected: 0,
      power: 0
    };
  },
  methods: {
    calculate() {
      Swal.fire({
        title: "¡Error!",
        text: "¡Error!",
        type: "error",
        confirmButtonText: "Aceptar"
      });
    },
    showErrorMessage(msg) {
      Swal.fire({
        title: "¡Error!",
        text: msg,
        type: "error",
        confirmButtonText: "Aceptar"
      });
    },
    handleShowHelp() {
      Swal.fire({
        title: "Ayuda",
        html: `<p class="text-left">Para realizar el cálculo de la sección del cable tenga en cuenta:<br>
              - El tiempo de autonomía del sistema.<br>
              - La potencia máxima que proveerá.<br>
              Luego el programa mostrará:<br>
              - Las características del regulador.<br>
              - Las características del inversor.<br>
              - Las características de las baterías.<br>`,
        confirmButtonText: "Aceptar"
      });
    }
  }
};
</script>