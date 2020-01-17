<template>
    <v-data-table :headers="headers" :items="qualities" sort-by="calories" class="elevation-1 ma-3">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Качество предметов</v-toolbar-title>
                <v-spacer/>
                <v-dialog v-model="dialog" max-width="900">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" text v-on="on">Новое качество</v-btn>
                    </template>
                    <v-card tile>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-text-field v-model="editedItem.name" label="Назвние"/>
                                <v-text-field v-model="editedItem.modificator" label="Модификатор" type="number"/>
                                <v-row>
                                    <v-col>
                                        <p>Цвет</p>
                                    </v-col>
                                    <v-col>
                                        <v-color-picker hide-inputs hide-mode-switch v-model="editedItem.color"/>
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
            <v-btn color="primary" @click="dialog = !dialog" text>Новое качество</v-btn>
        </template>
        <template v-slot:item.color="{ item }">
            <v-chip :color="item.color" dark>{{ item.color }}</v-chip>
        </template>
    </v-data-table>
</template>

<script>
    import * as firebase from "firebase";

    export default {
        name: "qualities",
        data: () => ({
            dialog: false,
            headers: [
                {text: "Название", align: "left", value: "name"},
                {text: "Модификатор", value: "modificator"},
                {text: "Цвет", value: "color"},
                {text: "", value: "action", align: "right", sortable: false}
            ],
            qualities: [],
            editedIndex: -1,
            editedItem: {
                name: "",
                modificator: 0,
                color: ""
            },
            defaultItem: {
                name: "",
                modificator: 0,
                color: ""
            }
        }),
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? "Новое качество предмета" : "Редактирование";
            }
        },
        watch: {
            dialog(val) {
                val || this.close();
            }
        },
        methods: {
            editItem(item) {
                this.editedIndex = this.qualities.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true;
            },
            deleteItem(item) {
                const index = this.qualities.indexOf(item);
                confirm("Точно удалить?") && this.qualities.splice(index, 1) && firebase.firestore().collection('gamerules').doc('main').update({
                    qualities: this.qualities
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
                    Object.assign(this.qualities[this.editedIndex], this.editedItem);
                } else {
                    this.qualities.push(this.editedItem);
                }
                firebase.firestore().collection('gamerules').doc('main').update({
                    qualities: this.qualities
                }).then(() => {
                        this.close();
                    }
                );
            }
        },
        created() {
            firebase.firestore().collection('gamerules').doc('main').onSnapshot((data) => {
                this.qualities = data.data().qualities || [];
            });
        }
    };
</script>