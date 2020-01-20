<template>
    <v-container>
        <div v-if="game && rules && profiles">
            <v-btn v-show="!navigation" icon absolute left top style="z-index: 10" @click="navigation=true">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
            <v-navigation-drawer v-model="navigation" absolute :mini-variant.sync="mini">
                <template v-slot:prepend>
                    <v-list-item two-line>
                        <v-list-item-avatar>
                            <v-icon>mdi-gamepad-variant</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>Панель администратора</v-list-item-title>
                        <v-btn icon
                               @click.stop="mini = !mini">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                    </v-list-item>
                </template>

                <v-divider></v-divider>

                <v-list-item-group v-model="activity" dense>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-file-document</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Анкеты</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-store</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Магазин</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-sword-cross</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Противники</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-navigation-drawer>

            <div v-if="(profiles.length > 0) &&(activity === 0) ">
                <v-tabs v-model="tab" centered>
                    <v-tab v-for="i in profiles" :key="i.name" :href="`#tab-${i.name}`">
                        {{ i.name }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item v-for="i in profiles" :key="i.name" :value="`tab-${i.name}`">
                        <player-profile :profile-id="i.profile"/>
                    </v-tab-item>
                </v-tabs-items>
            </div>

            <div v-if="activity===1">
                <v-card tile>
                    <v-card-title>Магазин
                        <v-spacer/>
                        <v-switch v-model="game.trade.trademode" @change="setTrademode()" inset/>
                    </v-card-title>


                </v-card>
            </div>

            <div v-if="activity===2">
                <v-card tile>
                    <v-card-title>Противники</v-card-title>
                </v-card>
            </div>
        </div>
        <v-overlay v-else light absolute opacity="50" dark>
            <v-progress-circular indeterminate size="150">
                <v-card-subtitle>Идет загрузка</v-card-subtitle>
            </v-progress-circular>
        </v-overlay>
    </v-container>
</template>

<script>
    import PlayerProfile from "./GamePlayerProfile.vue";
    import * as firebase from "firebase";

    export default {
        name: "game-admin",
        data() {
            return {
                tab: null,
                game: {},
                rules: {},
                navigation: true,
                mini: true,
                activity: 1,
                gameId: "",
                trade: {
                    newItem: {
                        item: {},
                        quality: {},
                        weared: false,
                        count: 1
                    },
                }
            };
        },
        computed: {
            profiles() {
                return this.game.players || [];
            }
        },
        methods: {
            setTrademode() {
                firebase.firestore().collection('games').doc(this.gameId).update({
                    'trade.trademode': this.game.trade.trademode
                });
            }
        },
        created() {
            this.gameId = this.$route.params.id;
            if (this.gameId) {
                this.gameRef = firebase.firestore().collection('games').doc(this.gameId);
                this.gameRef.onSnapshot((doc) => {
                    this.game = doc.data() || {};
                });
                firebase.firestore().collection('gamerules').doc('main').onSnapshot((doc) => {
                    this.rules = doc.data() || {};
                });
            }
        },
        components: {
            PlayerProfile
        }
    };
</script>

<style lang="css">
</style>