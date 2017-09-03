import Vue from 'vue';
import { router } from './routes';
import App from './App.vue';

// eslint-disable-next-line
new Vue({
    el: '#app',
    router,
    template: '<app/>',
    components: { App },
});

