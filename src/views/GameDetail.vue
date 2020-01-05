<template>
  <v-card>
    <v-container>
      <v-row dense>
        <v-col cols="12" xs="12" sm="6" lg="6" class="ma-0 pa-0">
          <v-row>
            <v-col>
              <v-img
                :src="game.img"
                class="white--text align-end pl-3 pt-3"
                lazy-src="../assets/imagePlaceholder.jpg"
              >
                <v-chip color="indigo" text-color="white" class="mb-3 ml-3">
                  <v-avatar left>
                    <v-icon>mdi-account-circle</v-icon>
                  </v-avatar>
                  {{game.maxParty}}
                </v-chip>
              </v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-title class="text-break">{{game.title}}</v-card-title>
              <v-card-subtitle v-text="game.master" />
              <v-card-subtitle v-text="'Последняя партия: '+ game.lastBatch" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" xs="12" sm="6" lg="6">
          <v-card-subtitle class="mb-0 pb-0">Описание:</v-card-subtitle>
          <v-row dense>
            <v-card-text class>{{game.description}}</v-card-text>
          </v-row>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn to="/admin">Панель мастера</v-btn>
        <v-btn to="/profile">Присоединиться</v-btn>
        <v-btn>Персонаж</v-btn>
        <v-btn icon>
          <v-icon>mdi-cards-heart</v-icon>
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "game-detail",
  props: {
    game: null
  },
  data() {
    return {};
  }
};
</script>

<style lang="css" scoped>
</style>