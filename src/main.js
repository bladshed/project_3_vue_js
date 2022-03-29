import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import store from "./store";
import {createRouter, createWebHistory} from "vue-router";

// pages
import UserAdd from "@/views/User-Register";
import SMHome from "@/views/SM-Home";
import SMSneakers from "@/views/SM-Sneakers";

  // create a router object
const routes = [
    // routes go here
    {
        path: "/add",
        name: "add",
        component: UserAdd
    },
    {
        path: "/",
        name: "home",
        component: SMHome
    },
    {
        path: "/sneakers",
        name: "edit",
        component: SMSneakers
    }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  store
})
createApp(App).use(router).mount('#app')