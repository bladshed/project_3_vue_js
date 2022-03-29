<template>
  <div class="card col-2 m-2">
    <div class="card-header d-flex justify-content-between">
        {{ outfit.gender.toUpperCase() }}
        <button class="badge bg-danger" v-on:click="deleteOutfit">Delete</button>
    </div>
    <div class="card-body">
        <h5 class="card-title">{{ outfit.type.toUpperCase() }}</h5>
        <img class="mx-0" v-bind:src="outfit.img_url" alt="" />
    </div>
    <div class="d-flex flex-row justify-content-center align-items-center">
        <button class="btn-sm btn-success mb-3 m-2 col-4" v-on:click="editOutfit">Edit</button>
        <button class="btn-sm btn-success mb-3 m-2 col-4" v-on:click="viewOutfit">View</button>
    </div>
    <div class="card-footer text-muted">
        {{ this.outfit.dateModified ? this.outfit.dateModified.split("T")[0] : this.outfit.dateCreated.split("T")[0] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SneakerCard",
  props: ["outfit"],
  data: function () {
    return {
      formattedDate: "",
    };
  },
  methods: {
    editOutfit: function () {
      this.$emit("edit-outfit", this.outfit._id);
    },
    viewOutfit: function () {
      this.$emit("view-outfit", this.outfit._id);
    },
    deleteOutfit: function () {
      this.$emit("delete-outfit", this.outfit._id);
    },
  },
  // computed: {
    // a computed property is like a function
    // in the `methods`
    // however we refer to it as if it is a data
    // variable in the template
    // formatDate: function () {
    //     // 2022-01-08T12:45:19.822Z
    //     console.log(this.outfit.dateModified);
    //     if(this.outfit.dateModified){
    //       return this.outfit.dateModified.split("T")[0]
    //     } else {
    //       return this.outfit.dateCreated.split("T")[0]
    //     }
    // },
  // }
};
</script>

<style>
img {
  height: 270px;
  width: 100%;
}
.badge{
  font-size: 0.5em !important;
}
</style>