import Vue from 'vue';
export default {
    state: {
        game: {},
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
    actions: {
        get_rules({ commit }) {
            commit('set_processing', true);
            let db = Vue.$db.doc('gamerules/main');
            let items = [];
            db.collection('items').get().then((d) => {
                d.forEach(e => {
                    items.push(e.data());
                });
            }).catch((err) => {
                commit('set_error', err);
            });
            let game = {
                items: items
            }
            commit('set_game', game);
            commit('set_processing', false);
        },
        add_item({ commit }) {
            commit('set_processing', true);
            let db = Vue.$db.doc('gamerules/main');
            db.collection('items').add({
                a: {
                    v: "aaa",
                    d: {
                        sdas: false
                    }
                },
                vbd: 111
            }).then().catch((err) => {
                commit('set_error', err);
            });
            commit('set_processing', false);

        }
    },
    getters: {

    }
}