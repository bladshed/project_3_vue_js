<template>
  <div id="content-div" class="d-flex" v-bind:style="{ height: '100vh' }">
    <main class="d-flex py-3 w-100">

      <!-- sneaker records start -->
      <div
        id="cart-div"
        class="
          col-10
          d-flex
          justify-content-center
          align-items-center
          flex-wrap
        "
      >
        <CartItems
          v-for="cartItem in cartItems"
          v-bind:key="cartItem.id"
          v-bind:cartItem="cartItem"
          v-on:add-to-cart="addToCart"
        />

      </div>
      <!-- sneaker records end -->
    </main>
  </div>
</template>

<script>
import CartItemCard from "@/components/CartItemCard.vue";
import axios from "axios";
import qs from "qs";
export default {
  name: "SM-Sneakers",
  created: async function () {
    if(!this.$store.getters.getAccessToken || this.$store.getters.getAccessToken === ""){
      this.$router.push("/user/login");
      return;
    }

    // initialize data
    let cartItemsData;
    let output = 0;
    let count = 0;

    do {
      await axios
        .get(`${process.env.VUE_APP_BASE_API_URL}api/cart/${localStorage.getItem("user_id")}`, {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("access_token"),
          },
        })
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
            let response = await axios.get(`${process.env.VUE_APP_BASE_API_URL}api/cart/${localStorage.getItem("user_id")}`);
            cartItemsData = response.data.cartItems;
          }, 2000);
        });

        count++;
    } while (output != 1 && count < 5);

    if(count >= 5){
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
    CartItemCard
  },
  data: function () {
    return {
      cartItems: []
    };
  },
  methods: {
    refreshData: async function () {
      // call get all outfits api
      let response = await axios.get(BASE_API_URL + "outfits");
      this.sneakers = response.data.sneakers;
    },
    addToCart: async function (sneakerId) {
        // call add new api
        await axios.post(`${process.env.VUE_APP_BASE_API_URL}api/cart/${localStorage.getItem("user_id")}/add`,{
          sneaker_id: sneakerId
        },{
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("access_token"),
          }
        }).then(function () {
          console.log("SUCCESS: addToCart");
          alert("Added to cart!");
        }).catch(function (error) {
          console.log("ERROR: " + error);
          
          if (error.response) {
            console.log(error.response.data.sneakers);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    },
    searchQuery: async function () {
      if (this.searchType.length == 1 && this.searchType[0].trim() === "") {
        this.searchType = [];
      }
      // call search api
      let results = await axios.get(BASE_API_URL + "outfit-search", {
        params: {
          description: this.searchInput,
          types: this.searchType,
          genders: this.searchGender,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      });
      // set query list
      this.sneakers = results.data;
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