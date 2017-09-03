import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../pages/Index';
import Results from '../pages/Results';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '',
            component: Index,
        },
        {
            path: '/results',
            name: 'Results',
            component: Results,
        },
    ],
});
