<template>
    <div class="home-page">
        <div :class="['overlay', {'half': halfSize}]">
            <welcome v-if="!halfSize" />
            <div class="field-row">
                <label class="field-label">First, tell us your location:</label>
                <gmap-autocomplete class="address-field" @place_changed="setPlace" @focus="halfSize = false"></gmap-autocomplete>
                <button class="btn-find" @click="usePlace">Find Stores</button>
            </div>
        </div>
        <bg-map :place="place" :zoom="zoom" :markers="markers" :position="position"/>

         <h4 v-if='loading'>Loading...</h4>

         <ul v-if='halfSize'>
             <li v-for='place in pocSearch' :key='place.id'>
            {{ place.status }}: {{ place.tradingName }},
            </li>
        </ul>
    </div>
</template>

<script>
import gql from 'graphql-tag';

import Welcome from '../components/welcome.vue';
import BgMap from '../components/bg-map.vue';

export default {
    name: 'home',
    components: {
        // Search,
        Welcome,
        BgMap,
    },
    data() {
        return {
            algorithm: 'NEAREST',
            hasMap: true,
            halfSize: false,
            loading: 0,
            place: null,
            position: {
                lat: -23.6821592,
                lng: -46.8761698,
            },
            markers: [],
            zoom: 7,
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
                now: (new Date()).toJSON().toString(),
            },
        },
    },
    methods: {
        getPlaces() {
            this.$apollo.queries.pocSearch.fetchMore({
                // New variables
                variables: {
                    algorithm: this.algorithm,
                    lat: this.lat.toString(),
                    long: this.lng.toString(),
                    now: (new Date()).toJSON().toString(),
                },
                // Transform the previous result with new data
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    const newLocation = fetchMoreResult.pocSearch;
                    console.log('up', previousResult, fetchMoreResult);
                    return {
                        pocSearch: [...previousResult.pocSearch, ...newLocation],
                    };
                },
            });
            this.search = !this.search;
        },
        setPlace(place) {
            this.place = place;
            this.halfSize = true;
            this.usePlace();
        },
        usePlace() {
            if (this.place) {
                const position = {
                    lat: this.place.geometry.location.lat(),
                    lng: this.place.geometry.location.lng(),
                };
                this.markers.push({ position });
                this.zoom = 12;
                this.position = position;
                this.place = null;
            }
        },
        // addPlacesMap(pocSearch){

        // }
    },
};

</script>

<style scoped lang="scss">
    @import '../assets/scss/colors';

    .home-page {
        width: 100%;
        margin: 50px auto;
        position: relative;
        overflow: hidden;
    }
    // I'm not proud of it.
    .overlay {
        background: rgba(color($black), .75);
        color: color($grey, 50);
        left: 0;
        padding: 20px;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;

        &.half {
            height: 30%;

            .field-row {
                margin: 30px auto;
            }
        }
    }
    .field-row {
        width: 90%;
        margin: 0px auto;
    }
    .field-label{
        font-size: 20px;
    }
    .address-field {
        border: black groove 3px;
        border-radius: 5px;
        display: block;
        font-size: 18px;
        height: 50px;
        padding: 10px;
        width: 100%;
    }
    .btn-find {
        display: none;
    }
    .btn-find:hover {
        background: color($orange, 600);
    }

    @media screen and (min-width: 768px) {

        .field-row {
            width: 70%;
        }

        .address-field {
            display: inline-block;
            width: 78%;
        }
        .btn-find {
            background: color($orange, 400);
            border: none;
            border-radius:5px;
            display: inline-block;
            font-size: 18px;
            line-height: 46px;
            width: 20%;
        }
    }
</style>
