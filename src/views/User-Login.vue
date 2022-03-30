<template>
  <div
    id="login-div"
    class="col-12 d-flex flex-column align-items-center justify-content-center"
  >
    <div id="login-form" class="col-4 d-flex flex-column align-items-center justify-content-center">
      <!-- Email input -->
      <div class="form-outline mb-4 mt-3 col-8">
        <input type="email" id="email" class="form-control" v-model="email" />
        <label class="form-label" for="email"><strong>Email address</strong></label>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4 col-8">
        <input type="password" id="password" class="form-control" v-model="password" />
        <label class="form-label" for="password"><strong>Password</strong></label>
      </div>

      <!-- Submit button -->
      <button type="button" class="btn btn-primary btn-block mb-4" v-on:click="signIn">
        Sign in
      </button>

      <!-- Register buttons -->
      <div class="text-center">
        <p>Not a member? <a href="#!">Register</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "User-Register",
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  methods:{
    signIn: async function() {
      let router = this.$router; 
      await axios.post(process.env.VUE_APP_BASE_API_URL + "api/users/login", {
          email: this.email,
          password: this.password
      })
      .then(function (response) {
        // set tokens
        localStorage.setItem("refresh_token", response.data.refreshToken);
        localStorage.setItem("access_token", response.data.accessToken);

        // display navbar
        document.getElementById("navbar").style.display = "block";

        // navigate to home page
        router.push("/");
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
};
</script>

<style>
#login-div {
  height: 80vh;
}
#login-form {
  background-color: rgb(197, 192, 192);
}
</style>