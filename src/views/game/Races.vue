<template>
    <v-data-table :headers="headers" :items="races" sort-by="calories" class="elevation-1 ma-3" @click:row="editItem($event)">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Расы</v-toolbar-title>
                <v-spacer/>
                <v-dialog v-model="dialog" max-width="900">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" text v-on="on">Новая раса</v-btn>
                    </template>
                    <v-card tile>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-text-field v-model="editedItem.name" label="Назвние"/>
                                <v-textarea auto-grow v-model="editedItem.description" label="Описание"/>
                                <v-row>
                                    <v-col cols="12" class="mb-0 pb-0"><p>Влияние на характеристики</p></v-col>
                                    <v-col cols="12" sm="6" md="4" lg="3">
                                        <v-text-field v-model="editedItem.Strength" label="Сила" type="number"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="3">
                                        <v-text-field v-model="editedItem.Perception" label="Восприятие" type="number"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="3">
                                        <v-text-field v-model="editedItem.Endurance" label="Выносливость"
                                                      type="number"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="3">
                                        <v-text-field v-model="editedItem.Charisma" label="Харизма" type="number"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="3">
                                        <v-text-field v-model="editedItem.Intelligence" label="Интеллект"
                                                      type="number"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="3">
                                        <v-text-field v-model="editedItem.Agility" label="Ловкость" type="number"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="3">
                                        <v-text-field v-model="editedItem.Luck" label="Удача" type="number"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="3">
                                        <v-text-field v-model="editedItem.MeleeDamage" label="Доп. урон (Ближн. оружие)"
                                                      type="number"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="3">
                                        <v-text-field v-model="editedItem.MagicDamage" label="Доп. урон (Магия)"
                                                      type="number"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="3">
                                        <v-text-field v-model="editedItem.RangeDamage" label="Доп. урон (Дальн. оружие)"
                                                      type="number"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="3">
                                        <v-text-field v-model="editedItem.PhysicDef" label="Доп. сопротивление (Физ)"
                                                      type="number"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="3">
                                        <v-text-field v-model="editedItem.ElementsDef"
                                                      label="Доп. сопротивление (Стихии)"
                                                      type="number"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="3">
                                        <v-text-field v-model="editedItem.MagicDef" label="Доп. сопротивление (Магия)"
                                                      type="number"/>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn color="blue darken-1" text @click="close">Отмена</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Сохранить</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon @click="deleteItem(item)" color="red">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="dialog = !dialog" text>Новая раса</v-btn>
        </template>
    </v-data-table>
</template>

<script>
    import * as firebase from "firebase";

    export default {
        name: "races",
        data: () => ({
            dialog: false,
            headers: [
                {text: "Название", align: "left", value: "name"},
                {text: "Описание", align: "left", value: "description"},
                {text: "Доп. урон (Ближн. оружие)", value: "MeleeDamage"},
                {text: "Доп. урон (Магия)", value: "MagicDamage"},
                {text: "Доп. урон (Дальн. оружие)", value: "RangeDamage"},
                {text: "Доп. сопротивление (Физ)", value: "PhysicDef"},
                {text: "Доп. сопротивление (Стихии)", value: "ElementsDef"},
                {text: "Доп. сопротивление (Магия)", value: "MagicDef"},
                {text: "СИЛА", value: "Strength"},
                {text: "ЛОВКОСТЬ", value: "Agility"},
                {text: "ИНТЕЛЛЕКТ", value: "Intelligence"},
                {text: "ВЫНОСЛИВОСТЬ", value: "Endurance"},
                {text: "ХАРИЗМА", value: "Charisma"},
                {text: "УДАЧА", value: "Luck"},
                {text: "ВОСПРИЯТИЕ", value: "Perception"},
                {text: "", value: "action", align: "right", sortable: false}
            ],
            races: [],
            editedIndex: -1,
            editedItem: {
                name: "",
                description: "",
                MeleeDamage: 0,
                MagicDamage: 0,
                RangeDamage: 0,
                PhysicDef: 0,
                MagicDef: 0,
                ElementsDef: 0,
                Strength: 10,
                Perception: 10,
                Endurance: 10,
                Charisma: 10,
                Intelligence:10,
                Agility: 10,
                Luck: 10
            },
            defaultItem: {
                name: "",
                description: "",
                MeleeDamage: 0,
                MagicDamage: 0,
                RangeDamage: 0,
                PhysicDef: 0,
                MagicDef: 0,
                ElementsDef: 0,
                Strength: 10,
                Perception: 10,
                Endurance: 10,
                Charisma: 10,
                Intelligence:10,
                Agility: 10,
                Luck: 10
            }
        }),
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? "Новая раса" : "Редактирование";
            }
        },
        watch: {
            dialog(val) {
                val || this.close();
            }
        },
        methods: {
            editItem(item) {
                this.editedIndex = this.races.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true;
            },
            deleteItem(item) {
                const index = this.races.indexOf(item);
                confirm("Точно удалить?") && this.races.splice(index, 1) && firebase.firestore().collection('gamerules').doc('main').update({
                    races: this.races
                });
            },
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                }, 300);
            },
            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.races[this.editedIndex], this.editedItem);
                } else {
                    this.races.push(this.editedItem);
                }
                firebase.firestore().collection('gamerules').doc('main').update({
                    races: this.races
                }).then(() => {
                        this.close();
                    }
                );

            }
        },
        created() {
            firebase.firestore().collection('gamerules').doc('main').onSnapshot((data) => {
                this.races = data.data().races || [];
            });
        }
    };
</script>