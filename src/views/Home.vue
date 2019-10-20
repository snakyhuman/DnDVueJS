<template>
  <v-container class="container">
    <v-parallax
      class="parallax"
      height="300"
      src="https://media.giphy.com/media/3oD3YJVnCAtIY050ha/giphy.gif">
      <v-row align="center" justify="center">
        <h1 class="display-4 font-weight-thin block ma-4">ПАСТВА</h1>
      </v-row>
    </v-parallax>
    <v-content  class="pt-0" >
      <v-row >
        <v-col class="text-center text-uppercase " cols="12">
          <h1>Что такое ПАСТВА</h1>
        </v-col>
      </v-row>
      <v-row align-content="center" justify-content="center">
        <v-col cols="12" class="text-capitalize justify-space-between">
              <v-btn icon>
                <v-icon>mdi-gamepad-square</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-youtube</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-vk-box</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-discord</v-icon>
              </v-btn>
        </v-col>
        <v-col></v-col>
        <v-col></v-col>
      </v-row>
    </v-content>
  </v-container>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>

<style >
.parallax {
  margin-top: -11px;
}
</style>