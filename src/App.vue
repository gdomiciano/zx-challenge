<template>
    <h1 class="title">{{message}}</h1>
</template>

<script>
    export default {
        data() {
            return {
                message: 'it works',
            };
        },
    };
</script>

<style>
 /* <style lang="scss"> */
    .title{
        color: red;
    }
    
</style>