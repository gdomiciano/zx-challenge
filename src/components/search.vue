<template>
    <div class="search">
        <div :class="['overlay', {'half': halfSize}]">
            Let me know your location
            <div class="field-row">
                <gmap-autocomplete class="address-field" @place_changed="setPlace" @focus="halfSize = false"></gmap-autocomplete>
                <button class="btn-find" @click="usePlace">Find Stores</button>
            </div>
        </div>
        <Gmap-Map class="map" style="width: mapSize.width ; height: mapSize.height;" :width="mapSize.width" :height="mapSize.height" :zoom="zoom" :center="position" :options='options'>
            <Gmap-Marker v-for="(marker, index) in markers" :key="index" :position="marker.position"></Gmap-Marker>
            <Gmap-Marker v-if="place" label="&#x2605;" :position="position"></Gmap-Marker>
        </Gmap-Map>
    </div>
</template>

<script>

    export default {
        name: 'search',

        data() {
            return {
                markers: [],
                place: null,
                position: {
                    lat: -23.6821592,
                    lng: -46.8761698,
                },
                zoom: 7,
                options: {
                    fullscreenControl: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                    zoomControl: false,
                    scrollwheel: false,
                },
                hasMap: true,
                halfSize: false,
                mapSize: {
                    width: `${window.innerWidth}px`,
                    height: window.innerHeight,
                },
            };
        },
        methods: {
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
                    this.$emit('position', position);
                    this.place = null;
                }
            },
        },
    };
</script>

<style scoped lang="scss">
    @import '../assets/scss/colors';

    // .search {
    //     width: 100%;
    //     margin: 50px auto;
    //     position: relative;
    //     overflow: hidden;
    // }
    // I'm not proud of it.
    // .map{
    //     height: 0;
    //     // padding: 100%;
    //     position: relative;
    //     overflow: hidden;
    // }
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
            height: 10%;

            .field-row {
                margin: 30px auto;
            }
        }
    }
    .field-row {
        width: 90%;
        margin: 50px auto;

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
