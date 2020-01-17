import Vue from 'vue';
export default {
    state: {
        games: [],
        rules: {},
        races: [],
        error: null
    },
    mutations: {
        set_game(state, game) {
            state.game = game;
        },
        set_error(state, err) {
            state.error = err;
        }
    },
    getters: {

    },
    actions: {
    }
}