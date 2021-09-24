<template>
<!-- <div class="pt-5 pb-5" style="background: rgb(255, 255, 255);"> -->
  <div class="container" style="background: rgb(255, 255, 255);">
    <div class="card border-0 rounded shadow-none border-top" style="background: rgb(255, 255, 255);">
      <div class="card-body">
        <h5>MAIN MENU</h5>
        <hr>
        <ul class="list-group">
          <nuxt-link :to="{name: 'customer-dashboard'}" class="list-group-item text-decoration-none text-dark text-uppercase">
            <i class="fa fa-tachometer-alt" style="color:#000;"></i> Dashboard
          </nuxt-link>
          <nuxt-link :to="{name: 'customer-invoices'}" class="list-group-item text-decoration-none text-dark text-uppercase">
            <i class="lnr lnr-cart" style="color:#000;"></i> My Orders
          </nuxt-link>
          <a @click="logout" class="list-group-item text-decoration-none text-dark text-uppercase" style="cursor: pointer;">
            <i class="fa fa-sign-out-alt" style="color:#000;"></i> Logout
          </a>
        </ul>
      </div>
    </div>
  </div>
<!-- </div> -->
</template>


<script>
 export default {
    //method
    methods: {
      //method "logout"
      async logout() {
        //logout auth
        await this.$auth.logout()
        //set state
        this.$store.commit('web/cart/SET_CARTS_DATA', [])
        this.$store.commit('web/cart/SET_CART_PRICE', 0)

        //redirect route customer login
        this.$router.push({
          name: 'customer-login'
        })
      }
    }
 }
</script>
<style scoped>
 a.nuxt-link-active {
 background: rgba(255, 222, 212, .05) !important;
 }
</style>
