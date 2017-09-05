<template>
    <div>
        <search @position="latLon(...arguments)" />
         <h4 v-if="loading">Loading...</h4>

         <ul v-if="pocSearch">
            <!-- <li v-for="place in pocSearch" :key="place.id">
            {{ place.status }}: {{ place.tradingName }}
            </li> -->
            <li>{{pocSearch}}</li>
        </ul>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import Search from '../components/search.vue';

export default {
    name: 'home',
    components: {
        Search,
    },
    data() {
        return {
            pocSearch: [],
            loading: 0,
            algorithm: 'NEAREST',
            lat: '-23.6315238',
            lng: '-46.7018196',
            now: (new Date()).toJSON().toString(),
        };
    },
    apollo: {
        pocSearch: {

            query: gql`query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
                pocSearch(algorithm: "NEAREST", lat: "-23.632919", long: "-46.699453", now: "2017-08-01T20:00:00.000Z") {
                    __typename
                    id
                    status
                    tradingName
                    deliveryTypes {
                        __typename
                        deliveryTypeId
                        active
                    }
                    address {
                        __typename
                        address1
                        address2
                        number
                        city
                        province
                        zip
                        coordinates
                    }
                }
            }`,
            variables: {
                algorithm: 'NEAREST',
                lat: '-23.6315238',
                long: '-46.7018196',
                now: (new Date()).toJSON().toString(),
            },
            operationName: 'pocSearchMethod',
        },
    },
    methods: {
        latLon(position) {
            this.lat = position.lat;
            // this.lng = position.lng;
            // console.log('hey', this.$apollo.queries.pocSearchMethod);
            this.$apollo.queries.pocSearchMethod = {
                options: {
                    variables: {
                        algorithm: this.algorithm,
                        now: this.now,
                        lat: this.lat,
                        lng: this.lng,
                    },
                },
            };
        },
    },
    created() {
        console.log(this.$apollo.queries.pocSearchMethod);
        // this.$apollo.queries.pocSearch.pocSearchMethod({
        //     // GraphQL document
        //     document: addressQuery,
        //     // Variables passed to the subscription
        //     variables: {
        //         lat: this.lat,
        //         lng: this.lng,
        //     },
        //     // // Mutate the previous result
        //     // updateQuery: (previousResult, { subscriptionData }) => {
        //     //     // Here, return the new result from the previous with the new data
        //     // },
        // });
    },
};

</script>

<style scoped lang="scss">

    *{
        color:white;
    }

</style>