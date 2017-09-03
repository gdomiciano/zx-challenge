<template>
    <div>
        <fixed-header/>
        <router-view></router-view>
        <hr>
        <h1 class="title">{{ footer }}</h1>
    </div>
</template>

<script>
    import FixedHeader from './components/fixed-header.vue';

    export default {
        name: 'app',
        components: {
            FixedHeader,
        },
        data() {
            return {
                footer: 'footer',
            };
        },
    };
</script>

 <style lang="scss">
    @import './assets/scss/base';
</style>n