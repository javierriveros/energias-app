<template>
  <div>
    <AppHeader
      title="Cálculo de cables"
      @showHelp="handleShowHelp"
    ></AppHeader>
    <form @submit.prevent="calculate">
      <div class="flex flex-wrap items-center md:-mx-3 mb-0">
        <div class="w-full md:w-1/4 px-3 sm:px-0 md:px-3 mb-6 md:mb-2">
          <label class="block">
            <span class="form-label">Largo (m)</span>
            <input
              class="form-input mt-1 block w-full"
              type="number"
              min="0"
              placeholder="Largo del cable"
              v-model="largo"
            />
          </label>
        </div>
        <!-- <div class="w-full md:w-1/5 px-3 sm:px-0 md:px-3 mb-6 md:mb-2">
          <label class="block">
            <span class="form-label">Voltaje (V)</span>
            <input
              class="form-input mt-1 block w-full"
              type="number"
              min="0"
              placeholder="Voltaje"
              v-model="voltaje"
            />
          </label>
        </div> -->
        <div class="w-full md:w-1/4 px-3 sm:px-0 md:px-3 mb-6 md:mb-2">
          <label class="block">
            <span class="form-label">Demanda máxima (kW)</span>
            <input
              class="form-input mt-1 block w-full"
              type="number"
              min="0"
              placeholder="Potencia requerida"
              v-model="potencia"
            />
          </label>
        </div>
        <div class="w-full md:w-1/4 px-3 sm:px-0 md:px-3 mb-6 md:mb-2">
          <label class="block">
            <span class="form-label">Caída de tensión (%)</span>
            <input
              class="form-input mt-1 block w-full"
              type="number"
              min="1"
              max="5"
              placeholder="Potencia requerida"
              v-model="tension"
            />
          </label>
        </div>
        <div class="w-full md:w-1/4 px-3 sm:px-0 md:px-3 mb-6 md:mb-2">
          <label class="block">
            <span class="form-label">Temperatura (°C)</span>
            <input
              class="form-input mt-1 block w-full"
              type="number"
              min="0"
              placeholder="Potencia requerida"
              v-model="temperatura"
            />
          </label>
        </div>
        <fieldset class="w-full md:w-1/2 px-3 sm:px-0 md:px-3 my-2">
          <legend class="w-full text-center form-label">Número de tubos protectores</legend>
          <div class="flex flex-wrap -mx-2 mb-2">
            <div class="w-full md:w-1/2 px-2 mb-3 md:mb-2">
              <label class="block">
                <span class="form-label">Verticales</span>
                <select
                  class="form-select block w-full mt-1"
                  v-model="tubosVerticales"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </label>
            </div>
            <div class="w-full md:w-1/2 px-2 mb-3 md:mb-2">
              <label class="block">
                <span class="form-label">Horizontales</span>
                <select
                  class="form-select block w-full mt-1"
                  v-model="tubosHorizontales"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset class="w-full md:w-1/2 px-3 sm:px-0 md:px-3 my-2">
          <legend class="w-full text-center form-label">Datos del sistema</legend>
          <div class="flex flex-wrap -mx-2 mb-2">
            <div class="w-full md:w-1/2 px-2  mb-6 md:mb-2">
              <label class="block">
                <span class="form-label">Tipo de sistema</span>
                <select
                  class="form-select block w-full mt-1"
                  v-model="sistema"
                >
                  <option value="1">Monofásico</option>
                  <option value="2">Trifásico</option>
                  <option value="3">Electroductos magnéticos</option>
                </select>
              </label>
            </div>
            <div class="w-full md:w-1/2 px-2 mb-6 md:mb-2">
              <label class="block">
                <span class="form-label">Tipo de aislamiento</span>
                <select
                  class="form-select block w-full mt-1"
                  v-model="aislante"
                >
                  <option value="1">PVC - PET</option>
                  <option value="2">EPR - XLPE</option>
                </select>
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="sm:text-right mx-3 sm:mx-0 text-center mb-4">
        <button
          class="block bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:shadow-outline font-semibold text-white px-4 py-2 rounded-lg"
          type="submit"
        >Calcular</button>
      </div>
    </form>
    <h3 class="text-3xl sm:text-4xl md:text-5xl xl:text-5xl leading-tight text-center font-mono py-2">
      <span class="bg-teal-500 rounded-lg px-5 py-2 text-teal-900">
        S = <span class="mr-2">{{seccion}}</span>mm<sup>2</sup>
      </span>
    </h3>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import AppHeader from '@/components/AppHeader'

