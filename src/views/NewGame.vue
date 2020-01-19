<template>
    <v-card :loading="processing">
        <v-container>
            <v-card-title primary-title class="mb-0 pb-0">Новая игра</v-card-title>
            <v-subheader class="mt-0 pt-0">Зарегистрировать новую партию</v-subheader>
            <v-row>
                <v-col cols="12" xs="12" sm="6" lg="6">
                    <v-card @click="$refs.file.click()">
                        <input @change="imageChanged" accept="image/png, image/jpeg, image/bmp" type="file" ref="file"
                               style="visibility: hidden" class="v-btn--absolute"/>
                        <v-img
                                :src="imageURL"
                                class="white--text align-end mb-3"
                                lazy-src="../assets/imagePlaceholder.jpg"
                                gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.8)"
                                height="250"
                        >
                        </v-img>
                        <v-progress-linear striped absolute bottom v-show="uploading > 0" height="25"
                                           :value="uploading"/>
                    </v-card>
                    <v-text-field
                            label="Название"
                            v-model="newGame.name"
                            placeholder="Новая партия"
                            filled
                            rounded
                            clearable
                    />
                    <v-row>
                        <!-- Date picker -->
                        <v-col cols="12" xs="12" sm="6" lg="6">
                            <v-dialog
                                    ref="dateDialog"
                                    v-model="dateModal"
                                    :return-value.sync="date"
                                    persistent
                                    width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                            v-model="date"
                                            label="Дата мероприятия"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-on="on"
                                    />
                                </template>
                                <v-date-picker v-model="date" scrollable locale="ru-ru">
                                    <v-spacer/>
                                    <v-btn text color="primary" @click="dateModal = false">Отмена</v-btn>
                                    <v-btn text color="primary" @click="$refs.dateDialog.save(date)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>

                        <!-- Time picker -->
                        <v-col cols="12" xs="12" sm="6" lg="6">
                            <v-dialog
                                    ref="timeDialog"
                                    v-model="timeModal"
                                    :return-value.sync="time"
                                    persistent
                                    width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                            v-model="time"
                                            label="Время мероприятия"
                                            prepend-icon="mdi-clock-outline"
                                            readonly
                                            v-on="on"
                                    />
                                </template>
                                <v-time-picker
                                        v-if="timeModal"
                                        v-model="time"
                                        full-width
                                        ampm-in-title
                                        locale="ru-ru"
                                >
                                    <v-spacer/>
                                    <v-btn text color="primary" @click="timeModal = false">Отмена</v-btn>
                                    <v-btn text color="primary" @click="$refs.timeDialog.save(time)">OK</v-btn>
                                </v-time-picker>
                            </v-dialog>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" xs="12" sm="6" lg="6">
                    <v-textarea
                            v-model="newGame.description"
                            auto-grow
                            filled
                            rounded
                            clearable
                            color="deep-purple"
                            label="Описание"
                            rows="1"
                    />
                    <v-col cols="12" xs="12" sm="6" lg="6">
                        <v-switch v-model="newGame.invites" inset label="Только по приглашениям"/>
                    </v-col>
                    <v-col cols="12">
                        <v-subheader class="mb-6 mt-0 pl-0 mx-4">Максимальное количество игроков</v-subheader>
                        <v-slider
                                class="mx-1"
                                v-model="newGame.maxPlayers"
                                thumb-label="always"
                                th
                                max="20"
                                min="2"
                        />
                    </v-col>
                </v-col>

                <v-spacer/>
                <v-card-actions>
                    <v-btn @click="createGame()">Создать партию</v-btn>
                    <v-btn @click.stop="closeDialog">Отмена</v-btn>
                </v-card-actions>
            </v-row>
            <v-snackbar v-model="alert" top vertical :color="isError ? 'error' : 'success'">
                {{ alertText }}
                <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
            </v-snackbar>
        </v-container>
    </v-card>
</template>

<script>
    // import Vue from "vue";
    import * as firebase from "firebase";
    // import Vue from "vue";
    export default {
        name: "new-game",
        data() {
            return {
                newGame: {
                    description: "Партия настольной игры. Печеньки прилагаются",
                    eventDate: null,
                    image: "",
                    invites: false,
                    master: null,
                    maxPlayers: 4,
                    trade: {
                        trademod: false,
                        items: [],
                        modificatorBuy: 1,
                        modificatorSell: 1
                    },
                    enemies: [],
                    messages: [],
                    name: "Новая партия",
                    players: []
                },
                alert: false,
                isError: false,
                alertText: "",
                image: null,
                processing: false,
                date: new Date().toISOString().substr(0, 10),
                time: new Date().toISOString().substr(11, 5),
                dateModal: false,
                timeModal: false,
                uploading: 0
            };
        },
        methods: {
            imageChanged(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.image = files[0];
            },
            closeDialog() {
                this.$emit("closeDialog");
            },
            createGame() {
                this.processing = true;
                const _this = this;
                // ref.child('games/'+this.image.name).put(this.image)
                firebase
                    .firestore()
                    .collection("games/")
                    .add(this.newGame)
                    .then(data => {
                        if (this.image) {
                            const upload = firebase
                                .storage()
                                .ref("games/" + this.image.name)
                                .put(this.image);
                            upload.on(
                                firebase.storage.TaskEvent.STATE_CHANGED,
                                function (snapshot) {
                                    _this.uploading = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    switch (snapshot.state) {
                                        case firebase.storage.TaskState.PAUSED:
                                            break;
                                        case firebase.storage.TaskState.RUNNING:
                                            break;
                                    }
                                },
                                function (error) {
                                    _this.alertText = error.toString();
                                    _this.isError = true;
                                    _this.alert = true;
                                    _this.processing = false;
                                },
                                function () {
                                    //uploading finished correct
                                    upload.snapshot.ref.getDownloadURL().then(function (url) {
                                        data.update({image: url}).then(() => {

                                            _this.alertText = "Изображение добавлено:" + url;
                                            _this.isError = false;
                                            _this.alert = true;
                                            _this.processing = false;
                                            _this.$emit("closeDialog");
                                        });
                                    });
                                }
                            ).bind(this);
                        } else {
                            this.processing = false;
                            this.alertText = "Игра успешно добвалена!";
                            this.isError = false;
                            this.alert = true;
                            this.$emit("closeDialog");
                        }
                    })
                    .catch(err => {
                        this.processing = false;
                        this.alertText = err;
                        this.isError = true;
                        this.alert = true;
                    });
            }
        },
        computed: {
            currentUser() {
                return this.$store.getters.get_currentUser.uid;
            },
            eventDate() {
                let date = new Date(this.date + "T" + this.time);
                return firebase.firestore.Timestamp.fromDate(date);
            },
            imageURL() {
                if (this.image) {
                    return URL.createObjectURL(this.image);
                } else return "";
            }
        },
        watch: {
            eventDate(val) {
                this.newGame.eventDate = val;
            }
        },
        created() {
            let ref = firebase.firestore().doc("/users/" + this.currentUser);
            if (!ref && firebase.auth().currentUser) {
                let usr = firebase.auth().currentUser;
                ref = firebase.firestore().collection('users').doc(usr.uid).add(usr).then((user) => {
                        ref = user;
                    }
                );
            }
            this.newGame.master = ref;
            this.newGame.eventDate = this.eventDate;
        }
    };
</script>

<style lang="css">
    .new-game--image {
        border-radius: 28px;
        display: inline-block;
        font-size: 17px;
        padding: 14px 60px;
        text-decoration: none;
    }
</style>