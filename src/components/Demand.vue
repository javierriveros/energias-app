<template>
  <div>
    <AppHeader title="Cálculo de demanda"></AppHeader>
    <form class="w-full" @submit.prevent="calculate">
      <div class="flex flex-wrap md:-mx-3 mb-2">
        <div class="w-full md:w-1/2 px-3 sm:px-0 md:px-3 mb-6 md:mb-2">
          <label class="block">
            <span class="form-label">Superficie (m<sup>2</sup>)</span>
            <input
              class="form-input mt-1 block w-full"
              type="number"
              placeholder="Superficie"
              v-model="superficie"
            />
          </label>
        </div>
        <div class="w-full md:w-1/2 px-3 sm:px-0 md:px-3 mb-6 md:mb-2">
          <p>Nivel de consumo: {{nivelConsumo}}</p>
        </div>
      </div>
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
import AppHeader from '@/components/AppHeader'

export default {
  components: {AppHeader},
  data() {
    return {
      superficie: 0,
      nivelConsumo: ''
    }
  },
  mounted() {
    this.getNivelConsumo()
  },
  watch: {
    superficie: function() {
      this.getNivelConsumo()
    }
  },
  methods: {
    calculate() {
      
    },
    getNivelConsumo() {
      if (this.superficie <= 80) {
        this.nivelConsumo = 'Mínimo'
      } else if (this.superficie <= 140) {
        this.nivelConsumo = 'Medio'
      } else {
        this.nivelConsumo = 'Elevado'
      }
    }
  }
};
</script>
