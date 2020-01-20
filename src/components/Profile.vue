<template>
    <v-container class="absolute" v-if="currentUser">
        <v-card :loading="processed">
            <v-row class="mt-7 mx-10 bg-light-gray" no-gutters>
                <v-col cols="12" md="3" offset-md="1" class="mr-10 mb-10">
                    <v-card flat max-width="250px" max-height="250px">
                        <v-img
                                :src="currentUser.photoURL ||'../assets/account_Placeholder.png'"
                                lazy-src="../assets/account_Placeholder.png"
                                height="250"
                                max-width="250px"
                                max-height="250px">
                        </v-img>
                    </v-card>
                </v-col>
                <v-col cols="12" md="5">
                    <v-text-field
                            label="Имя пользователя"
                            v-model="currentUser.displayName"
                            filled
                            color="grey lighten-1"
                    />
                    <v-text-field
                            label="Электронная почта"
                            v-model="currentUser.email"
                            filled
                            color="grey lighten-1"
                    />
                </v-col>
            </v-row>
            <v-card-actions>
                <v-spacer/>
                <v-btn text @click="updateProfile()">Обновить профиль</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import * as firebase from "firebase";

    export default {
        name: "profile",
        data: () => ({
            processed: false,
        }),
        computed: {
            currentUser() {
                return firebase.auth().currentUser;
            }
        },
        methods: {
            updateProfile() {
                this.processed = true;
                let usr = this.currentUser;
                firebase.auth().currentUser.updateProfile(usr).then(() => {
                    let user = firebase.auth().currentUser;
                    firebase.firestore().collection('users').doc(user.uid).update({
                      displayName: user.displayName,
                      email: user.email
                    }).finally(() => {
                        this.processed = false;
                    });
                })
            }
        }
    };
</script>

<style lang="css" scoped>
    .v-item-group {
        width: 100%;
    }
</style>
