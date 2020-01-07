<template>
  <v-card>
    <v-container>
      <v-row dense>
        <v-col cols="12" xs="12" sm="6" lg="6" class="ma-0 pa-0">
          <v-row>
            <v-col>
              <v-img
                :src="game.image"
                class="white--text align-end pl-3 pt-3"
                lazy-src="../assets/imagePlaceholder.jpg"
              >
                <v-chip color="indigo" text-color="white" class="mb-3 ml-3">
                  <v-avatar left>
                    <v-icon>mdi-account-circle</v-icon>
                  </v-avatar>
                  {{playersCount +" / "+ game.maxPlayers}}
                </v-chip>
              </v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-title class="text-break">{{game.name}}</v-card-title>
              <v-card-subtitle>Мастер: {{master.displayName}}</v-card-subtitle>
              <v-card-subtitle
                v-text="'Последняя партия: ' + game.eventDate.toDate().toISOString().substr(0, 10)"
              />
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
        <v-btn v-if="isMaster" to="/admin">Панель мастера</v-btn>
        <v-btn v-if="canJoin" to="/profile">Присоединиться</v-btn>
        <v-btn v-if="existProfile">Персонаж</v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
import Vue from "vue";

export default {
  name: "game-detail",
  props: {
    game: null
  },
  data() {
    return {
      master: { displayName: "Неизвестный ёж" },
      error: null
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters.get_isAuth;
    },
    currentUser() {
      return this.$store.getters.get_currentUser;
    },
    isMaster() {
      if (this.currentUser != null && this.master != null) {
        return this.currentUser.uid == this.master.uid;
      } else return false;
    },
    canJoin() {
      if (
        !this.isMaster &&
        !this.joined &&
        this.playersCount < this.game.maxPlayers &&
        this.isAuth
      ) {
        return true;
      } else return false;
    },
    players() {
      return this.game.players;
    },
    playersCount() {
      return this.game.players.length;
    },
    joined() {
      return (
        this.game.players.filter(
          player => player.player.id == this.currentUser.uid
        ).length > 0
      );
    },
    existProfile() {
      if (this.profileId != null) {
        return true;
      } else return false;
    },
    profileId() {
      if (this.joined) {
        let player = this.game.players.filter(
          player => player.player.id == this.currentUser.uid
        );
        if (player[0].profile != null) {
          return player[0].profile.path;
        } else return null;
      } else return null;
    }
  },
  methods: {
    Master() {
      let db = Vue.$db.doc(this.game.master.path);
      db.get()
        .then(d => {
          this.master = d.data();
        })
        .catch(err => {
          this.error = err;
        });
    }
  },
  created() {
    this.Master();
  }
};
</script>

<style lang="css" scoped>
</style>