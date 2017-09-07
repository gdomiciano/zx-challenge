<template>
    <div class="search">
        <div :class="['overlay', {'half': halfSize}]">
            <welcome v-if="!search" />
            <div class="field-row">
                <label class="field-label">First, tell us your location:</label>
                <gmap-autocomplete class="address-field" @place_changed="setPlace" @focus="halfSize = false"></gmap-autocomplete>
                <button class="btn-find" @click="usePlace">Find Stores</button>
            </div>
        </div>
        <bg-map :place="place" :zoom="zoom" :markers="markers" :position="position"/>
    </div>
</template>

<script>
    import Welcome from '../components/welcome.vue';
    import BgMap from '../components/bg-map.vue';

    export default {
        name: 'search',
        props: ['search'],

        components: {
            Welcome,
            BgMap,
        },
        data() {
            return {
                markers: [],
                place: null,
                position: {
                    lat: -23.6821592,
                    lng: -46.8761698,
                },
                zoom: 7,
                hasMap: true,
                halfSize: false,
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

    .search {
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
