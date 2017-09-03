<template>
    <div>
        <router-link to="/results">huhuhu</router-link>
        <div class="autocomplete">
            <label>
            AutoComplete
            <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
            <button @click="usePlace">Add</button>
            </label>
            <br/>
            <Gmap-Map style="width: 600px; height: 300px;" :zoom="1" :center="{lat: 0, lng: 0}">
                <Gmap-Marker v-for="(marker, index) in markers" :key="index" :position="marker.position" ></Gmap-Marker>
                <Gmap-Marker v-if="this.place" label="&#x2605;" :position="{ lat: this.place.geometry.location.lat(), lng: this.place.geometry.location.lng(),}"></Gmap-Marker>
            </Gmap-Map>
            <!-- {{latLng.lat}},
            {{latLng.lng}} -->
            @-23.6315238,-46.7040137
        </div>
    </div>
</template>

<script>
    // import gql from 'graphql-tag';

    // const addressQuery = gql `
    //     query pocSearch (algorithm: 'NEAREST', lat: '', lon: '', now:new Date()){
    //         id
    //     }
    // `;
    export default {
        data() {
            return {
                markers: [],
                place: null,
            };
        },
        methods: {
            setDescription(description) {
                this.description = description;
            },
            setPlace(place) {
                this.place = place;
            },
            usePlace() {
                if (this.place) {
                    this.markers.push({
                        position: {
                            lat: this.place.geometry.location.lat(),
                            lng: this.place.geometry.location.lng(),
                        },
                    });
                    this.place = null;
                }
            },
        },
    };
</script>

<style scoped>

</style>