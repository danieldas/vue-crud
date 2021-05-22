<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr class="grey lighten-5">
        <th class="text-left">#</th>
        <th class="text-left">Nombre</th>
        <th class="text-left">Ci</th>
        <th class="text-left">Cargo</th>
        <th class="text-left">Item</th>
        <th class="text-left">Teléfono</th>
        <th class="text-left"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in funcionarios" :key="index">
        <td>{{ (pagination.per_page * (pagination.current_page-1)) + (index+1) }}</td>

        <td>{{ item.nombre_completo }}</td>
        <td>{{ item.ci }}</td>
        <td>{{ item.cargo }}</td>
        <td>{{ item.item }}</td>
        <td>{{ item.telefono }}</td>

        <td>
          <v-icon medium class="mr-2" @click="editItem(item)" title="Editar" color="warning">mdi-pencil</v-icon>
          <v-icon title="Eliminar" medium @click="deleteItem(item)" :color="'red'">
            mdi-delete
          </v-icon>

        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import {mapState} from "vuex";
import axios from 'axios';

export default {
  name: "funcionarios-table",
  props: ['funcionarios', 'pagination'],
  methods: {
    editItem(item) {
      this.$emit('openForm', false, item.id);
    },
    deleteItem(item) {
      if (confirm("Seguro que quiere dar de baja este registro?")) {
        let url = this.url_base + "funcionarios/" + item.id;
        axios.delete(url).then(response => {
          if (response.data.res) {
           this.$toastr.success(response.data.message);
            this.$emit('getFuncionarios');
          } else {
           this.$toastr.error(response.data.message);
          }
        })
            .catch(e => {
         this.$toastr.error(e.error);
        })
      }
    },
  },
  computed: {
    ...mapState(['url_base'])
  }
}
</script>

<style scoped>

</style>