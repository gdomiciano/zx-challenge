import Vue from 'vue';
import * as VueMaps from 'vue2-google-maps';
import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client';
import VueApollo from 'vue-apollo';
import { router } from './routes';
import App from './App.vue';

const apiUrl = 'https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql';
const mapsKey = 'AIzaSyBLuYH7k-mAr7Q6zwxkQ7USYHViUkIUPl8';

// Apollo config
const apolloClient = new ApolloClient({
    networkInterface: createBatchingNetworkInterface({
        uri: apiUrl,
    }),
    connectToDevTools: true,
});

Vue.use(VueApollo, {
    apolloClient,
});

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});

Vue.mixin({
    apolloProvider,
});

// Gmaps config
Vue.use(VueMaps, {
    load: {
        key: mapsKey,
        libraries: 'places',
    },
});

// eslint-disable-next-line
new Vue({
    el: '#app',
    router,
    apolloProvider,
    render: h => h(App),
});

