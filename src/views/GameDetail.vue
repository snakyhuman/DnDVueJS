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
                <v-btn text :loading="processed" v-if="isMaster" :to="'/admin/' + game_inst.id">Панель мастера</v-btn>
                <v-btn text :loading="processed" v-if="canJoin" @click.stop="join()">Присоединиться</v-btn>
                <v-btn text :loading="processed" v-if="existProfile" :to="'/profile/'+profileId">Персонаж</v-btn>
            </v-card-actions>
        </v-container>
    </v-card>
</template>

<script>
    import * as firebase from "firebase";

    export default {
        name: "game-detail",
        props: {
            game: null,
            game_inst: null
        },
        data() {
            return {
                master: {displayName: "Неизвестный ёж"},
                error: null,
                processed: false,
                new_game_profile: {
                    game: "main",
                    gameId: "",
                    name: "Имя персонажа",
                    sex: "Муж.",
                    race: "",
                    level: 1,
                    health: 100,
                    magica: 100,
                    action: 5,
                    exp: 0,
                    armorDef: 0,
                    magicDef: 0,
                    points: 100,
                    gold: 0,
                    stats: {
                        MeleeDamage: 0,
                        MagicDamage: 0,
                        RangeDamage: 0,
                        PhysicDef: 0,
                        MagicDef: 0,
                        ElementsDef: 0,
                        Strength: 0,
                        Perception: 0,
                        Endurance: 0,
                        Charisma: 0,
                        Intelligence: 0,
                        Agility: 0,
                        Luck: 0
                    },
                    items: [],
                    perks: [],
                }
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
                    return this.currentUser.uid === this.master.uid;
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
                        player => player.id === this.currentUser.uid
                    ).length > 0
                );
            },
            existProfile() {
                return this.profileId != null;
            },
            profileId() {
                if (this.joined) {
                    let player = this.game.players.filter(
                        player => player.id === this.currentUser.uid
                    );
                    if (player[0].profile != null) {
                        return player[0].profile;
                    } else return null;
                } else return null;
            }
        },
        methods: {
            get_master() {
                let db = firebase.firestore().doc(this.game.master.path);
                db.get()
                    .then(d => {
                        this.master = d.data();
                    })
                    .catch(err => {
                        this.error = err;
                    });
            },
            join() {
                this.processed = true;
                let game_ref = this.game_inst.id;
                this.new_game_profile.gameId = game_ref;
                let user_id = this.currentUser.uid;
                let displayName = this.currentUser.displayName;
                const _this = this;
                firebase.firestore().collection("playerProfiles").add(this.new_game_profile).then(ref => {
                    var user = {
                        id: user_id,
                        name: displayName,
                        profile: ref.id
                    };
                    firebase.firestore().collection("games").doc(game_ref).update({
                        players: firebase.firestore.FieldValue.arrayUnion(user)
                    }).then(() => {
                        _this.processed = false;
                        _this.$router.push('/profile/' + user.profile);

                    });
                }).finally(()=> {
                    _this.processed = false;
                });
            }

        },
        created() {
            this.get_master();
        }
    };
</script>

<style lang="css" scoped>
</style>