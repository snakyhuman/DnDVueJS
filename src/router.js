import Vue from 'vue'
import Router from 'vue-router'
import GameMaser from './views/GameMaster.vue';
import GamePlayerProfile from './views/game/GamePlayerProfile.vue';
import GameAdmin from './views/game/GameAdmin.vue';
import GameRules from './views/game/GameRules.vue';
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/game',
            name: 'gamemaster',
            component: GameMaser
        },
        {
            path: '/profile/:id',
            name: 'profile',
            component: GamePlayerProfile
        },
        {
            path: '/admin/:id',
            name: 'admin',
            component: GameAdmin
        },
        {
            path: '/game-rules',
            name: 'game-rules',
            component: GameRules
        },
        {
          path: '*',
          redirect: GameMaser
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/About.vue')
        }
    ],
    mode: 'history'
})