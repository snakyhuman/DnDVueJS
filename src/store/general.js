import firebase from 'firebase';
export default {
    state: {
        processing: false,
        error: null,
        db: null
    },
    mutations: {
        set_processing(state, payload) {
            state.processing = payload;
        },
        set_error(state, payload) {
            state.error = payload;
        },
        clear_error(state) {
            state.error = null;
        },
        set_db(state) {
            state.db = firebase.firestore();
        }
    },
    getters: {
        get_processing: (state) => state.processing,
        get_error: (state) => state.error,
        get_db: (state) => state.db
    },
    actions: {
        initDB({ commit }) {
            commit('set_db');
        }
    }
}