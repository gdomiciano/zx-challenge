<template>
    <div>
        <search @position='latLon(...arguments)' />
         <h4 v-if='loading'>Loading...</h4>

         <ul v-if='search'>
             <li v-for='place in pocSearch' :key='place.id'>
            {{ place.status }}: {{ place.tradingName }},
            </li>
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
            pocSearch: [
                {
                    id: '31',
                    status: 'AVAILABLE',
                    tradingName: 'PIT STOP JOÃO DIAS',
                    deliveryTypes: [
                        {
                            deliveryTypeId: '22',
                            active: true,
                        },
                        {
                            deliveryTypeId: '23',
                            active: true,
                        },
                        {
                            deliveryTypeId: '24',
                            active: true,
                        },
                    ],
                    address: {
                        address1: 'Rua Alexandria',
                        number: '33',
                        coordinates: '{type:Point, coordinates:[-46.733113,-23.641724]}',
                    },
                },
                {
                    id: '32',
                    status: 'AVAILABLE',
                    tradingName: 'EAB Representação Comercial',
                    deliveryTypes: [
                        {
                            deliveryTypeId: '22',
                            active: true,
                        },
                        {
                            deliveryTypeId: '23',
                            active: true,
                        },
                        {
                            deliveryTypeId: '24',
                            active: true,
                        },
                    ],
                    address: {
                        address1: 'Rua Alexandria',
                        number: '33',
                        coordinates: '{type:Point, coordinates:[-46.66771,-23.659362]}',
                    },
                },
                {
                    id: '30',
                    status: 'AVAILABLE',
                    tradingName: 'Adega Magnislux - Pinheiros',
                    deliveryTypes: [
                        {
                            deliveryTypeId: '22',
                            active: true,
                        },
                        {
                            deliveryTypeId: '23',
                            active: true,
                        },
                        {
                            deliveryTypeId: '24',
                            active: true,
                        },
                    ],
                    address: {
                        address1: 'Rua Alexandria',
                        number: '33',
                        coordinates: '{type:Point, coordinates:[-46.689537,-23.560505]}',
                    },
                },
            ],
            loading: 0,
            algorithm: 'NEAREST',
            lat: '',
            lng: '',
            now: (new Date()).toJSON().toString(),
            search: false,
        };
    },
    apollo: {
        pocSearch: {
            query: gql`query pocSearch($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
                pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) {
                    id
                    status
                    tradingName
                    deliveryTypes {
                        deliveryTypeId
                        active
                    }
                    address {
                        address1
                        number
                        coordinates
                    }
                }
            }`,
            variables: {
                algorithm: this.algorithm,
                lat: this.lat,
                long: this.lng,
                now: this.now,
            },
        },
    },
    methods: {
        latLon(position) {
            this.lat = position.lat;
            console.log(position);
            return this.$apollo.queries.pocSearch;
        },
    },
};

</script>

<style scoped lang='scss'>

    *{
        color: red;
    }

</style>