<template>
    <v-container class="" fluid>
        <v-card v-if="game && rules && profiles" class="ma-0 red" color="red" tile>
            <v-tabs v-model="tab"
                    centered
                    color="red"
            >
                <v-tab
                        v-for="i in profiles"
                        :key="i.name"
                        :href="`#tab-${i.name}`"
                >
                    {{ i.name }}
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item
                        class="justify-center align-center align-content-center"
                        v-for="i in profiles"
                        :key="i.name"
                        :value="`tab-${i.name}`"
                >
                    <player-profile :profile-id="i.profile"/>
                </v-tab-item>
            </v-tabs-items>


        </v-card>
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
            };
        },
        computed: {
            profiles() {
                return this.game.players || [];
            }
        },
        methods: {},
        created() {
            let GameId = this.$route.params.id;
            if (GameId) {
                this.gameRef = firebase.firestore().collection('games').doc(GameId);
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