import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client';
// import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';
import * as VueMaps from 'vue2-google-maps';
import { router } from './routes';
import App from './App.vue';

// Apollo config
const networkInterface = createBatchingNetworkInterface({
    uri: 'https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql',
});

const apolloClient = new ApolloClient({
    networkInterface,
    connectToDevTools: true,
});

// Gmaps config
const mapsKey = 'AIzaSyBLuYH7k-mAr7Q6zwxkQ7USYHViUkIUPl8';

Vue.use(VueApollo);
Vue.use(VueMaps, {
    load: {
        key: mapsKey,
        libraries: 'places',
        // libraries: 'places,drawing,visualization',
    },

});

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
        $loadingKey: 'loading',
    },
});

// eslint-disable-next-line
new Vue({
    el: '#app',
    router,
    apolloProvider,
    render: h => h(App),
});

