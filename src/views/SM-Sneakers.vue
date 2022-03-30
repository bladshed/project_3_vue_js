<template>
  <div id="content-div" class="d-flex" v-bind:style="{ height: '100vh' }">
    <main class="d-flex py-3 w-100">
      <!-- search column start -->
      <div
        class="col-2 p-3 justify-content-center align-items-center"
        id="search-div"
      >
        <input
          id="search-input"
          class="form-control"
          type="text"
          placeholder="search input"
          v-model="searchInput"
        />
        <hr />
        <label>Types</label>
        <select
          class="form-select"
          multiple
          aria-label="Types"
          v-model="searchType"
        >
          <option value="">all</option>
          <option>formal</option>
          <option>casual</option>
          <option>streetwear</option>
        </select>

        <hr />
        <label>Genders</label>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="search-male"
            name="search-male"
            value="male"
            v-model="searchGender"
          />
          <label class="form-check-label" for="search-male"> Male </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="search-female"
            name="search-female"
            value="female"
            v-model="searchGender"
          />
          <label class="form-check-label" for="search-female"> Female </label>
        </div>
        <div class="text-center">
          <button
            class="btn-sm btn-success m-1 col-10"
            id="search-btn"
            v-on:click="searchQuery"
          >
            SEARCH
          </button>
        </div>
      </div>
      <!-- search column end -->

      <!-- outfit records start -->
      <div
        id="records-div"
        class="
          col-10
          d-flex
          justify-content-center
          align-items-center
          flex-wrap
        "
      >
        <SneakerCard
          v-for="sneaker in sneakers"
          v-bind:key="sneaker.id"
          v-bind:sneaker="sneaker"
        />
        <!-- <component
          :is="SneakerCard"
          v-for="sneaker in sneakers"
          v-bind:key="sneaker.id"
          v-bind:sneaker="sneaker"
        ></component> -->
      </div>
      <!-- outfit records end -->
    </main>
  </div>
</template>

<script>
import SneakerCard from "@/components/SneakerCard.vue";
import axios from "axios";
import qs from "qs";
const BASE_API_URL = "http://localhost:8080/";
export default {
  name: "SM-Sneakers",
  created: async function () {
    if(!this.$store.getters.getAccessToken || this.$store.getters.getAccessToken === ""){
      this.$router.push("/user/login");
      return;
    }

    // initialize data
    let sneakersData;
    let output = 0;
    let count = 0;

    do {
      await axios
        .get(BASE_API_URL + "api/sneakers", {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(function (response) {
          console.log("SUCCESS");
          sneakersData = response.data.sneakers;
          output = 1;
        })
        .catch(function (error) {
          console.log("ERROR: " + error);
          output = 0;
          if (error.response) {
            console.log(error.response.data.sneakers);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
          setTimeout(async function () {
            let response = await axios.get(BASE_API_URL + "api/sneakers");
            sneakersData = response.data.sneakers;
          }, 2000);
        });

        count++;
    } while (output != 1 && count < 5);
    this.sneakers = sneakersData;
    console.log(this.sneakers);
  },
  components: {
    SneakerCard
  },
  props: ["forEditData"],
  data: function () {
    return {
      sneakers: [],
      searchInput: "",
      searchType: [],
      searchGender: [],
    };
  },
  methods: {
    refreshData: async function () {
      // call get all outfits api
      let response = await axios.get(BASE_API_URL + "outfits");
      this.sneakers = response.data.sneakers;
    },
    addToCart: async function () {
      //   if(outfitData.id){
      //     // call edit api
      //     await axios.put(BASE_API_URL + "outfits/" +outfitData.id, outfitData);
      //     alert("Edit Outfit Successful!")
      //   } else {
      //     // call add new api
      //     await axios.post(BASE_API_URL + "outfits",outfitData);
      //     alert("New Outfit Added!")
      //   }
      //   // close modal
      //   document.querySelector('.close').click();
      //   // refresh data list
      //   this.refreshData();
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
#records-div {
  height: 80vh;
  overflow-y: auto;
}
</style>