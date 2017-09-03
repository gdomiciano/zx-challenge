<template>
    <div class="autocomplete">
        <label>
            AutoComplete
            <gmap-autocomplete class="address-field" @place_changed="setPlace"></gmap-autocomplete>
            <button @click="usePlace">OK</button>
        </label>
        <br/>
        <Gmap-Map class="map" :zoom="zoom" :center="position">
            <Gmap-Marker v-for="(marker, index) in markers" :key="index" :position="marker.position"></Gmap-Marker>
            <Gmap-Marker v-if="place" label="&#x2605;" :position="position"></Gmap-Marker>
        </Gmap-Map>
            {{position.lat}},{{position.lng}}
    </div>
</template>

<script>
    export default {
        name: 'autocomplete',

        data() {
            return {
                markers: [],
                place: null,
                position: {
                    lat: -15.7217509,
                    lng: -48.0075695,
                },
                zoom: 5,
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
        },
    };
</script>

<style scoped lang="scss">
    .map{
        width: 500px;
        height: 500px;
    }
    .address-field {
        width: 300px;
    }
</style>
