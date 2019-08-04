<template>
  <div>
    <form class="w-full">
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="largo">
            Largo (m)
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="largo" type="number" placeholder="Largo del cable" v-model="largo">
        </div>
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="voltaje">
            Voltaje (m)
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="voltaje" type="number" placeholder="Voltaje" v-model="voltaje">
        </div>
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="tipo">
            Tipo de cable
          </label>
          <div class="relative">
            <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="tipo" v-model="tipo">
              <option value="bueno">PVC - PET (mal cable)</option>
              <option value="malo">EPR - XLPE (buen cable)</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="sistema">
            Tipo de sistema
          </label>
          <div class="relative">
            <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="sistema" v-model="sistema">
              <option value="mono">Monofásico</option>
              <option value="trif">Trifásico</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="potencia">
            Potencia (kW)
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="potencia" type="number" placeholder="Potencia requerida" v-model="potencia">
        </div>
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="dv">
            dV (%)
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="dv" type="number" placeholder="Potencia requerida" v-model="dv">
        </div>
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="temperatura">
            Temperatura (°C)
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="temperatura" type="number" placeholder="Potencia requerida" v-model="temperatura">
        </div>
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="intensidad">
            Intensidad (A)
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="intensidad" type="number" placeholder="Intensidad (en amperios)" v-model="intensidad">
        </div>
      </div>
    </form>
    <p>{{tipo}} {{potencia}} {{voltaje}} {{largo}} {{dv}} {{sistema}} {{temperatura}} {{intensidad}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      potencia: 0,
      voltaje: 0,
      largo: 0,
      tipo: 'bueno',
      dv: 0,
      temperatura: 0,
      sistema: 'mono',
      intensidad: 0,
    }
  }
}
</script>
