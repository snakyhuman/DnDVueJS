<template>
    <v-container>
        <v-card>
            <v-btn
                    block
                    depressed
                    :color="isEdit ? 'blue' : 'green'"
                    @click="saveProfile()"
            >{{ isEdit ? 'Изменить' : 'Сохранить' }}
            </v-btn>
            <v-row>
                <v-col xs="12" sm="12" md="6">
                    <v-list-item>
                        <v-list-item-content>
                            <v-text-field dense label="Имя персонажа" :disabled="isEdit" v-model="player.name"/>
                            <v-select :value="player.sex" :items="['Муж.', 'Жен.' ]" :disabled="isEdit" dense
                                      label="Пол персонажа"/>
                            <v-select
                                    v-model="player.race"
                                    :items="gameData.races"
                                    :item-value="gameData.races"
                                    item-text="name"
                                    return-object
                                    :disabled="isEdit"
                                    dense
                                    label="Раса"
                            />
                            <v-card outlined v-show="!isEdit">
                                <v-card-title>{{player.race.name}}</v-card-title>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-card-subtitle>Описание</v-card-subtitle>
                                        <v-card-text>{{player.race.description}}</v-card-text>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-card-subtitle>Базовые характеристики</v-card-subtitle>
                                        <v-card-text class="my-0 py-0">Сила: {{player.race.Strength}}</v-card-text>
                                        <v-card-text class="my-0 py-0">Восприятие: {{player.race.Perception}}
                                        </v-card-text>
                                        <v-card-text class="my-0 py-0">Выносливость: {{player.race.Endurance}}
                                        </v-card-text>
                                        <v-card-text class="my-0 py-0">Харизма: {{player.race.Charisma}}</v-card-text>
                                        <v-card-text class="my-0 py-0">Интеллект: {{player.race.Intelligence}}
                                        </v-card-text>
                                        <v-card-text class="my-0 py-0">Ловкость: {{player.race.Agility}}</v-card-text>
                                        <v-card-text class="my-0 py-0">Удача: {{player.race.Luck}}</v-card-text>
                                        <v-divider/>
                                        <v-card-text class="my-0 py-0">Маг. урон (доп.): {{player.race.MagicDamage}}
                                        </v-card-text>
                                        <v-card-text class="my-0 py-0">Маг. защита (доп.): {{player.race.MagicDef}}
                                        </v-card-text>
                                        <v-card-text class="my-0 py-0">Физ. урон (доп.): {{player.race.MeleeDamage}}
                                        </v-card-text>
                                        <v-card-text class="my-0 py-0">Маг. защита (доп.): {{player.race.PhysicDef}}
                                        </v-card-text>
                                        <v-card-text class="my-0 py-0">Дальн. урон (доп.): {{player.race.RangeDamage}}
                                        </v-card-text>
                                        <v-card-text class="my-0 py-0">Сопр. стииям (доп.):
                                            {{player.race.ElementsDef}}
                                        </v-card-text>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-list-item-title class="text-uppercase subtitle-2">уровень: {{player.level}}
                            </v-list-item-title>
                            <v-progress-linear value="20" height="25" dark rounded>
                                <v-list-item-title
                                        class="text-uppercase subtitle-2 text--white ml-1"
                                >опыт: {{player.exp}}/ {{player.level*1000}}
                                </v-list-item-title>
                            </v-progress-linear>
                        </v-list-item-content>
                    </v-list-item>

                    <v-row class="mx-2">
                        <v-col cols="12" md="4">
                            <v-progress-linear color="green darken-4" value="20" height="25" dark rounded>
                                <v-list-item-title
                                        class="text-uppercase subtitle-2 text--white ml-1"
                                >ОЗ: {{player.health}}/ {{player.level*1000}}
                                </v-list-item-title>
                            </v-progress-linear>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-progress-linear color="blue darken-4" value="20" height="25" dark rounded>
                                <v-list-item-title
                                        class="text-uppercase subtitle-2 text--white ml-1"
                                >ОМ: {{player.magica}}/ {{player.level*1000}}
                                </v-list-item-title>
                            </v-progress-linear>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-progress-linear color="brown darken-4" value="20" height="25" dark rounded>
                                <v-list-item-title
                                        class="text-uppercase subtitle-2 text--white ml-1"
                                >ОД: {{player.action}}/ {{player.level*1000}}
                                </v-list-item-title>
                            </v-progress-linear>
                        </v-col>
                    </v-row>

                    <v-row class="mx-1 my-0">
                        <v-col class="ma-0" cols="12" sm="12" offset-sm="2" md="4" xl="4">
                            <v-chip class="ma-1" color="blue-grey darken-1" dark label>
                                <v-icon left>mdi-shield-plus</v-icon>
                                Класс брони
                                <v-avatar right class>{{player.armorDef}}</v-avatar>
                            </v-chip>
                        </v-col>
                        <v-col class="ma-0" cols="12" sm="12" offset-sm="2" md="4" xl="4">
                            <v-chip class="ma-1" color="blue darken-1" dark label>
                                <v-icon left>mdi-star</v-icon>
                                Сопр. магии
                                <v-avatar right class>1</v-avatar>
                            </v-chip>
                        </v-col>
                        <v-col align-self="center" cols="12" class="ma-0" sm="12" offset-sm="2" md="4" xl="4">
                            <v-chip class="ma-1" color="red darken-4" dark label>
                                <v-icon left>mdi-flash</v-icon>
                                Сопр. стихиям
                                <v-avatar right class>1</v-avatar>
                            </v-chip>
                        </v-col>
                    </v-row>

                    <v-row class="mx-1 my-0">
                        <v-col class="ma-0" cols="12" sm="12" offset-sm="2" md="4" xl="4">
                            <v-chip class="ma-1" color="blue-grey darken-1" dark label>
                                <v-icon left>mdi-shield-plus</v-icon>
                                Класс брони
                                <v-avatar right class>{{player.armorDef}}</v-avatar>
                            </v-chip>
                        </v-col>
                        <v-col class="ma-0" cols="12" sm="12" offset-sm="2" md="4" xl="4">
                            <v-chip class="ma-1" color="blue darken-1" dark label>
                                <v-icon left>mdi-star</v-icon>
                                Сопр. магии
                                <v-avatar right class>1</v-avatar>
                            </v-chip>
                        </v-col>
                        <v-col align-self="center" cols="12" class="ma-0" sm="12" offset-sm="2" md="4" xl="4">
                            <v-chip class="ma-1" color="red darken-4" dark label>
                                <v-icon left>mdi-flash</v-icon>
                                Сопр. стихиям
                                <v-avatar right class>1</v-avatar>
                            </v-chip>
                        </v-col>
                    </v-row>

                    <v-card class="mx-3" outlined>
                        <v-card-title>Инвентарь</v-card-title>
                        <v-card-title>Золото {{this.player.gold}}$</v-card-title>
                        <v-item-group>
                            <v-container>
                                <v-row dense>
                                    <v-col cols="12">
                                        <v-item v-slot:default="{ active, toggle }">
                                            <v-card class="d-flex align-center"
                                                    outlined
                                                    height="50"
                                                    @click="addItemDialog = !addItemDialog">
                                                <div class=" flex-grow-1 text-center">Добавить</div>
                                            </v-card>
                                        </v-item>
                                        <v-dialog
                                                v-model="addItemDialog"
                                                max-width="500"
                                        >
                                            <v-card :color="newItem.quality.color" dark>
                                                <v-card-title class="headline">Добавить предмет
                                                </v-card-title>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-select v-model="newItem.quality" item-text="name"
                                                                      label="Качество предмета" dark
                                                                      :items="gameData.qualities" return-object/>
                                                            <v-autocomplete v-model="newItem.item"
                                                                            :items="gameData.items" item-text="name"
                                                                            return-object label="Предмет"/>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                                <v-card-actions>
                                                    <v-btn
                                                            text
                                                            @click="addItemDialog = false"
                                                    >
                                                        Отмена
                                                    </v-btn>
                                                    <v-spacer/>
                                                    <v-btn
                                                            text
                                                            @click="addItem()"
                                                    >
                                                        Добавить
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-col>
                                    <v-col :v-if="player.items && player.items.length>0"
                                           v-for="item in (player.items || [])"
                                           :key="item.name"
                                           cols="12">
                                        <v-item v-slot:default="{ active, toggle }">
                                            <v-card utlined @click="toggle">
                                                <v-toolbar dense dark flat
                                                           :color="item.quality.color">
                                                    <v-icon left>mdi-cube</v-icon>
                                                    <v-toolbar-title>{{item.item.name + ' (' + item.quality.name +
                                                        ')'}}
                                                    </v-toolbar-title>
                                                    <v-spacer/>
                                                    <v-btn icon @click="sellItem(item)">
                                                        <v-icon>mdi-currency-usd</v-icon>
                                                    </v-btn>
                                                    <v-btn icon @click="item.weared = !item.weared">
                                                        <v-icon>{{item.weared ? 'mdi-tshirt-crew'
                                                            :'mdi-tshirt-crew-outline' }}
                                                        </v-icon>
                                                    </v-btn>
                                                    <v-btn icon @click="deleteItem(item)">
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-btn>
                                                </v-toolbar>
                                                <v-row>
                                                    <v-col cols="12" md="6">
                                                        <v-card class="ml-1 mr-5" outlined>
                                                            <v-card-subtitle class="py-0">Цена {{item.item.cost *
                                                                item.quality.modificator}}$
                                                            </v-card-subtitle>
                                                            <v-card-subtitle class="py-0">{{item.item.type}}
                                                            </v-card-subtitle>
                                                            <v-card-subtitle v-if="item.item.uses !== '-1'"
                                                                             class="py-0">Исп. {{item.item.uses}}
                                                            </v-card-subtitle>
                                                            <v-card-subtitle v-if="item.item.range >0" class="py-0">
                                                                Дальн. {{item.item.range}}
                                                            </v-card-subtitle>
                                                        </v-card>
                                                    </v-col>
                                                    <v-col cols="12" md="6">
                                                        <v-card-text v-if="item.item.MeleeDamage > 0">Урон (физич.) {{item.item.MeleeDamage}}</v-card-text>
                                                        <v-card-text v-if="item.item.MagicDamage > 0">Урон (магич.) {{item.item.MagicDamage}}</v-card-text>
                                                        <v-card-text v-if="item.item.RangeDamage > 0">Урон (дальн.) {{item.item.RangeDamage}}</v-card-text>
                                                        <v-card-text v-if="item.item.PhysicDef > 0">Защита (физич.) {{item.item.PhysicDef}}</v-card-text>
                                                        <v-card-text v-if="item.item.MagicDef > 0">Защита (магич.) {{item.item.MagicDef}}</v-card-text>
                                                        <v-card-text v-if="item.item.ElementsDef > 0">Защита (стихии) {{item.item.ElementsDef}}</v-card-text>
                                                        <v-card-text v-if="item.item.Strength > 0">Сила {{item.item.Strength}}</v-card-text>
                                                        <v-card-text v-if="item.item.Perception > 0">Восприятие {{item.item.Perception}}</v-card-text>
                                                        <v-card-text v-if="item.item.Endurance > 0">Выносливость {{item.item.Endurance}}</v-card-text>
                                                        <v-card-text v-if="item.item.Charisma > 0">Харизма {{item.item.Charisma}}</v-card-text>
                                                        <v-card-text v-if="item.item.Intelligence > 0">Интеллект {{item.item.Intelligence}}</v-card-text>
                                                        <v-card-text v-if="item.item.Agility > 0">Ловкость {{item.item.Agility}}</v-card-text>
                                                        <v-card-text v-if="item.item.Luck > 0">Удача {{item.item.Luck}}</v-card-text>
                                                    </v-col>
                                                    <v-col v-if="item.item.ammo && item.item.ammo.length > 0" cols="12">
                                                        <v-card-subtitle class="py-0">Аммуниция</v-card-subtitle>
                                                        <v-chip-group class="ml-4">
                                                            <v-chip v-for="ammo in item.item.ammo" :key="ammo">
                                                                {{ ammo }}
                                                            </v-chip>
                                                        </v-chip-group>
                                                    </v-col>
                                                    <p v-show="false">
                                                        name: "",
                                                        cost: 0,
                                                        type: "",
                                                        uses: 0,
                                                        range: 0,
                                                        ammo: [],
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
                                                    </p>

                                                </v-row>
                                            </v-card>
                                        </v-item>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-item-group>
                    </v-card>
                    <v-dialog v-model="invent" width="1000"/>
                </v-col>
                <v-col xs="12" sm="12" md="6">
                    <v-list-item-title class="text-center body-1">Перки и способности</v-list-item-title>
                    <v-list-item-title class="body-1">Доступно очков: {{player.points}}</v-list-item-title>
                    <v-list-item dense class="my-0 py-0">
                        <v-list-item-content class="my-0 py-0">
                            <v-col cols="5" class="my-0 py-0">
                                <v-list-item-title>Сила</v-list-item-title>
                            </v-col>
                            <v-col cols="6" class="my-0 py-0">
                                <v-card-actions>
                                    <v-btn icon>
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                    <v-list-item-title class="text-center">{{player.stats.Strength +
                                        player.race.Strength}}
                                    </v-list-item-title>
                                    <v-btn icon>
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-list-item-content>
                    </v-list-item>

                    <p>
                        {{ Object.keys(player.race)}}
                        Strength: 0,
                        Perception: 0,
                        Endurance: 0,
                        Charisma: 0,
                        Intelligence: 0,
                        Agility: 0,
                        Luck: 0

                        MagicDamage: 0,
                        MagicDef: 0,
                        MeleeDamage: 0,
                        PhysicDef: 0,
                        RangeDamage: 0,
                        ElementsDef: 0,
                    </p>

                    <v-card-actions class="mx-3"/>


                    <v-card class="mx-3" outlined>

                        <v-data-table
                                show-select
                                :items="gameData.perks"/>
                    </v-card>
                </v-col>
            </v-row>
            <v-divider/>
            <v-row style="height:300px"/>
            <v-row class="ma-0"/>
        </v-card>
    </v-container>
