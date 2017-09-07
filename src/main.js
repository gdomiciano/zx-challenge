import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import * as VueMaps from 'vue2-google-maps';

import App from './App.vue';
import { router } from './routes';

const apiUrl = 'https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql';
const mapsKey = 'AIzaSyBLuYH7k-mAr7Q6zwxkQ7USYHViUkIUPl8';

// Apollo config
const networkInterface = createBatchingNetworkInterface({
    uri: apiUrl,
});

const apolloClient = new ApolloClient({
    networkInterface,
    connectToDevTools: true,
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
        $loadingKey: 'loading',
    },
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
    apolloProvider,
    router,
    render: h => h(App),
});

