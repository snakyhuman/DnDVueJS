<template>
  <v-card
    v-if="game != null"
    elevation="5"
    class="ma-0 pa-0 "
    height="250"
    @click="dialog = true"
    tile
  >
    <v-row class="ma-0 pa-0" dense>
      <v-col cols="12" xs="12" sm="6" lg="6" class="ma-0 pa-0">
        <v-img
          :src="data.image || '' "
          class="white--text align-end pl-3 pt-3"
          lazy-src="../assets/imagePlaceholder.jpg"
          gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.8)"
          height="250"
        >
          <v-card-title class="ma-0 pa-0 text-break">{{data.name}}</v-card-title>
          <v-card-subtitle
            class="white--text ma-0 pa-0"
            v-text="'Мастер: ' + (isMaster == true ? 'Вы' : master.displayName)"
          />
          <v-chip color="indigo" text-color="white">
            <v-avatar left>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{playersCount +" / " + data.maxPlayers}}
          </v-chip>
          <v-card-subtitle
            class="white--text ma-0 pa-0"
            v-text="'Последняя партия: '+ data.eventDate.toDate().toISOString().substr(0, 10)"
          />
        </v-img>
      </v-col>
      <v-col cols="0" xs="0" sm="6" lg="6">
        <v-card-subtitle class="mb-0 pb-0">Описание:</v-card-subtitle>
        <v-row>
          <v-card-text class>{{data.description}}</v-card-text>
        </v-row>
      </v-col>
    </v-row>
    <v-btn absolute dark fab top right small color="red darken-2" @click="deleteGame()" v-if="isMaster">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="1000">
      <game-detail :game="data" />
    </v-dialog>
  </v-card>
</template>

<script>
import GameDetail from "./GameDetail.vue";
import * as firebase from "firebase";

export default {
  name: "game-card",
  props: {
    game: null
  },
  data() {
    return {
      dialog: false,
      error: null,
      master: { displayName: "Неизвестный ёж" }
    };
  },
  methods: {
    Master() {
      firebase
        .firestore()
        .doc(this.data.master.path)
        .get()
        .then(d => {
          this.master = d.data();
        })
        .catch(err => {
          this.error = err;
        });
    },
    deleteGame() {
      this.game.ref.delete().then(() => {
        this.game = null;
      });
    }
  },
  components: {
    GameDetail
  },
  computed: {
    data() {
      return this.game.data();
    },
    players() {
      return this.data.players;
    },
    playersCount() {
      return this.data.players.length;
    },
    currentUser() {
      return this.$store.getters.get_currentUser;
    },
    isMaster() {
      return this.currentUser.uid === this.master.uid;
    }
  },
  created() {
    this.Master();
  }
};
</script>

<style lang="css" scoped>
</style>