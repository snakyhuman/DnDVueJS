<template>
  <v-container>
    <v-card>
            <v-tabs v-model="tab" centered>
              <v-tab href="#tab-1">
                <v-icon>mdi-phone</v-icon>Recents
              </v-tab>

              <v-tab href="#tab-2">
                <v-icon>mdi-heart</v-icon>Favorites
              </v-tab>

              <v-tab href="#tab-3">
                <v-icon left>mdi-account-box</v-icon>Nearby
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i">
                <v-card flat>
                  <player-profile></player-profile>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          
            <v-row>
              <v-col cols="12" md="6" lg="4">
                <v-subheader>Случайный предмет</v-subheader>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <v-subheader>Случайное событие</v-subheader>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <v-subheader>Случайный враг</v-subheader>
              </v-col>
            </v-row>

    </v-card>
  </v-container>
</template>

<script>
import PlayerProfile from "./GamePlayerProfile.vue";
export default {
  name: "game-admin",
  data() {
    return {
      tab: null
    };
  },
  methods: {
    getRules() {
      this.$store.dispatch("get_rules");
      return "aaaa";
    }
  },
  components: {
    PlayerProfile
  }
};
</script>

<style lang="css">
</style>