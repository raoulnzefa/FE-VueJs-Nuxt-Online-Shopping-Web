<template>
  <header class="section-header">
    <section class="header-main">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-lg-5 col-sm-12 d-none d-md-block">
            <div class="search-wrap">
              <div class="input-group w-50 shadow-none">
                <input type="text" v-model="search" @keypress.enter="searchData" class="form-control search-form shadow-none" placeholder="Search product?">
                  <div class="input-group-append">
                    <button @click="searchData" class="btn btn-light search-button shadow-none"> 
                      <i class="fa fa-search"></i> 
                    </button>
                  </div>
              </div>
            </div>
          </div>
          <nuxt-link to="/" data-abc="true" class="px-0 col-lg-2 col-sm-6 col-12 d-flex align-items-center justify-content-center mt-2 mb-3" href="#">
            <img src="images/logo2.png" width="150" alt="Furnitor">
          </nuxt-link>
          <div class="col-lg-4 col-sm-6 col-12">
            <div class="widgets-wrap float-md-right">
              <div class="widget-header mr-4">
                <nuxt-link :to="{name: 'cart'}" href="#" class="icon icon-sm rounded-circle border"><i class="fa fa-shopping-basket"></i></nuxt-link>
                <span class="badge badge-pill badge-danger notify">{{ cartTotal }}</span>
              </div>
              <div class="widget-header icontext">
                <div class="text">
                  <span class="text-muted">Welcome!</span>
                  <div>
                    <ul class="navbar-nav ml-auto">
                      <li class="nav-item dropdown" v-if="!$auth.loggedIn">
                        <nuxt-link :to="{name: 'customer-login'}" role="button" aria-expanded="false" style="color:#000;text-decoration: none;"> Account
                        </nuxt-link>
                      </li>
                      <li class="nav-item dropdown" v-if="$auth.loggedIn">
                        <nuxt-link :to="{name: 'customer-dashboard'}" href="#" role="button" aria-expanded="false" style="color:#000;text-decoration: none;"> 
                          {{ $auth.user.name }}
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> <!-- widgets-wrap.// -->
          </div> <!-- col.// -->
          </div>
        </div>
    </section>
    <nav class="navbar navbar-expand-md navbar-main border-bottom p-2">
      <div class="container-fluid">
        <div class="d-md-none my-2">
          <div class="input-group w-100">
            <input type="search" name="search" class="form-control" placeholder="Search your product">
              <div class="input-group-append">
                <button class="btn btn-light"><i class="fa fa-search"></i></button>
              </div>
          </div>
        </div>
        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#dropdown6" aria-expanded="false"> <span class="navbar-toggler-icon"></span> </button>
        <div class="collapse navbar-collapse" id="dropdown6">
          <div class="collapse navbar-collapse" id="dropdown6">
              <div class="nav navbar-nav mx-auto">
                <nuxt-link to="/" data-abc="true" class="nav-item nav-link" style="font-weight:500; color:#000;">Home</nuxt-link>
                <nuxt-link :to="{name: 'studio'}" class="nav-item nav-link" style="font-weight:500; color:#000;">Our Studio</nuxt-link>
                <nuxt-link :to="{name: 'products'}" class="nav-link" style="font-weight:500; color:#000;">Shop</nuxt-link>
                <nuxt-link :to="{name: 'contact'}" class="nav-link" style="font-weight:500; color:#000;">Contact</nuxt-link>
              </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
 export default {
    //hook "fetch"
    async fetch() {
      if(this.$auth.loggedIn && this.$auth.strategy.name == 'customer')
      {
        //fething carts on Rest API
        await this.$store.dispatch('web/cart/getCartsData')
        await this.$store.dispatch('web/cart/getCartPrice')
      }
    },
    //computed
    computed: {
      //cartPrice
      cartPrice() {
        return this.$store.state.web.cart.cartPrice
      },
      //cartTotal
      cartTotal() {
        return this.$store.state.web.cart.carts.length
      },
    },

    //data function
    data() {
      return {
        //state search
        search: ''
      }
    },
    //method
    methods: {
      searchData() {
        this.$router.push({
            name: 'search',
            query: {
            q: this.search
            }
        });
      }
    }


 }
</script>

<style scoped>
.btn {
 font-size: initial;
}
.header-main {
  background-color: #fff;
}
.search-button {
  color: #000;
}
@media (max-width: 768px){
  .search-wrap {
    display: none;
  }
}
.notify {
  background-color: #a66332;
}
</style>