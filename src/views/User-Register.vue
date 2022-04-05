<template>
  <div
    class="col-12 d-flex flex-column align-items-center justify-content-center login-div"
  >
    <div class="col-4 d-flex flex-column align-items-center justify-content-center login-form">
      <h3 class="mt-4">USER REGISTER</h3>
      <!-- First name -->
      <div class="form-outline my-2 col-8">
        <input type="text" id="first_name" class="form-control" v-model="first_name" />
        <label class="form-label" for="first_name"><strong>First Name</strong></label>
      </div>

      <!-- Last name -->
      <div class="form-outline my-2 col-8">
        <input type="text" id="last_name" class="form-control" v-model="last_name" />
        <label class="form-label" for="last_name"><strong>Last Name</strong></label>
      </div>

      <!-- Email input -->
      <div class="form-outline my-2 col-8">
        <input type="email" id="email" class="form-control" v-model="email" />
        <label class="form-label" for="email"><strong>Email address</strong></label>
      </div>

      <!-- Password input -->
      <div class="form-outline my-2 col-8">
        <input type="password" id="password" class="form-control" v-model="password" />
        <label class="form-label" for="password"><strong>Password</strong></label>
      </div>

      <!-- Register button -->
      <button type="button" class="btn btn-primary btn-block mb-4" v-on:click="register">
        Submit
      </button>

      <!-- Sign In button -->
      <div class="text-center">
        <p><router-link to="/user/login">Sign In</router-link></p>
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
      env: this.$store.getters.variables,
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };
  },
  methods:{
    register: async function() {
      await axios.post(this.env.VUE_APP_BASE_API_URL + "api/users/register", {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password
      })
      .then(function () {
        alert("New User has been added!");
      })
      .catch(function (error) {
        console.log("ERROR: " + error);
        if (error.response) {
          alert(error.response.data.error);
          console.log(error.response.status);
          console.log(error.response.headers);
        }

        return;
      });

      // set values
      this.first_name = "";
      this.last_name = "";
      this.email = "";
      this.password = "";

      return;
    }
  }
};
</script>

<style>
</style>