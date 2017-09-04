<template>
    <header class="header">
        <div class="brand">
            <router-link to="/"><icon class="icon-logo" :glyph="logo" width="40" height="40" aria-label="Beer"/></router-link>
        </div>
    </header>
</template>

<script>
    import Icon from './icon.vue';
    import logo from '../assets/svg/icon-beer.svg';

    export default {
        name: 'fixed-header',
        components: {
            Icon,
        },
        data() {
            return {
                logo,
            };
        },
    };
</script>

<style scoped lang="scss">
    @import '../assets/scss/colors';

    .header {
        background: color($grey, 900);
        border-bottom: color($orange, 400) 2px solid;
        height: 50px;
        left: 0;
        padding: 5px;
        position: fixed;
        top: 0;
        width: 100%;
    }
    .brand{
       text-align: center;
    }
</style>