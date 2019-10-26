<template>
  <v-container flex>
    <v-row>
      <v-card tile>
        <v-card-title>Мои игры</v-card-title>
        <v-card-actions class="px-6">
          <v-row>
            <v-col cols="12">
              <v-text-field
                class
                placeholder="поиск по играм"
                append-icon="mdi-file-document-box-search"
              ></v-text-field>
            </v-col>
            <v-col class="ma-0" cols="6">
              <v-switch
                class="mr-3 flex-auto"
                v-model="myGames"
                :disabled="notFull ? true : false "
                inset
                label="Мои игры"
              ></v-switch>

              <v-btn-toggle v-model="role" v-if="myGames" rounded borderless>
                <v-btn value="master">
                  <span class="hidden-sm-and-down">Мастер</span>

                  <v-icon right>mdi-lead-pencil</v-icon>
                </v-btn>

                <v-btn value="player">
                  <span class="hidden-sm-and-down">Игрок</span>

                  <v-icon right>mdi-gamepad-round</v-icon>
                </v-btn>

                <v-btn value="observer">
                  <span class="hidden-sm-and-down">Наблюдатель</span>

                  <v-icon right>mdi-file-eye</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col class="ma-0" cols="6">
              <v-switch
                class="mr-3"
                v-model="notFull"
                :disabled="myGames ? true : false"
                inset
                label="Не полные"
              ></v-switch>
            </v-col>
          </v-row>
        </v-card-actions>
        <v-list max-height="500" class="overflow-y-auto">
          <v-list-item-group v-model="gameselected" color="green">
            <v-list-item v-for="(game, i) in games" :key="i">
              <v-list-item-content>
                <v-row dense>
                  <v-col md="3" class="hidden-md-and-down">
                    <v-img :src="game.img"></v-img>
                  </v-col>
                  <v-col md="4" class="block border-black">
                    <v-row>
                      <v-col md="12">
                        <v-list-item-title v-text="game.title"></v-list-item-title>
                        <v-list-item-subtitle v-text="game.master"></v-list-item-subtitle>
                        <v-list-item-subtitle
                          class="text-wrap"
                          v-text="'Дата последней игры: '+ game.lastBatch"
                        ></v-list-item-subtitle>
                        <v-img
                          max-height="300"
                          :src="game.img"
                          class="game-picture hidden-md-and-up"
                          :lazy-src="game.img"
                        ></v-img>
                      </v-col>
                      <v-col sm="6" md="12">
                        <v-chip class="font-weight-bold" color="indigo" text-color="white">
                          <v-avatar class="ml-1" left>
                            <v-icon>mdi-account-group</v-icon>
                          </v-avatar>
                          {{game.maxParty}}
                        </v-chip>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col md="5">
                    <v-card-text>{{game.description}}</v-card-text>
                    <div class="mr-1 text-wrap">
                      <p></p>
                    </div>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-row>
    <v-row justify="center">
      <p
        class="game-title rounded-left grey--text text-center font-weight-bold text--darken-3 pa-2 display-2 text-uppercase"
      >Обозреватель игр</p>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" md="6">
        <v-row justify="center" align="center">
          <h1 class="grey--text text--darken-3 headline text-center text-uppercase">Текущие партии</h1>
        </v-row>
        <v-row class="mx-3" align-content="center">
          <v-card
            width="100%"
            outlined
            class="d-flex light-grey rounded-card align-center justify-center"
            height="60"
            @click
          >
            <v-icon size="50">mdi-plus-circle-outline</v-icon>
          </v-card>
        </v-row>
        <v-row justify="center">
          <v-col cols="12"></v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-row justify="center">
          <p class="grey--text text--darken-3 pa-2 headline text-uppercase">мои партии</p>
        </v-row>
        <v-row justify="center" style="max-height: 400px" class="overflow-y-auto">
          <v-col>
            <v-card scrolable class="scroll">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "gamemaster",
  data: function() {
    return {
      myGames: true,
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
          lastBatch: new Date(),
          nextBatch: new Date(),
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
          lastBatch: new Date(),
          nextBatch: new Date(),
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
          lastBatch: new Date(),
          nextBatch: new Date(),
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
          lastBatch: new Date(),
          nextBatch: new Date(),
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
          lastBatch: new Date(),
          nextBatch: new Date(),
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
          lastBatch: new Date(),
          nextBatch: new Date(),
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
          lastBatch: new Date(),
          nextBatch: new Date(),
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
  }
};
</script >

<style lang="css" scoped>
.rounded-card {
  border-radius: 50px;
}
.game-picture {
  background: no-repeat;
}
</style>