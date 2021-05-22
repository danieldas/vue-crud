<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-form @submit.prevent="save" ref="form"
              v-model="valid"
              lazy-validation>
        <v-card-title class="cabecera">
          <span class="headline">{{ isNew ? 'Nuevo' : 'Editar' }} Funcionario</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <Errores
                v-if="errores !== null"
                :errores="errores">

            </Errores>


            <v-row>
              <v-col cols="12" xs="12">
                <v-text-field v-model="item.nombre" label="Nombre (*)"
                              required
                              :counter="30"
                              maxlength="30"
                              autocomplete="off"
                              :rules="[v => !!v || 'Nombre es requerido',
                                                           v => (v && v.length>=1 && v.length <= 30) || 'El Nombre debe ser de 2 a 30 caracteres']"
                ></v-text-field>
              </v-col>

              <v-col cols="12" xs="12">
                <v-text-field v-model="item.apellido_paterno" label="Apellido Paterno (*)"
                              required
                              :counter="30"
                              maxlength="30"
                              autocomplete="off"
                              :rules="[v => !!v || 'Apellido paterno es requerido',
                                                           v => (v && v.length>=2 && v.length <= 30) || 'El Apellido paterno debe ser de 2 a 30 caracteres']"
                ></v-text-field>
              </v-col>

              <v-col cols="12" xs="12">
                <v-text-field v-model="item.apellido_materno" label="Apellido Materno (*)"
                              required
                              :counter="30"
                              maxlength="30"
                              autocomplete="off"
                              :rules="[v => !!v || 'Apellido materno es requerido',
                                                           v => (v && v.length>=2 && v.length <= 30) || 'El Apellido materno debe ser de 2 a 30 caracteres']"
                ></v-text-field>
              </v-col>

              <v-col cols="12" xs="12">
                <v-text-field v-model="item.item" label="Item (*)"
                              required
                              :counter="4"
                              maxlength="4"
                              autocomplete="off"
                              :rules="[v => !!v || 'Item es requerido',
                                                           v => (v && v.length>=1 && v.length <= 4) || 'El Item debe ser de 1 a 4 caracteres']"
                ></v-text-field>
              </v-col>

              <v-col cols="12" xs="12">
                <v-text-field v-model="item.cargo" label="Cargo (*)"
                              required
                              :counter="20"
                              maxlength="20"
                              autocomplete="off"
                              :rules="[v => !!v || 'Cargo es requerido',
                                                           v => (v && v.length>=4 && v.length <= 20) || 'El Cargo debe ser de 4 a 20 caracteres']"
                ></v-text-field>
              </v-col>

              <v-col cols="12" xs="12">
                <v-text-field v-model="item.ci" label="Ci (*)"
                              required
                              :counter="12"
                              maxlength="12"
                              autocomplete="off"
                              :rules="[v => !!v || 'Ci es requerido',
                                                           v => (v && v.length>=5 && v.length <= 12) || 'El Ci debe ser de 5 a 12 caracteres']"
                ></v-text-field>
              </v-col>

              <v-col cols="12" xs="12">
                <v-text-field v-model="item.telefono" label="Teléfono (*)"
                              required
                              :counter="8"
                              maxlength="8"
                              autocomplete="off"
                              :rules="[v => !!v || 'Teléfono es requerido',
                                                           v => (v && v.length>=5 && v.length <= 8) || 'El Teléfono debe ser de 5 a 8 caracteres']"
                ></v-text-field>
              </v-col>

            </v-row>

          </v-container>
          <v-divider></v-divider>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn type="submit" color="primary" class="pl-4 pr-4" :disabled="loading">Guardar
            <v-progress-circular
                v-if="loading"
                indeterminate
                color="primary"
                style="margin-left: 10px"
            ></v-progress-circular>
          </v-btn>
          <v-btn color="blue darken-1" outlined @click="close" id="btnCancel">Cancelar</v-btn>
        </v-card-actions>
      </v-form>

    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from "vuex";
import axios from 'axios';
import Errores from "../../components/Errores";


export default {
  name: "funcionarios-form",
  components: {Errores},
  props: [
    'item',
    'isNew',
    'dialog'
  ],
  data: () => ({
    mensaje: false,
    errores: null,
    valid: false,
    loading: false
  }),

  methods: {
    close() {
      this.$emit('close');
      this.closeMensaje();
    },
    closeMensaje() {
      this.mensaje = false;
    },
    save() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;
      axios({
        method: this.isNew ? 'POST' : 'PUT',
        url: this.url_base + "funcionarios" + (this.isNew ? "" : "/" + this.item.id),
        data: this.item
      }).then(response => {
        if (response.data.res) {
          this.loading = false;
          this.$toastr.success(response.data.message);
          this.$emit('getFuncionarios');
          this.close();

        } else {
          this.loading = false;
          this.$toastr.error(response.data.message);
        }
      }).catch(e => {
        this.loading = false;
        this.errores = e.response.data.errors;
        this.mensaje = true;
      })
    }
  },
  computed: {
    ...mapState(['url_base'])
  }
}
</script>

<style scoped>

</style>