<template>
  <v-app >
    <div>
      <v-app-bar color="teal darken-1"  dark app flat="">
        <v-toolbar-title><strong>RRHH</strong></v-toolbar-title>
        <div style=" margin-left: 200px; text-align:center; color:red;" justify-center></div>

        <v-spacer></v-spacer>



        <p class="font-weight-light mt-4 ml-2"></p>
      </v-app-bar>
    </div>

    <v-content>
      <!--Contenido-->
      <v-container fill-height fluid grid-list-xl style="background-color: #F4F8F9">
        <v-layout justify-center wrap>
          <v-flex md12>
            <router-view :key="$route.fullPath"></router-view>
          </v-flex>
        </v-layout>
      </v-container>
      <!--fin contenido-->

      <!--footer-->
      <!--fin footer-->


    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },

  data: () => ({
  }),

  methods: {

  }
};
</script>
