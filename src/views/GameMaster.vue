<template>
  <v-container flex>
    <v-row dense>
      <v-card tile width="100%">
        <v-card-title>
          <v-row>
            <v-col cols="12" md="6">
              <h1>Мои игры</h1>
            </v-col>
            <v-col cols="12" md="6"></v-col>
          </v-row>
        </v-card-title>
        <v-divider />
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <v-card outlined max-height="400" class="mx-1 fill-height overflow-y-auto">
              <v-list>
                <v-list-item-group v-model="gameselected" color="indigo">
                  <v-list-item v-for="(game, i) in games" :key="i">
                    <v-list-item-icon>
                      <v-icon>mdi-dice-3</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-row justify="center" align="center">
                        <v-col cols="6" justify-self="center">
                          <v-list-item-title v-text="game.title"></v-list-item-title>
                          <v-list-item-subtitle v-text="game.master"></v-list-item-subtitle>
                        </v-col>
                        <v-col cols="6">
                          <v-list-item-title>Дата последней игры:</v-list-item-title>
                          <v-list-item-subtitle>{game.lastBatch}</v-list-item-subtitle>
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="auto">
            <v-card outlined max-height="400" class="mx-1 fill-height full-width"></v-card>
          </v-col>
        </v-row>
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
      gameselected: "",
      games: [
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
</style>