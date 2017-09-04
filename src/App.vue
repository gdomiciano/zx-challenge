<template>
    <div>
        <fixed-header/>
        <router-view></router-view>
        <fixed-footer/>
    </div>
</template>

<script>
    import FixedHeader from './components/fixed-header.vue';
    import FixedFooter from './components/fixed-footer.vue';

    export default {
        name: 'app',
        components: {
            FixedHeader,
            FixedFooter,
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