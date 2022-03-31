<template>
  <div class="card col-2 m-2">
    <div class="card-header d-flex justify-content-between">
        <strong>{{ cartItem.sneaker.brand.name.toUpperCase() }}</strong>
    </div>
    <div class="card-body">
        <h5 class="card-title">{{ cartItem.sneaker.name }}</h5>
        <img class="mx-0" v-bind:src="cartItem.sneaker.image_url" alt="" />
        <h3>PRICE: {{ cartItem.sneaker.price }}</h3>
        <input type="text" class="form-control col-3" placeholder="image url" id="quantity" v-model="this.cartItem.quantity">
        <label for="quantity">Quantity</label>
    </div>
    <div class="card-footer text-muted">
        <button class="badge bg-primary" id="update-cart-btn" v-on:click="updateCart">
            Update Cart
        </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartItemCard",
  props: ["initCartItem"],
  data: function () {
    return {
      cartItem: {
        id: this.initCartItem.id,
        quantity: this.initCartItem.quantity,
        sneaker: this.initCartItem.sneaker,
      }
    };
  },
  methods: {
    updateCart: function () {
      console.log("QUANTITY: " + this.cartItem.quantity);
      this.$emit("update-cart", {
        sneakerId: this.cartItem.sneaker.id,
        newQuantity: this.cartItem.quantity
      });
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