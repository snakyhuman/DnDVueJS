<template>
    <v-data-table :headers="headers" :items="types" sort-by="calories" class="elevation-1 ma-3"  @click:row="editItem($event)">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Типы предметов</v-toolbar-title>
                <v-spacer/>
                <v-dialog v-model="dialog" max-width="900">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" text v-on="on">Новый тип предмета</v-btn>
                    </template>
                    <v-card tile>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-text-field v-model="editedItem.name" label="Назвние"/>
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
            <v-btn color="primary" @click="dialog = !dialog" text>Новый тип предмета</v-btn>
        </template>
    </v-data-table>
</template>

<script>
    import * as firebase from "firebase";

    export default {
        name: "item-types",
        data: () => ({
            dialog: false,
            headers: [
                {text: "Название", align: "left", value: "name"},
                {text: "", value: "action", align: "right", sortable: false}
            ],
            types: [],
            editedIndex: -1,
            editedItem: {
                name: "",
            },
            defaultItem: {
                name: "",
            }
        }),
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? "Новый тип предмета" : "Редактирование";
            }
        },
        watch: {
            dialog(val) {
                val || this.close();
            }
        },
        methods: {
            editItem(item) {
                this.editedIndex = this.types.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true;
            },
            deleteItem(item) {
                const index = this.types.indexOf(item);
                confirm("Точно удалить?") && this.types.splice(index, 1) && firebase.firestore().collection('gamerules').doc('main').update({
                    types: this.types
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
                    Object.assign(this.types[this.editedIndex], this.editedItem);
                } else {
                    this.types.push(this.editedItem);
                }
                firebase.firestore().collection('gamerules').doc('main').update({
                    types: this.types
                }).then(() => {
                        this.close();
                    }
                );

            }
        },
        created() {
            firebase.firestore().collection('gamerules').doc('main').onSnapshot((data) => {
                this.types = data.data().types || [];
            });
        }
    };
</script>