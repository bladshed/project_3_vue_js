// import Vue from 'vue';
import { createStore } from 'vuex';

// use vuex
// Vue.use(Vuex);

const store = createStore({
    state: {
        variables: {
            VUE_APP_BASE_URL: "https://loquacious-naiad-713bf7.netlify.app/",
            VUE_APP_BASE_API_URL:"https://project-3-hbs.herokuapp.com/",
            VUE_APP_STRIPE_PUBLISHABLE_KEY:"pk_test_51KgWPJBXapCBJm2WIU6cydkNcrYcoyZWeAy2qJQB0RSCtdre8SDxKe8VfoIWGfIoA51gazsMns9KVa4kxD4GeZ5H00rFt4N0X3",
            VUE_APP_STRIPE_SECRET_KEY:"sk_test_51KgWPJBXapCBJm2WQetZIY5Ps7lZYAYOxjaEvpJxlKTbIJBMsGAwgahO0ZGoQJ0Ts77ZFIlCjShBgt9VbvVLJnBP005QlpPxnw",
            VUE_APP_STRIPE_SUCCESS_URL:"https://loquacious-naiad-713bf7.netlify.app/checkout/success",
            VUE_APP_STRIPE_CANCEL_URL:"https://loquacious-naiad-713bf7.netlify.app/cart"
        }
    },
    getters: {
        // getters allow access to the data (BUT you are not allowed to change data)
        variables: function (state) {
            return state.variables;
        },
        getAccessToken: function () {
            return localStorage.getItem("access_token");
        }
    }
})

export default store;