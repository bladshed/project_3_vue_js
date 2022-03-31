<template>
  <div id="content-div" class="d-flex" v-bind:style="{ height: '100vh' }">
    <main class="d-flex flex-column py-3 w-100">
      <div class="text-center col-12">
        <button class="btn-sm btn-primary m-1 col-2">CHECK OUT</button>
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

export default {
  name: "SM-Sneakers",
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
          `${process.env.VUE_APP_BASE_API_URL}api/cart/${localStorage.getItem(
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
                process.env.VUE_APP_BASE_API_URL
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
  components: {
    CartItemCard,
  },
  data: function () {
    return {
      cartItems: [],
    };
  },
  methods: {
    updateCart: async function (cartData) {
      if (cartData) {
        // call edit cart api
        await axios
          .put(
            `${process.env.VUE_APP_BASE_API_URL}api/cart/${localStorage.getItem(
              "user_id"
            )}/update`,
            {
              sneaker_id: cartData.sneakerId,
              new_quantity: cartData.newQuantity
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