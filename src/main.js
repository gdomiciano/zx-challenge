import Vue from 'vue';
import VueApollo from 'vue-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
// import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';
import { router } from './routes';
import App from './App.vue';

const apolloClient = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql',
        transportBatching: true,
    }),
    addTypename: true,
    // queryTransformer: addTypename,
    dataIdFromObject: r => r.id,
});

Vue.use(VueApollo, { apolloClient });

// eslint-disable-next-line
new Vue({
    el: '#app',
    router,
    apolloClient,
    template: '<app/>',
    components: { App },
});

