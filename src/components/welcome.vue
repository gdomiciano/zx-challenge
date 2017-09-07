<template>
    <div class="welcome">
        <h2 class="page-title">Cheers!</h2>
        <p class="page-subtitle">It's time to get your beer delivered ;)</p>
    </div>
</template>

<script>
    export default {
        name: 'welcome',
    };
</script>

<style scoped lang="scss">
    @import '../assets/scss/colors';

    .welcome{
        text-align: center;
        margin-bottom: 30px;
    }
    .page-title {
        color: color($orange, 500);
        font-size: 60px;
    }
    .page-subtitle {
        color: color($white);
        font-size: 30px;

    }
</style>