<template>
    <v-data-table :headers="headers" :items="items" sort-by="calories" class="elevation-1"  @click:row="editItem($event)">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Предметы</v-toolbar-title>
                <v-spacer/>
                <v-dialog v-model="dialog" max-width="900">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" text v-on="on">Новый предмет</v-btn>
                    </template>
                    <v-card tile>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12"><p>Основные характеристики</p></v-col>
                                    <v-col cols="12" md="6" lg="3">
                                        <v-text-field v-model="editedItem.name" :counter="30" label="Название предмета"
                                                      required/>
                                    </v-col>
                                    <v-col cols="12" md="6" lg="3">
                                        <v-select v-model="editedItem.type" :items="itemTypes" label="Тип предмета"/>
                                    </v-col>
                                    <v-col cols="12" md="6" lg="3">
                                        <v-text-field v-model="editedItem.cost" label="Цена предмета"
                                                      required
                                                      type="number"/>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-card-subtitle class="ml-0 pl-0">Поставьте &lt; 0 для неограниченного использования</v-card-subtitle>
                                        <v-text-field
                                                style="width: 200px"
                                                v-model="editedItem.uses"
                                                label="Количество использований"
                                                required
                                                type="number"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <p>Свойства оружия</p>
                                    </v-col>
                                    <v-col cols="12" md="6" lg="4">
                                        <v-text-field v-model="editedItem.range" label="Радиус" required
                                                      type="number"/>
                                    </v-col>
                                    <v-col cols="12" md="6" lg="4">
                                        <v-select v-model="editedItem.ammo" multiple chips item-text="name" :items="items"
                                                  label="Патроны(расходники)"/>
                                    </v-col>
                                </v-row>
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
        <template v-slot:item.action="{ item }" @click="editItem(item)">
            <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon @click="deleteItem(item)" color="red">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="dialog = !dialog" text>Новый предмет</v-btn>
        </template>
    </v-data-table>
</template>

<script>
    import * as firebase from "firebase";

    export default {
        name: "items",
        data: () => ({
            dialog: false,
            headers: [
                {text: "Название", value: "name"},
                {text: "Цена", value: "cost"},
                {text: "Тип предмета", value: "type"},
                {text: "Кол-во использований", value: "uses"},
                {text: "Радиус", value: "range"},
                {text: "Патроны", value: "ammo"},
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
            items: [],
            itemTypes: [],
            editedIndex: -1,
            editedItem: {
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
            },
            defaultItem: {
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
                ElementsDef: 0,
                Strength: 0,
                Perception: 0,
                MagicDef: 0,
                Endurance: 0,
                Charisma: 0,
                Intelligence: 0,
                Agility: 0,
                Luck: 0
            }
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? "Новый предмет" : "Редактирование";
            }
        },

        watch: {
            dialog(val) {
                val || this.close();
            }
        },
        methods: {
            editItem(item) {
                this.editedIndex = this.items.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true;
            },

            deleteItem(item) {
                const index = this.item.indexOf(item);
                confirm("Точно удалить?") &&
                this.items.splice(index, 1) && this.qualities.splice(index, 1) && firebase.firestore().collection('gamerules').doc('main').update({
                    items: this.items
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
                    Object.assign(this.items[this.editedIndex], this.editedItem);
                } else {
                    this.items.push(this.editedItem);
                }
                firebase.firestore().collection('gamerules').doc('main').update({
                    items: this.items
                }).then(() => {
                        this.close();
                    }
                );
            }
        },
        created() {
            firebase.firestore().collection('gamerules').doc('main').onSnapshot((data) => {
                this.items = data.data().items || [];
                this.itemTypes = [];
                data && data.data().types.forEach((i) => {
                    this.itemTypes.push(i.name);
                });
            });
        }
    };
</script>