import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import firebaseConfig from './plugins/firebase';
import firebase from 'firebase';

Vue.use(Vuetify)
Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
    created() {
        firebase.auth().onAuthStateChanged(function(user) {
            store.dispatch('stateChanged', user);
        });
        store.dispatch('initDB');
    },
    mounted() {},

}).$mount('#app')