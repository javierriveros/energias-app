<template>
  <div>
    <AppHeader
      title="Cálculo de demanda máxima"
      @showHelp="handleShowHelp"
    ></AppHeader>
    <form
      class="w-full"
      @submit.prevent="calculate"
    >
      <h2 class="text-center">Determinación de la demanda máxima en instalaciones de edificios públicos e instalaciones especiales</h2>
      <div class="flex justify-center items-center py-4">
        <router-link
          :to="{name: 'demand'}"
          title="Demanda para edificios"
          class="bg-gray-300 mr-3 hover:bg-gray-400 text-center text-gray-800 font-bold py-2 px-4 rounded-lg inline-flex items-center focus:outline-none focus:shadow-outline"
        >
          Demanda para viviendas
        </router-link>
        <router-link
          :to="{name: 'edificios'}"
          title="Demanda para edificios"
          class="bg-gray-300 mr-3 hover:bg-gray-400 text-center text-gray-800 font-bold py-2 px-4 rounded-lg inline-flex items-center focus:outline-none focus:shadow-outline"
        >
          Demanda para edificios de viviendas
        </router-link>
      </div>

      <div class="flex flex-wrap md:-mx-3 mb-2">
        <div class="w-full md:w-1/2 px-3 sm:px-0 md:px-3 mb-6">
          <label class="block">
            <span class="form-label">
              Superficie máxima (m<sup>2</sup>)
            </span>
            <input
              class="form-input mt-1 block w-full"
              type="number"
              min="0"
              placeholder="Superficie"
              v-model="maxSurface"
            />
          </label>
        </div>
        <div class="w-full md:w-1/2 px-3 sm:px-0 md:px-3 mb-6">
          <label class="block">
            <span class="form-label">Tipo de edificio</span>
            <select
              class="form-select block w-full mt-1"
              v-model="buildingType"
            >
              <option
                v-for="(type, index) in table111"
                v-bind:value="index"
                v-bind:key="index"
              >
                {{type[0]}}
              </option>
            </select>
          </label>
        </div>
      </div>
      <div class="sm:text-right mx-3 sm:mx-0 text-center mb-4">
        <button
          class="block bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:shadow-outline font-semibold text-white px-4 py-2 rounded-lg"
          type="submit"
        >Calcular</button>
      </div>
    </form>

    <div class="flex justify-center">
      <p class="bg-teal-500 rounded-lg px-5 py-2 text-teal-900 inline-block">
        Demanda máxima de iluminación D <sub>Max I</sub> = {{maxDemand}}W<br>
        Demanda máxima de tomacorrientes D <sub>Max T</sub> = {{outletsDemand}}W<br>
        Máximo número de tomacorrientes = {{outletsQuantity}}<br>
      </p>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import AppHeader from "@/components/AppHeader";

export default {
  components: {
    AppHeader
  },
  data () {
    return {
      maxDemand: 0,
      maxSurface: 0,
      buildingType: 0,
      outletsQuantity: 0,
      outletsDemand: 0,
      table110: [
        ["Salas de espectáculo", 10, 0, -1, 1],
        ["Bancos", 20, 0, -1, 1],
        ["Peluquerías y salones de belleza", 30, 0, -1, 1],
        ["Iglesias", 10, 0, -1, 1],
        ["Clubes", 20, 0, -1, 1],
        ["Juzgados y audiencias", 20, 0, -1, 1],
        ["Hospitales", 20, 0, 50000, 0.4, 50001, -1, 0.2],
        ["Hoteles", 10, 0, 20000, 1, 20001, 80000, 0.5, 80001, 100000, 0.4, 100001, -1, 0.3],
        ["Habitaciones de hospedaje", 15, 0, -1, 1],
        ["Restaurantes", 20, 0, -1, 1],
        ["Escuelas", 30, 0, -1, 1]
      ],
      table111: [
        ["Salas de espectáculo", 1, 0, -1, 0.2],
        ["Bancos", 2, 0, -1, 0.7],
        ["Peluquerías y salones de belleza", 4, 0, -1, 0.8],
        ["Iglesias", 1, 0, -1, 0.2],
        ["Clubes", 2, 0, -1, 0.3],
        ["Juzgados y audiencias", 3, 0, -1, 0.4],
        ["Hospitales", 3, 0, 50000, 0.4, 50001, -1, 0.2],
        ["Hoteles", 4, 0, 20000, 1, 20001, 80000, 0.5, 80001, 100000, 0.4, 100001, -1, 0.3],
        ["Habitaciones de hospedaje", 3, 0, 10000, 1, 10001, 40000, 0.5, 40001, 50000, 0.35, 50001, -1, 0.25],
        ["Restaurantes", 2, 0, -1, 0.3],
        ["Escuelas", 2, 0, -1, 0.2]
      ]
    }
  },

  methods: {
    calculate () {
      this.maxDemand = 0;
      this.outletsQuantity =  0;
      this.outletsDemand = 0;

      let k = parseInt(this.buildingType);
      let power = this.table110[k][1];
      let totalPower = power * parseInt(this.maxSurface);

      for (let i = 2; i < this.table110[k].length; i = i + 3) {
        let min = this.table110[k][i];
        let max = this.table110[k][i + 1];
        let fd = this.table110[k][i + 2];
        if (max == -1) {
          this.maxDemand += (totalPower - min) * fd;
          break;
        } else if (this.maxDemand >= min && totalPower < max) {
          this.maxDemand += (totalPower - min) * fd;
          break;
        } else {
          this.maxDemand += max * fd;
        }
      }

      this.outletsQuantity = this.table111[k][1] * Math.ceil(this.maxSurface / 20);

      for (let i = 2; i < this.table111[k].length; i = i + 3) {
        let min = this.table111[k][i];
        let max = this.table111[k][i + 1];
        let fd = this.table111[k][i + 2];
        if (max == -1) {
          this.outletsDemand += (totalPower - min) * fd;
          return;
        } else if (totalPower >= min && totalPower < max) {
          this.outletsDemand += + (totalPower - min) * fd;
          return;
        } else {
          this.outletsDemand += max * fd;
        }
      }
    },

    getIntakeLevel (ms) {
      if (ms <= 80) {
        return this.table11[0];
      } else if (ms <= 140) {
        return this.table11[1];
      } else {
        return this.table11[2];
      }
    },
    showMessage (msg, type = "error") {
      Swal.fire({
        title: type == "error" ? "¡Error!" : "Información",
        text: msg,
        type: type,
        confirmButtonText: "Aceptar"
      });
    },
    handleShowHelp () {
      Swal.fire({
        title: "Ayuda",
        html: `<p class="text-left">Para realizar el cálculo de la demanda máxima <br>
                en edificios públicos tenga en cuenta:<br>
              - La superficie máxima del lugar en donde se realizará la instalación.<br>
              - El tipo de lugar (ver opciones dadas). <br><br>
              Luego el programa mostrará:<br>
              - D Max I = Demanda máxima de iluminación.<br>
              - D Max T = Demanda máxima de tomacorrientes.<br>`,
        confirmButtonText: "Aceptar"
      });
    }
  }
}
</script>