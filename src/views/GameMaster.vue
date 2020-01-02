<template>
  <v-container fluid class="pa-0">
    <!-- search and navigation -->
    <v-card class="pa-1 mb-0 mt-0">
      <v-card-actions class="flex-wrap pa-0 ma-0">
        <v-card-title>ИГРЫ</v-card-title>
        <v-btn text rounded @click="showSearch = !showSearch" class="ml-3">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-switch v-model="asPlayer" inset label="Игрок" class="ml-3 mt-0"></v-switch>
        <v-switch v-model="asMaster" inset label="Мастер" class="ml-3 mt-0"></v-switch>
        <v-switch v-model="notFull" inset label="Не полные" class="ml-3 mt-0"></v-switch>
      </v-card-actions>
      <v-container>
        <v-expand-x-transition>
          <v-text-field
            v-show="showSearch"
            clear-icon="mdi-close"
            solo
            label="поиск"
            placeholder="ковбои здесь пидоры..."
            clearable
            class="my-0"
          ></v-text-field>
        </v-expand-x-transition>
      </v-container>
    </v-card>
    <v-container fluid class="pa-0">
      <v-item-group>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="6">
              <v-item>
                <v-card elevation="0" height="300" class="ma-0 pa-0" >
                  new game
                </v-card>
              </v-item>
            </v-col>
            <v-col v-for="(game, i) in games" :key="i" cols="12" md="6">
              <v-item v-slot:default="{ active }" height="200">
                <game-card :game="game"/>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </v-container>
  </v-container>
</template>

<script>
import GameCard from "./GameCard.vue";
export default {
  name: "gamemaster",
  data: function() {
    return {
      dialogs: [],
      filter: [],
      showSearch: false,
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
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed placeat quas iusto illum voluptatibus deleniti laudantium quasi unde, excepturi velit nemo minima cupiditate expedita facere. Nemo assumenda eos consectetur iure.",
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
    GameCard
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