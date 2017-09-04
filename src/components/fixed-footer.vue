<template>
    <footer class="footer">
        <small>Developed by: <router-link to="https://github.com/gdomiciano">Geisy Domiciano</router-link></small>
    </footer>
</template>

<script>
    export default {
        name: 'fixed-footer',
    };
</script>

<style scoped lang="scss">
    @import '../assets/scss/colors';

    .footer {
        background: color($orange, 300);
        bottom: 0;
        border-top: color($grey, 900) 2px solid;
        // box-shadow: inset 0 0 10px color($grey,900);
        color: color($grey, 800);
        text-align: center;
        padding: 15px 10px;
        position: fixed;
        width: 100%;

    }
</style>