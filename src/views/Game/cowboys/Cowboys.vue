<template>
  <div>
    <div class="holder"></div>

    <v-tabs class="fixed-tabs" v-model="tab" centered show-arrows icons-and-text>
      <v-tabs-slider color="white darker-3"></v-tabs-slider>
      <v-tab href="#GameAdmin">
        ADMIN
        <v-icon>mdi-file-settings-variant</v-icon>
      </v-tab>
      <v-tab href="#GameInventory">
        Инвентарь
        <v-icon>mdi-bag-personal</v-icon>
      </v-tab>
      <v-tab href="#GameProfile">
        Анкета
        <v-icon>mdi-file-document</v-icon>
      </v-tab>
      <v-tab href="#GameRules">
        Правила
        <v-icon>mdi-gavel</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :value="'GameAdmin'">
        <game-admin></game-admin>
      </v-tab-item>
      <v-tab-item :value="'GameInventory'">
        <game-inventory></game-inventory>
      </v-tab-item>
      <v-tab-item :value="'GameProfile'">
        <game-profile></game-profile>
      </v-tab-item>
      <v-tab-item :value="'GameRules'">
        <game-rules></game-rules>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import GameAdmin from "./GameAdmin.vue";
import GameInventory from "./GameInventory.vue";
import GameRules from "./GameRules.vue";
import GameProfile from "./GameProfile.vue";

export default {
  name: "gamemaster",
  data: function() {
    return {
      tab: null
    };
  },
  components: {
    GameAdmin,
    GameInventory,
    GameRules,
    GameProfile
  }
};
</script>

<style lang="css" scoped>
.fixed-tabs {
  position: sticky;
  top: 60px;
  z-index: 2;
  background-color: white;
}
</style>