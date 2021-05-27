import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url_base: 'http://localhost:8001/api/',
    hola: 'hola mundosaddsasadsa',
    numero: 0,
  },
  mutations: {
    sumar(state){
      state.numero=state.numero+10;
    }
  },
  actions: {
  },
  modules: {
  }
})
