import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";

// pages
import UserLogin from "@/views/User-Login.vue";
import UserRegister from "@/views/User-Register.vue";
import SMHome from "@/views/SM-Home.vue";
import SMSneakers from "@/views/SM-Sneakers.vue";
import SneakerCard from "@/components/SneakerCard.vue";
import SMCart from "@/views/SM-Cart.vue";
import CartItemCard from "@/components/CartItemCard.vue";
import SMSuccessPayment from "@/views/SM-Success-Payment.vue";

// create a router object
const routes = [
    // routes go here
    {
        path: "/user/login",
        name: "User-Login",
        component: UserLogin
    },
    {
        path: "/user/register",
        name: "User-Register",
        component: UserRegister
    },
    {
        path: "/sneakers",
        name: "SM-Sneakers",
        component: SMSneakers,
        children: [
            {
                path: ':id',
                name: 'SneakerCard',
                component: SneakerCard,
            }
        ]
    },
    {
        path: "/cart",
        name: "SM-Cart",
        component: SMCart,
        children: [
            {
                path: ':id',
                name: 'CartItemCard',
                component: CartItemCard,
            }
        ]
    },
    {
        path: "/checkout/success",
        name: "SM-Success-Payment",
        component: SMSuccessPayment
    },
    {
        path: "/",
        name: "SM-Home",
        component: SMHome
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'vue-router-active-link'
})
createApp(App).use(router).use(store).mount('#app')