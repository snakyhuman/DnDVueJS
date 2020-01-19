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
                            v-model="search"
                            label="поиск"
                            placeholder="начните вводить название..."
                            clearable
                            prepend-icon="mdi-magnify"
                            class="mx-4"
                    />
                </v-container>
            </v-img>
        </v-card>

        <!-- Games cards  -->
        <v-container class="px-0">
            <v-item-group>
                <v-container class="px-0">
                    <v-row>
                        <v-col v-show="user" cols="12" md="6">
                            <!-- New game -->
                            <v-item>
                                <v-card
                                        elevation="5"
                                        class="overflow-hidden d-flex align-center"
                                        height="250"
                                        outlined
                                        @click="newGameDialog = true"
                                >
                                    <v-card-subtitle class="display-2 text-uppercase flex-grow-1 text-center">Создать игру</v-card-subtitle>
                                </v-card>
                            </v-item>
                        </v-col>
                        <!-- Games -->
                        <v-col v-for="(game, i) in filteredItems" :key="i" cols="12" md="6">
                            <v-item v-slot:default="{ active }">
                                <game-card :game="game"/>
                            </v-item>
                        </v-col>
                    </v-row>
                </v-container>
            </v-item-group>
            <v-dialog v-model="newGameDialog" width="1000">
                <new-game @closeDialog="new_game_closed"/>
            </v-dialog>
        </v-container>
    </v-container>
</template>

<script>
    import GameCard from "./GameCard.vue";
    import NewGame from "./NewGame.vue";
    import * as firebase from "firebase";

    export default {
        name: "gamemaster",
        data: function () {
            return {
                filter: [],
                newGameDialog: false,
                games: [],
                search: "",
                user : {}
            };
        },
        computed: {
            filteredItems() {
                if (this.search && this.search !== "") {
                    let query = this.search;
                    return this.games.filter((x) => {
                        return x.data().name.toLowerCase().indexOf(query.toLowerCase()) !== -1
                    })
                } else {
                    return this.games;
                }
            }
        },
        methods: {
            new_game_closed() {
                this.newGameDialog = false;
            }
        },
        created() {
          firebase.firestore().collection('games').onSnapshot((data) => {
                this.games = [];
                data.forEach(item => {
                    this.games.push(item);
                });
            });
            firebase.auth().onAuthStateChanged(()=>{
                this.user = firebase.auth().currentUser;
            });
        },
        components: {
            GameCard,
            NewGame
        }
    };
</script>

<style lang="css">
    .game-img {
        position: absolute;
        top: 0px;
        right: 0px;
    }

    .game-col {
        position: relative;
    }
</style>