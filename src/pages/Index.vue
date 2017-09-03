<template>
    <div>
        <router-link to="/results">huhuhu</router-link>
        <autocomplete/>
    </div>
</template>

<script>
    import Autocomplete from '../components/autocomplete.vue';
    // import gql from 'graphql-tag';

    // const addressQuery = gql `
    //     query pocSearch (algorithm: 'NEAREST', lat: '', lon: '', now:new Date()){
    //         id
    //     }
    // `;
    export default {
        components: {
            Autocomplete,
        },
    };
</script>

<style scoped lang="scss">

</style>