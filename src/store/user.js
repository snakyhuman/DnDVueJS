import firebase from 'firebase';
export default {
    state: {
        currentUser: {
            isAuth: false,
            uid: null,
            user: {}
        }
    },
    mutations: {
        set_user(state, user) {
            state.currentUser = {
                isAuth: true,
                uid: user.uid,
                user: user
            }

        },
        clear_user(state) {
            state.currentUser = {
                isAuth: false,
                uid: null,
                user: {}
            }
        },

    },
    actions: {
        signUp({
            commit
        }, user) {
            commit('set_processing', true);
            commit('clear_error');
            firebase.auth().useDeviceLanguage();
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(() => {
                    commit('set_processing', false);
                })
                .catch(function(error) {
                    commit('set_processing', false);
                    commit('set_error', error.message);
                });
        },
        signIn({
            commit
        }, user) {
            commit('set_processing', true);
            commit('clear_error');
            firebase.auth().useDeviceLanguage();
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(() => {
                    commit('set_processing', false);
                })
                .catch(function(error) {
                    commit('set_processing', false);
                    commit('set_error', error.message);
                });
        },
        googleSignIn({
            commit
        }) {
            commit('set_processing', true);
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().useDeviceLanguage();
            firebase.auth().signInWithPopup(provider).then(function() {
                commit('set_processing', false);
            }).catch(function(error) {
                commit('set_processing', false);
                commit('set_error', error.message);
            });

        },
        stateChanged({
            commit
        }, user) {
            if (user) {
                commit('set_user', user);
            } else {
                commit('clear_user')
            }
        },
        signOut() {
            firebase.auth().signOut();
        },
        //logic for roles, games and etc
        async changeUserData({ commit }, user) {
            let db = this.state.getters.get_db;
            let userRef = await db.collection("user").doc(this.state.currentUser.uid);
            commit('set_user', user);
        }
    },
    getters: {
        get_isAuth: (state) => state.currentUser.isAuth,
        get_currentUser: (state) => state.currentUser.user,
        get_isAdmin: (state) => {
            if (state.currentUser.user.isAdmin)
                return true;
            else
                return false;
        }
    }
}