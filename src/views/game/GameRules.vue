<template>
    <v-container fluid>
        <v-card :loading="processing">
            <v-tabs v-model="tabs" background-color="transparent" right show-arrows>
                <v-tab>Предметы</v-tab>
                <v-tab>Перки</v-tab>
                <v-tab>Дополнительно</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tabs">
                <v-tab-item>
                    <items/>
                </v-tab-item>
                <v-tab-item>
                    <perks/>
                </v-tab-item>
                <v-tab-item class="pa-3">
                        <qualities/>
                        <item-types/>
                        <races/>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-container>
</template>

<script>
    import Items from "./Items.vue";
    import Perks from "./Perks.vue";
    import Qualities from "./Qualities.vue";
    import ItemTypes from "./ItemTypes.vue";
    import Races from "./Races.vue";

    export default {
        name: "game-rules",
        computed: {
            error() {
                return this.$store.getters.get_error;
            },
            processing() {
                return this.$store.getters.get_processing;
            },
            isAuth() {
                return this.$store.getters.get_isAuth;
            }
        },
        data() {
            return {
                tabs: null
            };
        },
        methods: {},
        components: {
            Items,
            Perks,
            Qualities,
            ItemTypes,
            Races
        },
        created() {
        }
    };
</script>

<style scoped>
</style>