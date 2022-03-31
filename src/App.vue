<template>
  <div id="main-div">
    <div id="background" class="d-flex flex-column ">
      <!-- navbar start -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse show" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <router-link to="/" class="nav-link active" aria-current="page" id="home" href="#">Home</router-link>
              <router-link to="/sneakers" class="nav-link" id="sneakers" href="#">Sneakers</router-link>
              <router-link to="/user/login" class="nav-link" id="logout" href="#" v-on:click="logout">Logout</router-link>
              <!-- <a v-on:click="logout" class="nav-link" id="outfits" href="#">Logout</a> -->
            </div>
          </div>
        </div>
      </nav>
      <!-- navbar end -->

      <!-- view page -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  mounted: async function () {
    if(this.$store.getters.getAccessToken || this.$store.getters.getAccessToken !== ""){
      this.$router.push("/");
      return;
    } else {
      document.getElementById("navbar").style.display = "none";
    }
  },
  methods:{
    logout: async function() {
      // let router = this.$router; 
      console.log("TOKEN: " + localStorage.getItem("refresh_token"));

      await axios.post(process.env.VUE_APP_BASE_API_URL + "api/users/logout", {
          refreshToken: localStorage.getItem("refresh_token"),
      })
      .then(function () {
        // remove token values
        localStorage.setItem("user_id", "");
        localStorage.setItem("access_token", "");
        localStorage.setItem("refresh_token", "");
        document.getElementById("navbar").style.display = "none";

      })
      .catch(function (error) {
        console.log("ERROR: " + error);
        if (error.response) {
          alert(error.response.data.error);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

      return;
    }
  }
}
</script>

<style>
#main-div {
  height: 100vh;
  background-image: url("@/images/background.jpg");
  background-size: cover;
}
#background {
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.navbar-light .navbar-nav .show > .nav-link, .navbar-light .navbar-nav .nav-link.active {
    font-weight: bold;
}
</style>