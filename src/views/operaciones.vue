<template>
  <div>
    <h1>{{ hola }}</h1>
    <h2>{{numero}}</h2>
    <v-btn @click="sumar">+</v-btn>
    <hijo></hijo>
  </div>
</template>

<script>
import Hijo from "../components/Hijo";
import {mapState, mapMutations} from 'vuex'
export default {
  name: "operaciones",
  components: {Hijo},
  methods:{
    ...mapMutations(['sumar'])
  },
  computed:{
    ...mapState(['hola', 'numero'])
  }
}
</script>

<style scoped>

</style>