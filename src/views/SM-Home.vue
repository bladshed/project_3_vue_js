<template>
  <div class="d-flex justify-content-center align-items-center content-div">
    <div class="text-center title d-flex justify-content-center align-items-center">
      <h1>WELCOME TO SNEAKER MARKET</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "SM-Home",
  created: async function () {
    console.log("Store: " + this.$store.getters.getAccessToken);
    if(!this.$store.getters.getAccessToken || this.$store.getters.getAccessToken === ""){
      this.$router.push("/user/login");
      return;
    }
  },
};
</script>

<style>
.content-div{
  height: 90vh;
}
.title {
  font-family: "Roboto", sans-serif;
  color: white;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 15px;
  width: 100%;
}
</style>