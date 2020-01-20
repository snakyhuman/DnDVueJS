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
import 'firebase/firestore';
Vue.use(Vuetify);
Vue.config.productionTip = false;
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
    created() {
        firebase.auth().onAuthStateChanged(function(user) {
            store.dispatch('stateChanged', user);
        });
    },
    mounted() {},

}).$mount('#app')