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
      <h2 class="text-center">Determinación de la demanda máxima simultánea correspondiente a un edificio destinado principalmente a viviendas</h2>
      <div class="flex justify-center items-center py-4">
        <button
          @click="toggleIsGivenInstalledPower"
          class="bg-gray-300 mr-3 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg inline-flex items-center focus:outline-none focus:shadow-outline"
        >
          <span v-if="isGivenInstalledPower">Quiero calcular las potencias</span>
          <span v-else>Quiero dar los valores</span>
        </button>
        <router-link
          :to="{name: 'demand'}"
          title="Demanda para edificios"
          class="bg-gray-300 mr-3 hover:bg-gray-400 text-center text-gray-800 font-bold py-2 px-4 rounded-lg inline-flex items-center focus:outline-none focus:shadow-outline"
        >
          Demanda para viviendas
        </router-link>
        <router-link
          :to="{name: 'publicos'}"
          title="Demanda para edificios"
          class="bg-gray-300 hover:bg-gray-400 text-center text-gray-800 font-bold py-2 px-4 rounded-lg inline-flex items-center focus:outline-none focus:shadow-outline"
        >
          Demanda para edificios públicos
        </router-link>
      </div>

      <div class="flex flex-wrap md:-mx-3 mb-2">
        <fieldset class="w-full px-3 sm:px-0 md:px-3 my-2">
          <legend class="w-full text-center form-label">Apartamentos</legend>
          <div
            v-for="(department, index) in departments"
            v-bind:key="index"
            class="flex flex-wrap items-center md:-mx-3 mb-2"
          >
            <div class="w-full border-b border-1 mx-3 pb-2 form-label">Apartamento {{index+1}}</div>
            <div class="w-full md:flex-1 px-3 sm:px-0 md:px-3 mb-3 md:mb-2">
              <label class="block">
                <span class="form-label">Cantidad</span>
                <input
                  class="form-input mt-1 block w-full"
                  type="number"
                  min="0"
                  placeholder="Cantidad"
                  v-model="department.quantity"
                />
              </label>
            </div>
            <div class="w-full md:flex-1 px-3 sm:px-0 md:px-3 mb-6 md:mb-2">
              <label class="block">
                <span class="form-label">Superficie (m<sup>2</sup>)</span>
                <input
                  class="form-input mt-1 block w-full"
                  type="number"
                  min="0"
                  placeholder="Superficie"
                  v-model="department.maxSurface"
                />
              </label>
            </div>
            <div class="w-full md:flex-1 px-3 sm:px-0 md:px-3 mb-3 md:mb-2">
              <label class="block">
                <span class="form-label">Demanda (c/u) (W)</span>
                <input
                  class="form-input mt-1 block w-full"
                  type="number"
                  min="0"
                  placeholder="Demanda en watts"
                  v-model="department.maxDemand"
                />
              </label>
            </div>
            <div class="px-3 sm:px-0 md:px-3 pt-2 md:pt-5 items-center flex">
              <button
                @click="removeDepartment(index)"
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
                  <path d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z" />
                </svg>
              </button>
              <button
                v-if="index + 1 === departments.length"
                @click="addDepartment"
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
                  <path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z" />
                </svg>
              </button>
            </div>
          </div>
        </fieldset>

        <fieldset
          class="w-full px-3 sm:px-0 md:px-3 my-2"
          v-if="isGivenInstalledPower"
        >
          <legend class="w-full text-center form-label">Demandas</legend>
          <div class="flex flex-wrap -mx-2 mb-2">
            <div class="w-full md:w-1/2 px-2 mb-6 md:mb-2">
              <label class="block">
                <span class="form-label">
                  Demanda máxima de los servicios generales
                </span>
                <input
                  class="form-input mt-1 block w-full"
                  type="number"
                  min="0"
                  placeholder="Potencia instalada"
                  v-model="generalServicesDemand"
                />
              </label>
            </div>
            <div class="w-full md:w-1/2 px-2 mb-6 md:mb-2">
              <label class="block">
                <span class="form-label">
                  Demanda máxima de parte comercial
                </span>
                <input
                  class="form-input mt-1 block w-full"
                  type="number"
                  min="0"
                  placeholder="Potencia instalada"
                  v-model="comercialDemand"
                />
              </label>
            </div>
          </div>
        </fieldset>

        <div
          class="w-full"
          v-else
        >
          <fieldset class="w-full px-3 sm:px-0 md:px-3 my-2">
            <legend class="w-full text-center form-label">Servicios generales</legend>
            <div class="flex flex-wrap -mx-2 mb-2">
              <div class="w-full md:w-1/2 px-2 mb-6 md:mb-2">
                <label class="block">
                  <span class="form-label">Elevadores</span>
                  <select
                    class="form-select block w-full mt-1"
                    v-model="elevatorPower"
                  >
                    <option
                      v-for="(elevator, index) in table16"
                      v-bind:value="elevator.power"
                      v-bind:key="index"
                    >
                      {{elevator.cap}}kg - {{elevator.np}} personas - {{ elevator.vel }}m/s
                    </option>
                  </select>
                </label>
              </div>
              <div class="w-full md:w-1/2 px-2 mb-6 md:mb-2">
                <label class="block">
                  <span class="form-label">
                    Cantidad
                  </span>
                  <input
                    class="form-input mt-1 block w-full"
                    type="number"
                    min="0"
                    placeholder="Cantidad de elevadores"
                    v-model="elevatorQuantity"
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset class="w-full md:w-full px-3 sm:px-0 md:px-3 my-2">
            <legend class="w-full text-center form-label">Alumbrado en zonas comunes</legend>
            <p class="text-gray-600 text-xs text-center mb-2 italic">Alumbrado zonas comunes, portal, gradas, patios, garajes - departamento para uso del conserje, calefacción, agua caliente y otros servicios</p>
            <div
              v-for="(light, index) in lights"
              v-bind:key="index"
              class="flex flex-wrap items-center md:-mx-3 mb-2"
            >
              <div class="w-full border-b border-1 mx-3 pb-2 form-label">Alumbrado {{index+1}}</div>
              <div class="w-full md:flex-1 px-3 sm:px-0 md:px-3 mb-3 md:mb-2">
                <label class="block">
                  <span class="form-label">Cantidad</span>
                  <input
                    class="form-input mt-1 block w-full"
                    type="number"
                    min="0"
                    placeholder="Cantidad"
                    v-model="light.quantity"
                  />
                </label>
              </div>
              <div class="w-full md:flex-1 px-3 sm:px-0 md:px-3 mb-6 md:mb-2">
                <label class="block">
                  <span class="form-label">Superficie (m<sup>2</sup>)</span>
                  <input
                    class="form-input mt-1 block w-full"
                    type="number"
                    min="0"
                    placeholder="Superficie"
                    v-model="light.maxSurface"
                  />
                </label>
              </div>
              <div class="w-full md:flex-1 px-3 sm:px-0 md:px-3 mb-3 md:mb-2">
                <label class="block">
                  <span class="form-label">Tipo de iluminación</span>
                  <select
                    class="form-select block w-full mt-1"
                    v-model="light.maxDemand"
                  >
                    <option value="15">Incandescentes</option>
                    <option value="4">Fluorescentes</option>
                    <option value="5">Alumbrado y/o ventilación</option>
                  </select>
                </label>
              </div>
              <div class="px-3 sm:px-0 md:px-3 pt-2 md:pt-5 items-center flex">
                <button
                  @click="removeLight(index)"
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
                    <path d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z" />
                  </svg>
                </button>
                <button
                  v-if="index + 1 === lights.length"
                  @click="addLight"
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
                    <path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z" />
                  </svg>
                </button>
              </div>
            </div>
          </fieldset>
          <fieldset class="w-full px-3 sm:px-0 md:px-3 my-2">
            <legend class="w-full text-center form-label">Demanda máxima locales comerciales</legend>
            <div class="flex flex-wrap -mx-2 mb-2">
              <div class="w-full md:w-1/3 px-2 mb-6 md:mb-2">
                <label class="block">
                  <span class="form-label">Tipo de iluminación</span>
                  <select
                    class="form-select block w-full mt-1"
                    v-model="comercialLightType"
                  >
                    <option value="20">Incandescente</option>
                    <option value="8">Fluorescente</option>
                  </select>
                </label>
              </div>
              <div class="w-full md:w-1/3 px-2 mb-6 md:mb-2">
                <label class="block">
                  <span class="form-label">
                    Superficie por local (M<sup>2</sup>)
                  </span>
                  <input
                    class="form-input mt-1 block w-full"
                    type="number"
                    min="0"
                    placeholder="Superficie por local"
                    v-model="comercialLightSurface"
                  />
                </label>
              </div>
              <div class="w-full md:w-1/3 px-2 mb-6 md:mb-2">
                <label class="block">
                  <span class="form-label">
                    Cantidad de locales
                  </span>
                  <input
                    class="form-input mt-1 block w-full"
                    type="number"
                    min="0"
                    placeholder="Cantidad"
                    v-model="comercialLightQuantity"
                  />
                </label>
              </div>
            </div>
          </fieldset>
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
        Demanda máxima de los departamentos: D<sub>Dep</sub> = {{departmentsDemand}}W<br>
        Demanda máxima de los servicios generales: D<sub>SG</sub> = {{generalServicesDemand}}W<br>
        Demanda máxima de la parte comercial: D<sub>C</sub> = {{comercialDemand}}W<br>
        Demanda máxima: D<sub>Max</sub> = {{maxDemand}}
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
      departments: [
        {
          maxSurface: 0,
          maxDemand: 0,
          quantity: 1,
        }
      ],
      lights: [
        {
          name: 0,
          maxDemand: 15,
          quantity: 1,
          maxSurface: 0,
        }
      ],
      canRemoveDepartment: false,
      canRemoveLight: false,
      isGivenInstalledPower: false,
      maxDemand: 0,
      departmentsDemand: 0,
      generalServicesDemand: 0,
      comercialDemand: 0,
      elevatorPower: 4.5,
      elevatorQuantity: 1,
      comercialLightType: 20,
      comercialLightSurface: 0,
      comercialLightQuantity: 0,
      table11: [
        { levelE: "Mínimo", levelT: "min", maxDemand: 3000, maxSurface: 80 },
        { levelE: "Medio", levelT: "mid", maxDemand: 7000, maxSurface: 140 },
        { levelE: "Elevado", levelT: "hig", maxDemand: 7001, maxSurface: 141 }
      ],
      table16: [
        { type: "Tipo A", cap: 400, np: 5, vel: 0.63, power: 4.5 },
        { type: "Tipo B", cap: 400, np: 5, vel: 1.00, power: 7.5 },
        { type: "Tipo C", cap: 630, np: 8, vel: 1.00, power: 11.5 },
        { type: "Tipo D", cap: 630, np: 8, vel: 1.60, power: 18.5 },
        { type: "Tipo E", cap: 1000, np: 13, vel: 1.60, power: 29.5 },
        { type: "Tipo F", cap: 1000, np: 13, vel: 2.50, power: 46 },
        { type: "Tipo G", cap: 1600, np: 21, vel: 2.50, power: 73.5 },
        { type: "Tipo H", cap: 1600, np: 21, vel: 3.50, power: 103 },
      ]
    };
  },
  watch: {
    departments () {
      this.canRemoveDepartment = this.departments.length > 1;
    },
    lights () {
      this.canRemoveLights = this.lights.length > 1;
    }
  },
  methods: {
    calculate () {
      this.maxDemand = 0;
      this.departmentsDemand = 0;
      this.departments.forEach(department => {
        let demand = this.calculateDepartmentsDemand(department);
        this.departmentsDemand += demand;
      });
      if (!this.isGivenInstalledPower) {
        // Potencia elevadores
        let elevatorDemand = this.elevatorQuantity * this.elevatorPower;

        // Potencia alumbrado
        let lightsDemand = 0;
        this.lights.forEach(light => {
          lightsDemand += light.maxDemand * light.maxSurface * light.quantity;
        });
        
        this.comercialDemand = this.calculateMaximumLocalsDemand();


        this.generalServicesDemand = lightsDemand + elevatorDemand + this.comercialDemand;
      }
      this.maxDemand = this.departmentsDemand + parseInt(this.generalServicesDemand) + parseInt(this.comercialDemand);
    },
    // Factor de demanda para iluminación y tomacorriente
    calculateDepartmentsDemand (department) {
      let intakeLevel = this.getIntakeLevel(parseInt(department.maxSurface));
      let total = parseInt(department.quantity) * parseInt(department.maxDemand);

      let fs = 0;

      if (parseInt(department.quantity) >= 2 && parseInt(department.quantity) <= 4) {
        fs = intakeLevel.levelT == "min" || intakeLevel.levelT == "mid" ? total : total * 0.8;
      } else if (parseInt(department.quantity) >= 5 && parseInt(department.quantity) <= 10) {
        fs = intakeLevel.levelT == "min" || intakeLevel.levelT == "mid" ? total * 0.8 : total * 0.7;
      } else if (parseInt(department.quantity) >= 11 && parseInt(department.quantity) <= 20) {
        fs = intakeLevel.levelT == "min" || intakeLevel.levelT == "mid" ? total * 0.6 : total * 0.5;
      } else if (parseInt(department.quantity) >= 21 && parseInt(department.quantity) <= 30) {
        fs = intakeLevel.levelT == "min" || intakeLevel.levelT == "mid" ? total * 0.4 : total * 0.3;
      }
      return fs;
    },
    calculateMaximumLocalsDemand () {
      let total = this.getComercialPower();
      let fd = 0;
      if (total <= 3000) {
        fd = total;
      } else if (total <= 8000 && total >= 3001) {
        fd = 3000 + (total - 3000) * 0.35;
      } else if (total >= 8001) {
        fd = 3000 + 5000 * 0.35 + (total - 8000) * 0.25;
      }
      return fd;
    },
    getComercialPower() {
      let lightPower = this.comercialLightQuantity * this.comercialLightSurface * this.comercialLightType;
      let outletsPower = parseInt(Math.ceil(this.comercialLightSurface / 30)) * 200;
      return lightPower + outletsPower;
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
    toggleIsGivenInstalledPower () {
      this.isGivenInstalledPower = !this.isGivenInstalledPower;
    },
    addDepartment () {
      let checkEmptydepartments = this.departments.filter(
        room => room.maxSurface === 0 || room.maxDemand === 0 || room.quantity === 0
      );
      if (checkEmptydepartments.length >= 1 && this.departments.length > 0) {
        this.showMessage(
          "No se puede agregar un nuevo cuarto sin haber rellenado el actual."
        );
        return;
      }
      this.departments.push({
        quantity: 1,
        maxDemand: 0,
        maxSurface: 0,
      });
    },
    removeDepartment (departmentId) {
      if (this.canRemoveDepartment) this.departments.splice(departmentId, 1);
    },
    addLight () {
      let checkEmptyLights = this.lights.filter(
        light => light.quantity == 0 || light.maxDemand == 0
      );
      if (checkEmptyLights.length >= 1 && this.lights.length > 0) {
        this.showMessage(
          "No se puede agregar un nueva iluminación sin haber rellenado el actual."
        );
        return;
      }
      this.lights.push({
        name: 'Nuevo alumbrado',
        maxDemand: 15,
        quantity: 1,
        maxSurface: 0,
      });
    },
    removeLight (lightId) {
      alert(lightId);
      if (this.canRemoveLight) this.lights.splice(lightId, 1);
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
                en edificios de viviendas tenga en cuenta:<br>
              - La superficie máxima del lugar en donde se realizará la instalación.<br>
              - La demanda máxima por apartamento. <br><br>
              En caso de ya contar con los valores de la Potencia instalada en iluminación y tomacorrientes<br>
              se pueden ingresar en lugar de ingresar los dos primeros datos.<br>
              Luego el programa mostrará:<br>
              - DMAX = Demanda máxima total del edificio.<br>
              - DDep = Demanda máxima de los departamentos.<br>
              - DSG = Demanda máxima de los servicios generales.<br>
              - DC = Demanda máxima de la parte comercial o de oficinas.<br>`,
        confirmButtonText: "Aceptar"
      });
    }
  }
};
</script>