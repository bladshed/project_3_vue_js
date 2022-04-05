<template>
  <div class="d-flex justify-content-center align-items-center content-div">
    <div
      class="text-center title d-flex justify-content-center align-items-center"
    >
      <h1>PAYMENT SUCCESSFUL!!</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SM-Success-Payment",
  created: async function () {
    console.log("CHECKOUT SUCCESS PAGE")
    if (
      !this.$store.getters.getAccessToken ||
      this.$store.getters.getAccessToken === ""
    ) {
      this.$router.push("/user/login");
      return;
    }

    await axios
      .get(
        `${
          this.env.VUE_APP_BASE_API_URL
        }api/checkout/success/${localStorage.getItem("user_id")}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then(function () {
        console.log("SUCCESS");
      })
      .catch(function (error) {
        console.log("ERROR: " + error);
        if (error.response) {
          console.log(error.response.data.cartItems);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  },
  data: function () {
    return {
      env: this.$store.getters.variables,
    };
  },
};
</script>

<style>
</style>