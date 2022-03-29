<template>
  <div id="main-div">
    <div id="background" class="d-flex flex-column">
      <!-- navbar start -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse show" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <router-link to="/" class="nav-link active" aria-current="page" id="home" href="#">Home</router-link>
              <router-link to="/sneakers" class="nav-link" id="sneakers" href="#">Sneakers</router-link>
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

export default {
  name: "App",
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