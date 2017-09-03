<template>
    <div>
        <h1 class="title">{{ header }}</h1>
        <hr>
        Hello {{ $route.params.name }}
        <router-view></router-view>

        <hr>
        <h1 class="title">{{ footer }}</h1>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                header: 'This is the header',
                footer: 'This is the footer',
            };
        },
    };
</script>

<style lang="scss"> 
    body {
        background: #333;
    }
    .title{
        color: red;
        height: 50px;
        background: #999;
    }
    
</style>n