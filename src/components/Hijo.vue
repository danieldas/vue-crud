<template>
<div>
  <h2>Hijo</h2>
  <h2>{{numero}}</h2>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Hijo",
  computed:{
    ...mapState(['numero'])
  }
}
</script>

<style scoped>

</style>