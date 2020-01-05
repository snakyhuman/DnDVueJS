<template>
  <v-container class="pa-0">
    <!-- search and navigation -->
    <v-card>
      <v-img
        src="./../assets/roleplay-banner.jpg"
        class="white--text align-start"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
      >
        <v-card-title>ИГРЫ</v-card-title>
        <v-container>
          <v-text-field
            clear-icon="mdi-close"
            filled
            dark
            label="поиск"
            placeholder="начните вводить название..."
            clearable
            prepend-icon="mdi-magnify"
            class="mx-4"
          ></v-text-field>
        </v-container>
      </v-img>
    </v-card>

    <!-- Games cards  -->
    <v-container class="px-0">
      <v-item-group>
        <v-container class="px-0">
          <v-row>
            <v-col cols="12" md="6" >
              <v-item>
                <v-card
                  elevation="5"
                  class="overflow-hidden elevation-10 d-flex align-center"
                  height="250"
                  dark
                  @click="newGameDialog = true"
                >
                  <div class="display-3 text--white flex-grow-1 text-center">Создать игру</div>
                </v-card>
              </v-item>
            </v-col>
            <v-col v-for="(game, i) in games" :key="i" cols="12" md="6">
              <v-item v-slot:default="{ active }">
                <game-card :game="game" />
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
      <v-dialog v-model="newGameDialog" width="1000">
        <new-game />
      </v-dialog>
    </v-container>
  </v-container>
</template>

<script>
import GameCard from "./GameCard.vue";
import NewGame from "./NewGame.vue";
export default {
  name: "gamemaster",
  data: function() {
    return {
      filter: [],
      newGameDialog: false,
      asPlayer: true,
      asMaster: true,
      notFull: false,
      role: "player",
      gameselected: "",
      games: [
        {
          id: "aassdasdsad",
          title: "Ковбои здесь пидоры",
          img:
            "https://img2.goodfon.com/wallpaper/nbig/0/ea/call-of-juarez-bound-in.jpg",
          master: "Николай Машуков",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed placeat quas iusto illum voluptatibus deleniti laudantium quasi unde, excepturi velit nemo minima cupiditate expedita facere. Nemo assumenda eos consectetur iure.Sed placeat quas iusto illum voluptatibus deleniti laudantium quasi unde, excepturi velit nemo minima cupiditate expedita facere. Nemo assumenda eos consectetur iure.",
          lastBatch: new Date().toISOString().substr(0, 10),
          nextBatch: new Date().toISOString().substr(0, 10),
          maxParty: 4,
          party: [
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            }
          ]
        },
        {
          id: "aassdasdsad",
          title: "Ковбои здесь пидоры",
          maxParty: 444,
          master: "Николай Машуков",
          lastBatch: new Date().toISOString().substr(0, 10),
          nextBatch: new Date().toISOString().substr(0, 10),
          party: [
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            }
          ]
        },
        {
          id: "aassdasdsad",
          title: "История одного Сослана",
          img:
            "https://img2.goodfon.com/wallpaper/nbig/0/ea/call-of-juarez-bound-in.jpg",
          master: "Сослан Адаев",
          lastBatch: new Date().toISOString().substr(0, 10),
          nextBatch: new Date().toISOString().substr(0, 10),
          party: [
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            }
          ]
        },
        {
          id: "aassdasdsad",
          title: "Ума-нама",
          img:
            "https://img2.goodfon.com/wallpaper/nbig/0/ea/call-of-juarez-bound-in.jpg",
          master: "Николай Машуков",
          lastBatch: new Date().toISOString().substr(0, 10),
          nextBatch: new Date().toISOString().substr(0, 10),
          party: [
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            }
          ]
        },
        {
          id: "aassdasdsad",
          title: "Ковбои здесь пидоры",
          img:
            "https://img2.goodfon.com/wallpaper/nbig/0/ea/call-of-juarez-bound-in.jpg",
          master: "Николай Машуков",
          lastBatch: new Date().toISOString().substr(0, 10),
          nextBatch: new Date().toISOString().substr(0, 10),
          party: [
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            }
          ]
        },
        {
          id: "aassdasdsad",
          title: "Ковбои здесь пидоры",
          img:
            "https://img2.goodfon.com/wallpaper/nbig/0/ea/call-of-juarez-bound-in.jpg",
          master: "Николай Машуков",
          lastBatch: new Date().toISOString().substr(0, 10),
          nextBatch: new Date().toISOString().substr(0, 10),
          party: [
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            }
          ]
        },

        {
          id: "aassdasdsssad",
          title: "Ковбои здесь пидоры часть 2",
          img:
            "https://img2.goodfon.com/wallpaper/nbig/0/ea/call-of-juarez-bound-in.jpg",
          master: "Николай Машуков",
          lastBatch: new Date().toISOString().substr(0, 10),
          nextBatch: new Date().toISOString().substr(0, 10),
          party: [
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            },
            {
              name: "",
              character: ""
            }
          ]
        }
      ]
    };
  },
  components: {
    GameCard,
    NewGame
  }
};
</script >

<style lang="css" scoped>
.game-img {
  position: absolute;
  top: 0px;
  right: 0px;
}
.game-col {
  position: relative;
}
</style>