export default {
  components: {
    AppHeader
  },
  data () {
    return {
      potencia: 30,
      largo: 40,
      aislante: 1,
      tension: 3,
      temperatura: 45,
      sistema: 2,
      tubosHorizontales: 1,
      tubosVerticales: 3,
      tabla53: [
        [1.0, 13.5, 12],
        [1.5, 17.5, 15.5],
        [2.5, 24, 21],
        [4, 32, 28],
        [6, 41, 36],
        [10, 57, 50],
        [16, 76, 68],
        [25, 101, 89],
        [35, 125, 111],
        [50, 151, 134],
        [70, 192, 171],
        [95, 232, 207],
        [120, 269, 239],
        [150, 309, 272],
        [185, 353, 310],
        [240, 415, 364],
        [300, 473, 419],
        [400, 566, 502],
        [500, 651, 578]
      ],
      tabla54: [
        [1.0, 18, 16],
        [1.5, 23, 20],
        [2.5, 31, 27],
        [4, 42, 36],
        [6, 54, 48],
        [10, 74, 66],
        [16, 100, 88],
        [25, 132, 116],
        [35, 163, 144],
        [50, 198, 175],
        [70, 252, 222],
        [95, 305, 268],
        [120, 353, 311],
        [150, 400, 353],
        [185, 456, 402],
        [240, 536, 474],
        [300, 617, 545],
        [400, 738, 652],
        [500, 848, 750]
      ],
      tabla56: [
        [10, 1.22, 1.15],
        [15, 1.17, 1.12],
        [20, 1.12, 1.08],
        [25, 1.07, 1.04],
        [35, 0.93, 0.98],
        [40, 0.87, 0.96],
        [45, 0.79, 0.94],
        [50, 0.71, 0.92],
        [55, 0.61, 0.87],
        [60, 0.5, 0.84],
        [65, null, 0.82],
        [70, null, 0.8],
        [75, null, 0.72],
        [80, null, 0.61]
      ],
      tabla59: [
        [1.0, 0.94, 0.91, 0.88, 0.87, 0.86],
        [0.92, 0.87, 0.84, 0.81, 0.8, 0.79],
        [0.85, 0.81, 0.78, 0.76, 0.75, 0.74],
        [0.82, 0.78, 0.74, 0.73, 0.72, 0.72],
        [0.8, 0.76, 0.72, 0.71, 0.7, 0.7],
        [0.79, 0.75, 0.71, 0.7, 0.69, 0.68]
      ],
      tabla517: [
        [1.0, 34, 29, 34],
        [1.5, 23, 20, 23],
        [2.5, 14, 12, 14],
        [4, 8.7, 7.5, 8.7],
        [6, 5.8, 5.1, 5.8],
        [10, 3.5, 3, 3.5],
        [16, 3.31, 1.96, 3.31],
        [25, 1.52, 1.28, 1.52],
        [35, 1.12, 0.96, 1.12],
        [50, 0.82, 0.73, 0.82],
        [70, 0.63, 0.54, 0.63],
        [95, 0.49, 0.42, 0.49],
        [120, 0.41, 0.35, 0.42],
        [150, 0.36, 0.31, 0.37],
        [185, 0.32, 0.27, 0.33],
        [240, 0.26, 0.23, 0.28],
        [300, 0.23, 0.2, 0.24],
        [400, 0.2, 0.18, 0.22],
        [500, 0.19, 0.16, 0.21]
      ],
      seccion: 0
    };
  },
  methods: {
    calculate () {
      let i =
        (this.potencia * 1000) /
        ((this.sistema == "2" ? Math.sqrt(3) : 1) * this.getVoltaje() * 0.9);
      let percent = this.getVoltaje() * (this.tension / 100);

      // Como L > a 40 m. Se hace por caída de tensión y se verifica por capacidad de conducción
      if (this.largo > 40) {
        // Caída de tensión

        let k = percent / (i * (this.largo / 1000));
        let seccion1 = this.getSFrom517(k);

        // Capacidad de conducción
        // Factor de corrección por agrupamiento
        let fa = this.getFa();
        // Factor de corrección por temperatura
        let ft = this.getFt();
        let di = i / (fa * ft);
        let seccion2 = this.getSFrom5354(di);
        // Se escoge la sección más grande
        if (seccion1 > seccion2) this.seccion = seccion1;
        else this.seccion = seccion2;
      } else {
        // Como L <= a 40 m. Se hace por capacidad de conducción y se verifica por caída de tensión
        // Capacidad de conducción
        // Factor de corrección por agrupamiento
        let fa = this.getFa();
        // Factor de corrección por temperatura
        let ft = this.getFt();
        let di = i / (fa * ft);
        let seccion1 = this.getSFrom5354(di);
        // Caída de tensión
        let k = this.tabla517.filter(t => t[0] == seccion1)[0][parseInt(this.sistema)];
        let dv = k * i * (this.largo / 1000);

        // Si el voltaje permitido es menor al porcentaje caída de tensión del voltaje
        if (dv <= percent) {
          this.seccion = seccion1;
        } else {
          percent = percent - 0.1;
          k = percent / (i * (this.largo / 1000));
          this.seccion = this.getSFrom517(k);
          // Buscar una S mayor
          this.showErrorMessage(
            'El cable está mal'
          );
        }
      }
    },
    getVoltaje () {
      return parseInt(this.sistema) == 1 || parseInt(this.sistema) == 3 ? 120 : 208; // Colombia
      // return parseInt(this.sistema) == 1 || parseInt(this.sistema) == 3 ? 220 : 380; // Europa
    },
    getFa () {
      return this.tabla59[this.tubosVerticales - 1][this.tubosHorizontales - 1];
    },
    getFt () {
      let temp = this.tabla56.filter(t => t[0] >= this.temperatura)
      if (temp[0]) {
        return temp[0][
          parseInt(this.aislante)
        ];
      } else {
        this.showErrorMessage(
          'No se puede hacer el cálculo. La temperatura dada no es permitida.'
        );
        return 0;
      }
    },
    getSFrom517 (k) {
      let filteredTable = this.tabla517.filter(
        t => t[parseInt(this.sistema)] <= k
      );
      if (filteredTable[0]) {
        return filteredTable[0][0];
      } else {
        this.showErrorMessage(
          'No se puede hacer el cálculo. La sección requerida no está permitida.'
        );
        return 0;
      }
    },
    getSFrom5354 (di) {
      let filteredTable =
        this.isBadCable()
          ? this.tabla53.filter(t => t[this.getSistema()] >= di + 2)
          : this.tabla54.filter(t => t[this.getSistema()] >= di + 2);
      if (filteredTable[0]) {
        return filteredTable[0][0];
      } else {
        this.showErrorMessage(
          'No se puede hacer el cálculo. La sección requerida no está permitida en las tablas 5.3a y 5.4a.'
        );
        return 0;
      }
    },
    isBadCable () {
      return this.aislante == "1";
    },
    getSistema () {
      return parseInt(this.sistema) == 1 || parseInt(this.sistema) == 3 ? 1 : 2;
    },
    showErrorMessage (msg) {
      Swal.fire({
        title: "¡Error!",
        text: msg,
        type: "error",
        confirmButtonText: "Aceptar"
      });
    },
    handleShowHelp () {
      Swal.fire({
        title: "Ayuda",
        html: `<p class="text-left">Para realizar el cálculo de la sección del cable tenga en cuenta:<br>
              - El largo del cable.<br>
              - El voltaje máximo que este soportará.<br>
              - La demanda máxima (proveer el valor en kilovatios).
              - El porcentaje de caída de tensión, máximo 5%.<br>
              - La temperatura que soportará el cable una vez instalado.<br>
              - El número de tubos protectores instalados tanto verticales como horizontales para determinar el factor de agrupamiento.<br>
              - El tipo de sistema usado: monofásico, trifásico o electroductos magnéticos.<br>
              - El tipo de aislamiento que tendrá el cable (PVC, PET) o (EPR, XLPE).<br>
              Luego el programa mostrará:<br>
              - La sección del cable adecuada`,
        confirmButtonText: "Aceptar"
      });
    }
  }
};
</script>
