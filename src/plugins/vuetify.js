import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import ru from 'vuetify/es5/locale/ru';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { ru },
        current: 'ru',
    },
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        themes: {
            light: {
                primary: colors.purple.darken1,
                secondary: colors.purple.darken2,
                accent: colors.purple.accent3
            }
        }
    }
});