<template>
    <v-data-table :headers="headers" :items="items" sort-by="calories" class="elevation-1">
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
                                    <v-col cols="12" md="6" lg="3">
                                        <v-text-field :counter="30" label="Название предмета" required/>
                                    </v-col>
                                    <v-col cols="12" md="6" lg="3">
                                        <v-select :items="['aaaa','bbbb','cccc']" label="Тип предмета"/>
                                    </v-col>
                                    <v-col cols="12" md="6" lg="3">
                                        <v-text-field :counter="30" label="Цена предмета" required
                                                      type="number"/>
                                    </v-col>
                                    <v-col cols="12" md="6" lg="3">
                                        <v-text-field
                                                :counter="30"
                                                label="Количество использований"
                                                required
                                                type="number"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="6" lg="4">
                                        <v-text-field :counter="30" label="Урон" required type="number"/>
                                    </v-col>
                                    <v-col cols="12" md="6" lg="4">
                                        <v-text-field :counter="30" label="Радиус" required
                                                      type="number"/>
                                    </v-col>
                                    <v-col cols="12" md="6" lg="4">
                                        <v-select :items="['aaaa','bbbb','cccc']"
                                                  label="Патроны(расходники)"/>
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
            <v-btn color="primary" @click="dialog = !dialog" text>Создать предмет</v-btn>
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
                {text: "Название", sortable: false, value: "name"},
                {text: "Цена", value: "cost"},
                {text: "Тип предмета", value: "type"},
                {text: "Урон", value: "damage"},
                {text: "Кол-во использований", value: "uses"},
                {text: "Радиус", value: "range"},
                {text: "Патроны", value: "ammo"},
                {text: "", value: "action", sortable: false}
            ],
            items: [],
            itemTypes:[],
            editedIndex: -1,
            editedItem: {
                name: "",
                cost: 0,
                type: "",
                damage: 0,
                uses: 0,
                range: 0,
                ammo: ""
            },
            defaultItem: {
                name: "",
                cost: 0,
                type: "",
                damage: 0,
                uses: 0,
                range: 0,
                ammo: ""
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
                this.desserts.splice(index, 1);
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
                this.close();
            }
        },
        created() {
            firebase.firestore().collection('gamerules').doc('main').onSnapshot((data) => {
                this.items = data.data().items;
                this.itemTypes = data.data().types;
            });
        }
    };
</script>