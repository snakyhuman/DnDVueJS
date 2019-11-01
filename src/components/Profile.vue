<template>
  <v-container class="absolute">
    <v-row class="mt-7 mx-10 bg-light-gray" no-gutters>
      <v-col cols="12" md="3" offset-md="1" class="mr-10 mb-10">
        <v-card max-width="250px" class max-height="250px">
          <v-img
            :src="currentUser.photoURL"
            lazy-src="../assets/account_Placeholder.png"
            height="250"
            max-width="250px"
            max-height="250px"
            class="align-center d-flex justify-center"
          >
            <div class="display-3 flex-grow-1 text-center">
              <v-btn icon class="pa-10">
                <v-icon size="56">mdi-pencil</v-icon>
              </v-btn>
            </div>
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-text-field
          label="Имя пользователя"
          v-model="currentUser.displayName"
          filled
          color="grey lighten-1"
          :background-color="inputsEnabled.name ? 'white' : 'primal'"
          :append-icon="inputsEnabled.name ? 'mdi-pencil' : 'mdi-pencil-off'"
          :readonly="!inputsEnabled.name"
          @click:append="inputsEnabled.name = !inputsEnabled.name"
        />
        <v-text-field
          label="Электронная почта"
          v-model="currentUser.email"
          filled
          color="grey lighten-1"
          :background-color="inputsEnabled.email ? 'white' : 'primal'"
          :append-icon="inputsEnabled.email ? 'mdi-pencil' : 'mdi-pencil-off'"
          :readonly="!inputsEnabled.email"
          @click:append="inputsEnabled.email = !inputsEnabled.email"
        />
        <v-col cols="12" class="text-right">
          <v-btn class="mx-0 font-weight-light" color="success">Обновить профиль</v-btn>
        </v-col>
      </v-col>
    </v-row>
    <v-container>
      <v-card>
        <v-card-title>ИГРЫ</v-card-title>
        <v-card-actions class="flex-wrap">
          <v-btn icon @click="showSearch = !showSearch" class="mr-3">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-switch v-model="switch2" inset label="Игрок" class="mr-3"></v-switch>
          <v-switch v-model="switch2" inset label="Мастер" class="mr-3"></v-switch>
        </v-card-actions>
        <v-container fluid>
          <v-expand-x-transition>
            <v-text-field v-show="showSearch" clear-icon="mdi-close" clearable class="mt-3"></v-text-field>
          </v-expand-x-transition>
        </v-container>
      </v-card>
      <v-row class="justify-center pa-3">
        <v-item-group>
          <v-row>
            <v-col v-for="n in 30" :key="n" cols="12" md="6" lg="4">
              <v-item v-slot:default="{ active, toggle }">
                <v-card
                  :color="active ? 'primary' : ''"
                  class="d-flex align-center"
                  dark
                  width="100%"
                  height="200"
                  @click="toggle"
                >
                  <v-scroll-y-transition>
                    <div v-if="active" class="display-3 flex-grow-1 text-center">Active</div>
                  </v-scroll-y-transition>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "profile",
  computed: {
    currentUser() {
      return this.$store.getters.get_currentUser;
    }
  },
  data: () => ({
    showSearch: false,
    inputsEnabled: {
      name: false,
      email: false
    }
  })
};
</script>

<style lang="css" scoped>
.v-item-group {
  width: 100%;
}
</style>
