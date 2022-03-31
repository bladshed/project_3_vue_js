<template>
  <div class="card col-2 m-2">
    <div class="card-header d-flex justify-content-between">
        <strong>{{ cartItem.sneaker.brand.name.toUpperCase() }}</strong>
    </div>
    <div class="card-body">
        <h5 class="card-title">{{ sneaker.name }}</h5>
        <img class="mx-0" v-bind:src="sneaker.image_url" alt="" />
        <h3>PRICE: {{ sneaker.price }}</h3>
    </div>
    <div class="card-footer text-muted">
        <button class="badge bg-primary" id="add-cart-btn" v-on:click="addToCart">
            Add to Cart
        </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartItemCard",
  props: ["cartItem"],
  data: function () {
    return {
      formattedDate: "",
    };
  },
  methods: {
    addToCart: function () {
      this.$emit("add-to-cart", this.sneaker.id);
    }
  }
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