</template>

<script>
    import * as firebase from "firebase";

    export default {
        name: "player-profile",
        computed: {
            result_stats() {
                let p = this.player;
                let res = new Object({
                    MeleeDamage: p.stats.MeleeDamage + p.race.MeleeDamage,
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
                });
                return res;

            }
        },
        data() {
            return {
                invent: false,
                isEdit: false,
                player: {},
                gameData: {},
                addItemDialog: false,
                newItem: {
                    item: {},
                    quality: {},
                    weared: false,
                    count: 1
                }

            };
        },
        methods: {
            addItem() {
                let item = this.newItem;
                if (item.item && item.quality) {
                    this.player.items.push(item);
                    let profileID = this.$route.params.id;
                    firebase.firestore().collection('playerProfiles').doc(profileID).update({
                        items: firebase.firestore.FieldValue.arrayUnion(item)
                    }).then(() => {
                        this.addItemDialog = false;
                    });
                } else {
                    this.addItemDialog = false;
                }
            },
            updateItem(item) {
                let profileID = this.$route.params.id;
                firebase.firestore().collection('playerProfiles').doc(profileID).update({
                    items: firebase.firestore.FieldValue.arrayUnion(item)
                }).then(() => {
                    this.addItemDialog = false;
                });
            },
            sellItem(item) {
                let gold = this.player.gold + item.item.cost * item.quality.modificator;
                this.player.gold =  gold;
                this.deleteItem(item);
                let profileID = this.$route.params.id;
                firebase.firestore().collection('playerProfiles').doc(profileID).update({
                    gold:  this.player.gold
                });
            },
            deleteItem(item) {
                const index = this.player.items.indexOf(item);
                let profileID = this.$route.params.id;
                confirm("Точно выкинуть?") && this.player.items.splice(index, 1) && firebase.firestore().collection('playerProfiles').doc(profileID).update({
                    items: this.player.items
                })
            },
            saveProfile() {
                if (!this.isEdit) {
                    let profileID = this.$route.params.id;
                    let _this = this;
                    firebase.firestore().collection('playerProfiles').doc(profileID).set(this.player).then(() => {
                        _this.isEdit = true;
                    });
                } else {
                    this.isEdit = false;
                }
            }
        },
        created() {
            let profileID = this.$route.params.id;
            if (profileID) {
                firebase.firestore().collection('playerProfiles').doc(profileID).onSnapshot((doc) => {
                    this.player = doc.data() || {};
                });
                firebase.firestore().collection('gamerules').doc('main').onSnapshot((doc) => {
                    this.gameData = doc.data() || {};
                });
            }
        }
    };
</script>

<style lang="css" scoped>
</style>