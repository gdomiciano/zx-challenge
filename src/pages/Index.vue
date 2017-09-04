<template>
    <div>
        <search @position="latLon(...arguments)" />
         <h4 v-if="loading">Loading...</h4>

         <ul v-if="pocSearch">
            <li v-for="place in pocSearch" :key="place.id">
            {{ place.status }}: {{ place.tradingName }}
            </li>
        </ul>
    </div>
</template>

<script>
    import gql from 'graphql-tag';
    import Search from '../components/search.vue';

    const algorithm = 'NEAREST';
    const now = (new Date()).toJSON().toString();

    // 464
    const addressQuery = gql`
        query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
            pocSearch(now: "${now}", algorithm: "${algorithm}", lat: "${this.lat}", long: "${this.lng}") {
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
        }

    `;

    export default {
        components: {
            Search,
        },
        data() {
            return {
                pocSearch: [
                    {
                        __typename: 'POC',
                        id: '880',
                        status: 'AVAILABLE',
                        tradingName: 'PIT STOP JOÃO DIAS',
                        deliveryTypes: [
                            {
                                __typename: 'POCDeliveryType',
                                deliveryTypeId: '464',
                                title: 'RECEBER',
                                active: true,
                            },
                            {
                                __typename: 'POCDeliveryType',
                                deliveryTypeId: '465',
                                title: 'AGENDAR',
                                active: true,
                            },
                            {
                                __typename: 'POCDeliveryType',
                                deliveryTypeId: '466',
                                title: 'RETIRAR',
                                active: true,
                            },
                        ],
                        address: {
                            __typename: 'POCAddress',
                            address1: 'Rua Alexandria',
                            address2: 'Point',
                            number: '33',
                            city: 'Osasco',
                            province: 'SP',
                            zip: '01415001',
                            coordinates: '{"type":"Point","coordinates":[-46.733113,-23.641724]}',
                        },
                        phone: {
                            __typename: 'POCPhone',
                            phoneNumber: '(11) 3456-3546',
                        },
                    },
                    {
                        __typename: 'POC',
                        id: '881',
                        status: 'AVAILABLE',
                        tradingName: 'EAB Representação Comercial',
                        deliveryTypes: [
                            {
                                __typename: 'POCDeliveryType',
                                deliveryTypeId: '464',
                                title: 'RECEBER',
                                active: true,
                            },
                            {
                                __typename: 'POCDeliveryType',
                                deliveryTypeId: '465',
                                title: 'AGENDAR',
                                active: true,
                            },
                            {
                                __typename: 'POCDeliveryType',
                                deliveryTypeId: '466',
                                title: 'RETIRAR',
                                active: true,
                            },
                        ],
                        address: {
                            __typename: 'POCAddress',
                            address1: 'Rua Alexandria',
                            address2: 'Point',
                            number: '33',
                            city: 'Osasco',
                            province: 'SP',
                            zip: '01415001',
                            coordinates: '{"type":"Point","coordinates":[-46.66771,-23.659362]}',
                        },
                        phone: {
                            __typename: 'POCPhone',
                            phoneNumber: '(11) 3456-3546',
                        },
                    },
                    {
                        __typename: 'POC',
                        id: '879',
                        status: 'AVAILABLE',
                        tradingName: 'Adega Magnislux - Pinheiros',
                        deliveryTypes: [
                            {
                                __typename: 'POCDeliveryType',
                                deliveryTypeId: '464',
                                title: 'RECEBER',
                                active: true,
                            },
                            {
                                __typename: 'POCDeliveryType',
                                deliveryTypeId: '465',
                                title: 'AGENDAR',
                                active: true,
                            },
                            {
                                __typename: 'POCDeliveryType',
                                deliveryTypeId: '466',
                                title: 'RETIRAR',
                                active: true,
                            },
                        ],
                        address: {
                            __typename: 'POCAddress',
                            address1: 'Rua Alexandria',
                            address2: 'Point',
                            number: '33',
                            city: 'Osasco',
                            province: 'SP',
                            zip: '01415001',
                            coordinates: '{"type":"Point","coordinates":[-46.689537,-23.560505]}',
                        },
                        phone: {
                            __typename: 'POCPhone',
                            phoneNumber: '(11) 3456-3546',
                        },
                    },
                ],
                loading: 0,
                lat: '-23.6315238',
                lng: '-46.7018196',
            };
        },
        methods: {
            latLon(position) {
                this.lat = position.lat;
                this.lng = position.lng;
            },
        },
        apollo: {
            pocSearch() {
                return {
                    query: addressQuery,
                    loadingKey: 'loading',
                    variables() {
                        return {
                            lat: this.lat,
                            lng: this.lng,
                        };
                    },
                };
            },
        },
    };
</script>

<style scoped lang="scss">

    *{
        color:white;
    }

</style>