<template>
    <div>
        <router-link to="/results">huhuhu</router-link>
        <autocomplete/>

         <h4 v-if="loading">Loading...</h4>

         <ul v-if="POC">
            <li v-for="place in POC" :key="place.id">
            {{ place.status }}: {{ place.tradingName }}
            </li>
        </ul>
    </div>
</template>

<script>
    import gql from 'graphql-tag';
    import Autocomplete from '../components/autocomplete.vue';

    const algorithm = 'NEAREST';
    const lat = '-23.6315238'; // this.position.lat;
    const lng = '-46.7018196';
    const now = '2017-08-01T20:00:00.000Z';
    // const now = (new Date()).toJSON();
    const addressQuery = gql`
        query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
            pocSearch(now: "${now}", algorithm: "${algorithm}", lat: "${lat}", long: "${lng}") {
    __typename
    id
    status
    tradingName
    officialName
    deliveryTypes {
      __typename
      pocDeliveryTypeId
      deliveryTypeId
      price
      title
      subtitle
      active
    }
    paymentMethods {
      __typename
      pocPaymentMethodId
      paymentMethodId
      active
      title
      subtitle
    }
    pocWorkDay {
      __typename
      weekDay
      active
      workingInterval {
        __typename
        openingTime
        closingTime
      }
    }
    address {
      __typename
      address1
      address2
      number
      city
      province
      zip
      coordinates
    }
    phone {
      __typename
      phoneNumber
    }
  }
}
    `;

    export default {
        components: {
            Autocomplete,
        },
        data() {
            return {
                POC: [],
                loading: 0,
            };
        },
        beforeMount() {
            console.log(addressQuery);
        },
        apollo: {
            POC: {
                query: addressQuery,
            },
        },
    };
</script>

<style scoped lang="scss">

    *{
        color:white;
    }

</style>