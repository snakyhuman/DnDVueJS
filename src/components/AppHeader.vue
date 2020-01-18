<template>
  <v-app-bar color="white" height="60" app >
    <v-app-bar-nav-icon color="primary" to="/home">
      <v-icon>mdi-alpha-n-box</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title>ST.NIKOLAY</v-toolbar-title>
    <v-spacer/>
    <v-app-bar-nav-icon to="/game" class="mx-1" icon color="success" x-large>
      <v-icon>mdi-dice-6</v-icon>
    </v-app-bar-nav-icon>
    <v-app-bar-nav-icon v-if="currentUser" to="/game-rules" class="mx-1" icon color="success" x-large>
      <v-icon>mdi-settings</v-icon>
    </v-app-bar-nav-icon>
    <v-dialog v-if="!isAuth"  v-model="logInDialog" persistent max-width="300px" class="fill-height">
      <template v-slot:activator="{ on }">
        <v-app-bar-nav-icon v-on="on" class="mx-1">
          <v-icon>mdi-login</v-icon>
        </v-app-bar-nav-icon>
      </template>
      <log-in @closeDialog="logInDialog = false"/>
    </v-dialog>

    <v-menu v-if="isAuth" bottom transition="slide-y-transition" offset-y left>
      <template v-slot:activator="{ on }">
        <v-app-bar-nav-icon class="mx-1" v-on="on">
          <v-avatar dark v-on:="on" v-if="currentUser.photoURL">
            <img class="align-center" :src="currentUser.photoURL" :alt="currentUser.displayName" />
          </v-avatar>
          <v-avatar dark v-on:="on" v-else>
            <v-icon>mdi-account-badge</v-icon>
          </v-avatar>
        </v-app-bar-nav-icon>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar v-if="currentUser.photoURL">
              <img :src="currentUser.photoURL" alt="currentUser.displayName" />
            </v-list-item-avatar>
            <v-list-item-avatar dark v-on:="on" v-else>
              <v-icon>mdi-account-badge</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{currentUser.displayName}}</v-list-item-title>
              <v-list-item-subtitle>{{currentUser.email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider/>

        <v-list rounded>
          <v-dialog
            v-model="profileDialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on }">
              <v-list-item @click.stop="profileDialog = true">
                <v-icon left>mdi-account-circle</v-icon>
                <v-list-item-title>Профиль</v-list-item-title>
              </v-list-item>
            </template>
            <v-card tile>
              <v-toolbar dark elevation="10">
                <v-btn icon dark @click="profileDialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Профиль</v-toolbar-title>

              </v-toolbar>
              <profile/>
            </v-card>
          </v-dialog>

          <v-list-item @click="signout">
            <v-icon left>mdi-logout</v-icon>
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import LogIn from "./LogIn.vue";
import Profile from "./Profile.vue";
export default {
  computed: {
    processing() {
      return this.$store.getters.get_processing;
    },
    isAuth() {
      return this.$store.getters.get_isAuth;
    },
    currentUser() {
      return this.$store.getters.get_currentUser;
    }
  },
  data: function() {
    return {
      draver: false,
      logInDialog: false,
      profileDialog: false
    };
  },
  methods: {
    signout() {
      this.$store.dispatch("signOut");
    }
  },
  components: {
    LogIn,
    Profile
  },
  beforeUpdate() {
  },
  updated() {
  }

};
</script>

<style lang="css" scoped>
</style>
