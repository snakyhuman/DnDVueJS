<template>
  <v-card tile class="py-3 px-6" :loading="processing">
    <v-card-title class="justify-center text-center">ВХОД</v-card-title>
    <v-btn  absolute top right icon  @click.stop="closeDialog"><v-icon>mdi-close</v-icon></v-btn>
      <v-row justify="center" align="center">
        <v-col cols="auto">
          <v-btn icon color="#dd4b39" @click="googleSignIn">
            <v-icon>mdi-google</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn disabled icon>
            <v-icon color="#3b5999">mdi-facebook</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn disabled icon>
            <v-icon color="#0084ff">mdi-twitter</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-alert
        v-show="error"
        :value="error"
        border="top"
        colored-border
        type="warning"
        elevation="1"
      >{{error}}</v-alert>
  </v-card>
</template>

<script>
  import * as firebase from "firebase";

export default {
  name: "log-in",
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
  watch: {
    isAuth(val) {
      if (val === true) this.closeDialog();
    }
  },
  data: () => ({
  }),

  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    googleSignIn() {
      this.$store.dispatch("googleSignIn");
    },
    facebookSignIn() {
      let provider = firebase.auth.
      firebase.auth().signInWithRedirect(provider).then(function() {
      }).catch(function() {
      });
    },
    twitterSignIn() {
//later
    }
  }
};
</script>

<style lang="css" scoped>
</style>