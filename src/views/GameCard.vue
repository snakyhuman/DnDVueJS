<template>
  <v-card elevation="5" class="ma-0 pa-0 overflow-hidden" height="100%" @click="dialog = true">
    <v-row class="ma-0 pa-0" dense>
      <v-col cols="12" xs="12" sm="6" lg="5" class="ma-0 pa-0">
        <v-img
          :src="game.img"
          class="white--text align-end pl-3 pt-3"
          lazy-src="../assets/imagePlaceholder.jpg"
          gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.8)"
          height="100%"
        >
          <v-card-title class="ma-0 pa-0">{{game.title}}</v-card-title>
          <v-card-subtitle class="white--text ma-0 pa-0" v-text="game.master" />
          <v-chip color="indigo" text-color="white">
            <v-avatar left>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{game.maxParty}}
          </v-chip>
          <v-card-subtitle
            class="white--text ma-0 pa-0"
            v-text="'Дата последней игры: '+ game.lastBatch"
          />
        </v-img>
      </v-col>
      <v-col cols="12" xs="12" sm="6" lg="7" class>
        <v-card-subtitle>Описание:</v-card-subtitle>
        <v-card-text class="text-wrap">{{game.description}}</v-card-text>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>

        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>

          <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: "game-card",
  props: {
    game: null
  },
  data() {
      return {
          dialog:false
      }
  },
};
</script>

<style lang="css" scoped>
</style>