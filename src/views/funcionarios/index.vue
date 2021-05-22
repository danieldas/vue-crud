<template>
  <v-card outlined>
    <!--encabezado-->
    <v-card-title  >
      <v-list-item style="margin:-15px">

        <v-list-item-content>
          <v-list-item-title class="title">Funcionario</v-list-item-title>
          <v-list-item-subtitle class="subtitle-1"> <small>Lista</small> </v-list-item-subtitle>
        </v-list-item-content>

        <v-spacer></v-spacer>
        <v-icon x-large>mdi-account</v-icon>
      </v-list-item>
    </v-card-title>
    <v-divider></v-divider>
    <!--fin encabezado-->

    <!-- contenido-->
    <v-card-text>
      <template>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" xs="12" sm="7" align="right">
            <v-btn color="primary" dark class="mb-2" @click="openForm(true)">
              <v-icon left>mdi-plus</v-icon>
              Nuevo funcionario
            </v-btn>
          </v-col>
        </v-row>
        <form @submit.prevent="getFuncionarios" id="frmSearch">
          <v-row align="center">
            <v-col class="d-flex" cols="12" xs="12" sm="8" md="8">
              <v-text-field label="Buscar por nombre...." autocomplete="off" class="purple-input" id="filtro"
                            name="filtro" v-model="filtro"/>
            </v-col>
            <v-col class="d-flex mb-6" cols="12" xs="8" sm="3" md="2">
              <v-btn type="submit" @click="pagination.current_page = 1"  fab color="success" medium title="Buscar">
                <v-icon color="white">mdi-magnify</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </template>

      <funcionarios-form
          :item="item"
          :is-new="isNew"
          :dialog="dialog"
          :loading="false"
          @getFuncionarios="getFuncionarios"
          @close="close"
      ></funcionarios-form>

      <v-progress-linear
          v-show="isLoading"
          color="light-blue accent-4"
          indeterminate
      ></v-progress-linear>
      <funcionarios-table
          :funcionarios="funcionarios"
          :pagination="pagination"

          @openForm="openForm"
          @getFuncionarios="getFuncionarios"

      ></funcionarios-table>
      <p class="mt-5">
        <v-pagination
            v-model="pagination.current_page"
            :length="pagination.last_page"
            @input="getFuncionarios"
            :total-visible="7"
            circle
            small
            class="ocultar"
        ></v-pagination>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import FuncionariosTable from "./table";
import {mapState} from "vuex";
import axios from 'axios';
import FuncionariosForm from "./form";
export default {
  name: "index",
  components: {FuncionariosForm, FuncionariosTable},
  data: () => ({
    dialog: false,
    isNew: true,
    item: {},
    funcionarios: [],
    isLoading: true,
    filtro: '',
    //paginacion
    pagination: {
      per_page: 0,
      current_page: 1,
      last_page: 0,
    },
  }),
  mounted() {
    this.getFuncionarios();
    this.isLoading = true;

  },
  methods: {
    close() {
      this.dialog = false;
    },
    openForm(isNew, id = 0) {
      this.dialog = true;
      this.isNew = isNew;

      if (!this.isNew)
        this.getFuncionario(id);
      else
        this.item = {};
    },
    getFuncionario(id) {
      let url = this.url_base + "funcionarios/" + id;
      axios.get(url).then(response => {
        this.item = response.data;
      });
    },
    getFuncionarios() {
      this.isLoading= true;

      const url = this.url_base + "funcionarios?page=" + this.pagination.current_page + "&filtro=" + this.filtro;
      axios.get(url).then(response => {
        this.funcionarios = response.data.data;

        this.isLoading = false;
        this.makePagination(response.data);
      })
    },
    makePagination: function (page) {
      this.pagination.per_page = page.per_page;
      this.pagination.current_page = page.current_page;
      this.pagination.last_page = page.last_page;
    },
  },
  computed: {
    ...
        mapState(['url_base'])
  }
}
</script>

<style scoped>

</style>