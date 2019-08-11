<template>
  <div>
    <AppHeader title="Cálculo de demanda máxima"></AppHeader>
    <form class="w-full" @submit.prevent="calculate">
      <div class="flex flex-wrap items-center md:-mx-3 mb-2">
        <div class="w-full px-3 sm:px-0 md:px-3 mb-6">
          <label class="block">
            <span class="form-label">
              Superficie máxima (m<sup>2</sup>)
            </span>
            <input
              class="form-input mt-1 block w-full"
              type="number"
              placeholder="Superfice"
              v-model="maxSurface"
            />
          </label>
        </div>
      </div>
      <fieldset class="w-full sm:px-0 my-2">
        <legend class="w-full text-center form-label">Cuartos</legend>
        <div
          v-for="(room, index) in rooms"
          v-bind:key="index"
          class="flex flex-wrap items-center md:-mx-3 mb-2"
        >
          <div class="w-full border-b border-1 mx-3 pb-2 form-label">Cuarto {{index+1}}</div>
          <div class="w-full md:flex-1 px-3 sm:px-0 md:px-3 mb-6 md:mb-2">
            <label class="block">
              <span class="form-label">Ancho (m)</span>
              <input
                class="form-input mt-1 block w-full"
                type="number"
                placeholder="Ancho"
                v-model="room.width"
              />
            </label>
          </div>
          <div class="w-full md:flex-1 px-3 sm:px-0 md:px-3 mb-3 md:mb-2">
            <label class="block">
              <span class="form-label">Largo (m)</span>
              <input
                class="form-input mt-1 block w-full"
                type="number"
                placeholder="Largo"
                v-model="room.heightL"
              />
            </label>
          </div>
          <div class="px-3 sm:px-0 md:px-3 pt-2 md:pt-5 items-center flex">
            <button
              @click="removeRoom(index)"
              type="button"
              class="bg-red-500 hover:bg-red-400 mr-2 focus:outline-none focus:shadow-outline font-semibold text-white px-2 py-2 rounded-lg"
            >
              <svg
                class="fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  class="heroicon-ui"
                  d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"
                />
              </svg>
            </button>
            <button
              v-if="index + 1 === rooms.length"
              @click="addRoom"
              type="button"
              class="block bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:shadow-outline font-semibold text-white px-2 py-2 rounded-lg"
            >
              <svg
                class="fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"
                />
              </svg>
            </button>
          </div>
        </div>
      </fieldset>
      <div class="sm:text-right mx-3 sm:mx-0 text-center mb-4">
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
      rooms: [
        {
          width: 0,
          heightL: 0
        }
      ],
      maxSurface: 0,
      canRemoveRoom: false,
      table11: [
        { levelN: 1, levelT: "min", maxDemand: 3000, maxSurface: 80 },
        { levelN: 2, levelT: "mid", maxDemand: 7000, maxSurface: 140 },
        { levelN: 3, levelT: "hig", maxDemand: 7001, maxSurface: 141 }
      ],
      table12: [
        { levelN: 1, levelT: "min", lighting: 10, fluorLighting: 6 },
        { levelN: 2, levelT: "mid", lighting: 15, fluorLighting: 8 },
        { levelN: 3, levelT: "hig", lighting: 20, fluorLighting: 10 }
      ],
      table13: [
        { installedPowerMin: 0, installedPowerMax: 3000, demandFactor: 100 },
        { installedPowerMin: 3001, installedPowerMax: 8000, demandFactor: 35 },
        {
          installedPowerMin: 8001,
          installedPowerMax: 1000000,
          demandFactor: 25
        }
      ],
      table14: [
        { equipmentNumberMin: 0, equipmentNumberMax: 2, demandFactor: 100 },
        { equipmentNumberMin: 3, equipmentNumberMax: 5, demandFactor: 75 },
        { equipmentNumberMin: 6, equipmentNumberMax: 1000, demandFactor: 50 }
      ]
      // table15: [
      //   { apartmentsNumberMin: 2, apartmentsNumberMax: 4, minAvgLevel: 1.0, highLevel: 0.8 },
      //   { apartmentsNumberMin: 5, apartmentsNumberMax: 10, minAvgLevel: 0.8, highLevel: 0.7 },
      //   { apartmentsNumberMin: 11, apartmentsNumberMax: 20, minAvgLevel: 0.6, highLevel: 0.5 },
      //   { apartmentsNumberMin: 21, apartmentsNumberMax: 30, minAvgLevel: 0.4, highLevel: 0.3 },
      // ]
    };
  },
  watch: {
    rooms() {
      this.canRemoveRoom = this.rooms.length > 1;
    }
  },
  methods: {
    calculate() {},
    calculateOutlets(area) {
      if (area <= 10) return 1;
      else if (area > 10) {
        // TODO
      }
    },
    addRoom() {
      let checkEmptyrooms = this.rooms.filter(
        room => room.width === 0 || room.heightL === 0
      );
      if (checkEmptyrooms.length >= 1 && this.rooms.length > 0) {
        this.showErrorMessage(
          "No se puede agregar un nuevo cuarto sin haber rellenado el actual."
        );
        return;
      }
      this.rooms.push({
        width: 0,
        heightL: 0
      });
    },
    removeRoom(roomId) {
      if (this.canRemoveRoom) this.rooms.splice(roomId, 1);
    },
    showErrorMessage(msg) {
      Swal.fire({
        title: "¡Error!",
        text: msg,
        type: "error",
        confirmButtonText: "Aceptar"
      });
    }
  }
};
</script>