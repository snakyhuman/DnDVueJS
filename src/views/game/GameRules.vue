<template>
  <v-container>
    <v-card :loading="processing">
      <v-tabs v-model="tabs" background-color="transparent" right show-arrows>
        <v-tab>Предметы</v-tab>
        <v-tab>Перки</v-tab>
        <v-tab>Дополнительно</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <items />
        </v-tab-item>
        <v-tab-item>
          <perks />
        </v-tab-item>
        <v-tab-item>
         <qualities/>
         <item-types/>
         <races/>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import Items from "./Items.vue";
import Perks from "./Perks.vue";
import Qualities from "./Qualities.vue";
import ItemTypes from "./ItemTypes.vue";
import Races from "./Races.vue";
export default {
  name: "game-rules",
  computed: {
    error() {
      return this.$store.getters.get_error;
    },
    processing() {
      return this.$store.getters.get_processing;
    },
    isAuth() {
      return this.$store.getters.get_isAuth;
    }
  },
  data() {
    return {
      tabs: null,
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Изображение должно быть меньше 2 MB!"
      ]
    };
  },
  methods: {
    getRules() {
      this.$store.dispatch("get_rules");
      return;
    },
    setNum() {
      this.$store.dispatch("add_item");
      return;
    }
  },
  components: {
    Items,
    Perks,
    Qualities,
    ItemTypes,
    Races
  },
  mounted() {
    this.$store.dispatch("get_rules");
  }
};
</script>

<style scoped>
</style>