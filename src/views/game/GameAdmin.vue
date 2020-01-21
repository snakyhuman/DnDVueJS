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
                <v-card tile class="pa-3">
                    <v-card-title>Магазин
                        <v-spacer/>


                        <v-switch v-model="game.trade.trademode" @change="setTrademode()" inset/>
                    </v-card-title>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="game.trade.modificatorBuy" type="number" label="Покупка"/>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="game.trade.modificatorSell" type="number" label="Продажа"/>
                        </v-col>
                        <v-col>
                            <v-btn text @click="applyModificators()">
                                применить
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-card>
                        <v-card-subtitle>Предметы</v-card-subtitle>
                        <v-item-group>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-item v-slot:default="{ active, toggle }">
                                            <v-card class="pa-3" :color="trade.newItem.quality.color"
                                                    :dark="!!trade.newItem.quality.color">
                                                <v-card-subtitle>
                                                    Добавить предмет
                                                </v-card-subtitle>
                                                <v-row>
                                                    <v-col>
                                                        <v-select v-model="trade.newItem.quality" item-text="name"
                                                                  label="Качество предмета"
                                                                  :items="rules.qualities" return-object/>
                                                    </v-col>
                                                    <v-col>
                                                        <v-text-field v-model="trade.newItem.count" type="number"
                                                                      label="Количество"/>
                                                    </v-col>
                                                    <v-col>
                                                        <v-autocomplete v-model="trade.newItem.item"
                                                                        :items="rules.items" item-text="name"
                                                                        return-object label="Предмет"/>
                                                    </v-col>
                                                </v-row>
                                                <v-card-actions>
                                                    <v-spacer/>
                                                    <v-btn text @click="addItemToTrade()">
                                                        Добавить
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-item>
                                    </v-col>
                                    <v-col v-for="item in game.trade.items" :key="game.trade.items.indexOf(item)"
                                           cols="12"
                                           md="6" lg="3">
                                        <item-view :value="item" master @deleteItem="deleteItemFromTrade($event)"/>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-item-group>
                    </v-card>

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
    import ItemView from "./ItemView";
    import * as firebase from "firebase";

    export default {
        name: "game-admin",
        data() {
            return {
                tab: null,
                game: null,
                rules: null,
                navigation: true,
                mini: true,
                activity: 1,
                gameId: "",
                gameRef: null,
                trade: {
                    newItem: {
                        item: {},
                        quality: {},
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
                this.gameRef.update({
                    'trade.trademode': this.game.trade.trademode
                });
            },
            addItemToTrade() {
                let item = this.trade.newItem;
                if (item.item.name && item.quality.name) {
                    item = Object.assign({}, item.item);
                    item.count = this.trade.newItem.count;
                    item.quality = this.trade.newItem.quality;
                    let result = [];
                    let cnt = 0;
                    this.game.trade.items.forEach(i => {
                        let a = Object.assign({}, item);
                        let b = Object.assign({}, i);
                        a.count = b.count;
                        if (this.deepEqual(a, b)) {
                            i.count = +i.count + +item.count;
                            if (i.count < 1) {
                                i.count = 1;
                            }
                            cnt++;
                        }
                        result.push(i);
                    });
                    if (cnt === 0) {
                        result.push(item);
                    }
                    this.game.trade.items = result;
                    this.gameRef.update({
                        'trade.items': this.game.trade.items
                    }).then(() => {
                    });
                }
            },
            deleteItemFromTrade(item) {
                let index = this.game.trade.items.indexOf(item);
                this.game.trade.items.splice(index, 1);
                this.gameRef.update({
                    'trade.items': this.game.trade.items
                });
            },
            deepEqual(a, b) {
                if (a === b) {
                    return true;
                }
                if (a == null || typeof (a) !== 'object' || b == null && typeof (b) !== 'object') {
                    return false;
                }
                let equal = true;
                for (let key in a) {
                    if (typeof (a[key]) === 'object' && typeof (b[key]) === 'object') {
                        if (!this.deepEqual(a[key], b[key])) {
                            equal = false;
                        }
                    } else if (a[key] !== b[key]) {
                        equal = false;
                    }
                }
                return equal;
            },
            applyModificators() {
                this.gameRef.update({
                    trade: this.game.trade
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
            PlayerProfile,
            ItemView
        }
    };
</script>

<style lang="css">
</style>