<template>
  <div id="content-div" class="d-flex" v-bind:style="{ height: '100vh' }">
    <main class="d-flex flex-column py-3 w-100">
      <div class="text-center col-12">
        <!-- <button class="btn-sm btn-primary m-1 col-2" v-on:click="checkout">
          CHECK OUT
        </button> -->

        <div>
          <stripe-checkout
            ref="checkoutRef"
            mode="payment"
            :pk="publishableKey"
            :line-items="lineItems"
            :success-url="successURL"
            :cancel-url="cancelURL"
            @loading="(v) => (loading = v)"
          />
          <button @click="checkout">Checkout</button>
        </div>
      </div>

      <!-- sneaker records start -->
      <div
        id="cart-div"
        class="
          col-12
          d-flex
          justify-content-center
          align-items-center
          flex-wrap
        "
      >
        <CartItemCard
          v-for="cartItem in cartItems"
          v-bind:key="cartItem.id"
          v-bind:initCartItem="cartItem"
          v-on:update-cart="updateCart"
        />
      </div>
      <!-- sneaker records end -->
    </main>
  </div>
</template>

<script>
import CartItemCard from "@/components/CartItemCard.vue";
import axios from "axios";
import { StripeCheckout } from '@vue-stripe/vue-stripe';

export default {
  name: "SM-Cart",
  created: async function () {
    if (
      !this.$store.getters.getAccessToken ||
      this.$store.getters.getAccessToken === ""
    ) {
      this.$router.push("/user/login");
      return;
    }

    // initialize data
    let cartItemsData;
    let output = 0;
    let count = 0;

    do {
      await axios
        .get(
          `${this.env.VUE_APP_BASE_API_URL}api/cart/${localStorage.getItem(
            "user_id"
          )}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then(function (response) {
          console.log("SUCCESS");
          cartItemsData = response.data.cartItems;
          output = 1;
        })
        .catch(function (error) {
          console.log("ERROR: " + error);
          output = 0;
          if (error.response) {
            console.log(error.response.data.cartItems);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
          setTimeout(async function () {
            let response = await axios.get(
              `${
                this.env.VUE_APP_BASE_API_URL
              }api/cart/${localStorage.getItem("user_id")}`
            );
            cartItemsData = response.data.cartItems;
          }, 2000);
        });

      count++;
    } while (output != 1 && count < 5);

    if (count >= 5) {
      alert("Token has expired, please re-login");
      // remove token values
      localStorage.setItem("user_id", "");
      localStorage.setItem("access_token", "");
      localStorage.setItem("refresh_token", "");
      document.getElementById("navbar").style.display = "none";

      this.$router.push("/user/login");
      return;
    }

    this.cartItems = cartItemsData;
  },
  mounted: function () {
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute("src", "https://js.stripe.com/v3");
    document.head.appendChild(recaptchaScript);
  },
  components: {
    CartItemCard, StripeCheckout
  },
  data: function () {
    this.publishableKey = this.$store.getters.variables.VUE_APP_STRIPE_PUBLISHABLE_KEY;
    return {
      env: this.$store.getters.variables,
      cartItems: [],
      loading: false,
      lineItems: [],
      successURL: this.$store.getters.variables.VUE_APP_STRIPE_SUCCESS_URL,
      cancelURL: this.$store.getters.variables.VUE_APP_STRIPE_CANCEL_URL,
    };
  },
  methods: {
    updateCart: async function (cartData) {
      if (cartData) {
        // call edit cart api
        await axios
          .put(
            `${this.env.VUE_APP_BASE_API_URL}api/cart/${localStorage.getItem(
              "user_id"
            )}/update`,
            {
              sneaker_id: cartData.sneakerId,
              new_quantity: cartData.newQuantity,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
              },
            }
          )
          .then(function () {
            console.log("SUCCESS: updateCart");
            alert("Cart has been updated!");
          })
          .catch(function (error) {
            console.log("ERROR: " + error);

            if (error.response) {
              console.log(error.response.data.sneakers);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          });
      }
    },
    checkout: async function () {
      // step 1. create the line items
      // each line item is one item that the user has to pay off
      // imagine it as each line in an invoice, recepit
      //
      // create one line item for each item in the shopping cart

      // 1a - get all the items from current logged in user's shopping cart
      const response = await axios.get(
        `${this.env.VUE_APP_BASE_API_URL}api/cart/${localStorage.getItem(
          "user_id"
        )}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      const items = response.data.cartItems;

      // 1b - for each item in the items array, create a line item
      // const meta = [];
      for (let i of items) {
        let priceId = "";
        if(i.sneaker.name === "Nike Airforce 1"){
            priceId = "price_1KjeJ1BXapCBJm2WYczrQqKi";
          } else if(i.sneaker.name === "Jordan 1 Starfish"){
            priceId = "price_1KjeJxBXapCBJm2WO4436IHs";
          } else if(i.sneaker.name === "Yeezy Boost 350 V2"){
            priceId = "price_1KjeKMBXapCBJm2WWmaS8Vdz";
          } else if(i.sneaker.name === "LeBron x  John Elliott"){
            priceId = "price_1KjeKaBXapCBJm2Wp5ySZpRM";
          }

        const lineItem = {
          // name: i.sneaker.name,
          // amount: i.sneaker.price * 100,
          quantity: i.quantity,
          // currency: "SGD",
          price: priceId
        };

        // check if the sneaker has image
        //if the sneaker has image, add it to the lineitem as well
        // if (i.sneaker.image_url) {
        //   lineItem["images"] = i.sneaker.image_url;
        //   // Stripe expect the images of a line item to be an array
        //   // so we only have one image per sneaker, so that's why we enclosed it around [ ]
        //   // so that it can be inside an array
        // }

        this.lineItems.push(lineItem);

        // add to the meta data to remember for each sneaker, what is the quantity purchased
        // meta.push({
        //   sneaker_id: i.sneaker.id,
        //   quantity: i.quantity,
        // });
      }

      console.log("ITEMS: " + JSON.stringify(this.lineItems));
      console.log("SUCCESS LINK: " + this.env.VUE_APP_STRIPE_SUCCESS_URL);
      // step 3: get the session id from stripes
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>

<style>
/* #content-div{
  height: 100vh;
} */
#search-div {
  background-color: rgb(241, 241, 241);
  height: 80vh;
  overflow-y: auto;
}
.btn-custom {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}
#cart-div {
  height: 80vh;
  overflow-y: auto;
}
</style>