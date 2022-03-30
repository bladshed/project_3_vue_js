// import Vue from 'vue';
import { createStore } from 'vuex';

// use vuex
// Vue.use(Vuex);

const store = createStore({
    state: {
        users: [
            {
                id: 1,
                first_name: "LeBron"
            }
        ]
    },
    getters: {
        // getters allow access to the data (BUT you are not allowed to change data)
        customers: function (state) {
            return state.users;
        },
        getAccessToken: function () {
            return localStorage.getItem("access_token");
        }
    }
})

export default store;