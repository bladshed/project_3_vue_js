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
    getter: {
        // getters allow access to the data (BUT you are not allowed to change data)
        customers: function (state) {
            return state.users;
        }
    }
})

export default store;