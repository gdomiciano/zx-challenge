<template>
    <Gmap-Map class="map" style="width: mapSize.width ; height: mapSize.height;" :width="mapSize.width" :height="mapSize.height" :zoom="zoom" :center="position" :options='options'>
        <Gmap-Marker v-for="(marker, index) in markers" :key="index" :position="marker.position"></Gmap-Marker>
        <Gmap-Marker v-if="place" label="You" :position="position"></Gmap-Marker>
    </Gmap-Map>
</template>

<script>
    export default {
        name: 'bg-map',
        props: ['place', 'zoom', 'markers', 'position'],
        data() {
            return {
                mapSize: {
                    width: `${window.innerWidth}px`,
                    height: window.innerHeight,
                },
                options: {
                    fullscreenControl: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                    zoomControl: false,
                    scrollwheel: false,
                },
            };
        },
    };
</script>

<style scoped lang="scss">

    .map{
        height: 0;
        padding: 100%;
        position: relative;
        overflow: hidden;
        right: 50%;
        top: -30%;
    }

</style>