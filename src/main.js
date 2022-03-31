import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";

// pages
import UserLogin from "@/views/User-Login.vue";
import UserRegister from "@/views/User-Register";
import SMHome from "@/views/SM-Home";
import SMSneakers from "@/views/SM-Sneakers";
import SneakerCard from "@/components/SneakerCard.vue";
import SMCart from "@/views/SM-Cart.vue";

// create a router object
const routes = [
    // routes go here
    {
        path: "/user/login",
        name: "login",
        component: UserLogin
    },
    {
        path: "/user/register",
        name: "register",
        component: UserRegister
    },
    {
        path: "/",
        name: "home",
        component: SMHome
    },
    {
        path: "/sneakers",
        name: "sneakers",
        component: SMSneakers,
        children: [
            {
                path: ':id',
                name: 'sneakerCard',
                component: SneakerCard,
            }
        ]
    },
    {
        path: "/cart/:userId",
        name: "cart",
        component: SMCart
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
createApp(App).use(router).use(store).mount('#app')