<template>
<div class="pt-5 pb-5" style="background: rgb(255, 255, 255);">
  <div class="container" style="background: rgb(255, 255, 255);">
      <Breadcrumbs />
      <div class="row" v-if="carts.length > 0">
        <!-- jika data carts ada, maka tampilkan -->
          <div class="col-md-7">
            <div class="card border-0 rounded border-top shadow-none">
              <div class="card-body">
                <h5>ORDER DETAILS</h5>
                <hr>
                <table class="table table-cart">
                  <tbody>
                    <client-only>
                      <tr v-for="cart in carts" :key="cart.id" style="background: #fff;">
                        <td class="b-none" width="25%">
                          <div class="wrapper-image-cart">
                            <img :src="cart.product.image" style="width:100%;">
                          </div>
                        </td>
                        <td class="b-none" width="50%">
                          <h5><b>{{ cart.product.title }}</b></h5>
                          <table class="table-borderless table-font">
                            <tr>
                              <td style="padding: .20rem">QTY</td>
                              <td style="padding: .20rem">:</td>
                              <td style="padding: .20rem"><b>{{ cart.qty }}</b></td>
                            </tr>
                          </table>
                        </td>
                        <td class="b-none text-right">
                           <p class="m-0 font-weight-bold">IDR. {{ formatPrice(cart.price) }}</p>
                           <br>
                           <div class="text-right">
                              <button @click.prevent="removeCart(cart.id)" class="btn btn-sm btn-light">
                                <i class="fa fa-trash"></i>
                              </button>
                          </div>
                        </td>
                      </tr>
                    </client-only>
                  </tbody>
                </table>
                <table class="table table-default">
                  <tbody>
                    <tr>
                        <td class="set-td text-left" width="60%">
                          <p class="m-0">Amount</p>
                        </td>
                        <td class="set-td text-right" width="30%">&nbsp; :  IDR.</td>
                        <td class="text-right set-td "><p class="m-0" id="subtotal"> {{ formatPrice(cartPrice) }}</p></td>
                      </tr>
                      <tr>
                        <td class="set-td text-left border-0">
                          <p class="m-0">Delivery Cost (<strong style="color:#000;">{{ cartWeight }}</strong> gram)</p>
                        </td> 
                        <td class="set-td border-0 text-right">&nbsp; : IDR.</td>
                        <td class="set-td border-0 text-right">
                          <p class="m-0" id="ongkir-cart">{{ formatPrice(courier.courier_cost) }}</p>
                        </td>
                      </tr>
                    <tr>
                    <td class=" text-left border-0">
                      <p class="font-weight-bold m-0 h5" style="color:#000;">Grand Total </p>
                    </td>
                    <td class=" border-0 text-right">&nbsp;: IDR.</td>
                      <td class=" border-0 text-right">
                      <p class="font-weight-bold m-0 h5" align="right">{{ formatPrice(grandTotal) }}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="card border-0 rounded border-top shadow-none">
            <div class="card-body">
              <h5>CUSTOMER DETAILS</h5>
              <hr>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="font-weight-bold" style="color:#000;">FULL NAME</label>
                    <input type="text" class="form-control shadow-none" id="nama_lengkap" placeholder="Full Name" v-model="customer.name">
                    <div v-if="validation.name" class="mt-2 alert alert-danger">Input Your Full Name</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="font-weight-bold" style="color:#000;">NO. Phone / WHATSAPP</label>
                      <input type="number" class="form-control shadow-none" id="phone" placeholder="No. Phone / WhatsApp" v-model="customer.phone">
                      <div v-if="validation.phone" class="mt-2 alert alert-danger">Input Your Number Phone</div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="font-weight-bold" style="color:#000;">Province</label>
                      <select class="form-control shadow-none" v-model="rajaongkir.province_id" @change="getCities">
                        <option value="">-- choose province --</option>
                        <option v-for="province in provinces" :key="province.id" :value="province.province_id"> {{ province.name }}</option>
                      </select>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="font-weight-bold">City / District</label>
                        <select class="form-control shadow-none" v-model="rajaongkir.city_id" @change="showCourier">
                          <option value="">-- choose city --</option>
                          <option v-for="city in cities" :key="city.id" :value="city.city_id">{{ city.name }}</option>
                        </select>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group" v-if="courier.showCourier">
                    <label class="font-weight-bold" style="color:#000;">Delivery Courier</label>
                    <br>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input select-courier" type="radio" name="courier" id="ongkos_kirim-jne" value="jne" v-model="courier.courier_name" @change="showService">
                        <label class="form-check-label font-weight-bold mr-4" for="ongkos_kirim-jne"> JNE</label>
                        <input class="form-check-input select-courier" type="radio" name="courier" id="ongkos_kirim-tiki" value="tiki" v-model="courier.courier_name" @change="showService">
                        <label class="form-check-label font-weight-bold mr-4" for="ongkos_kirim-jnt">TIKI</label>
                        <input class="form-check-input select-courier" type="radio" name="courier" id="ongkos_kirim-pos" value="pos" v-model="courier.courier_name" @change="showService">
                        <label class="form-check-label font-weight-bold" for="ongkos_kirim-jnt">POS</label>
                      </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group" v-if="courier.showService">
                    <hr>
                    <label class="font-weight-bold" style="color:#000;">Courier Services</label>
                    <br>
                    <div v-for="value in costs" :key="value.service" class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="cost" :id="value.service" :value="value.cost[0].value+'|'+value.service" v-model="courier.courier_service_cost" @change="getServiceCost">
                      <label class="form-check-label font-weight-normal mr-5" :for="value.service">{{ value.service }} - IDR. {{ formatPrice(value.cost[0].value) }}</label>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="font-weight-bold" style="color:#000;">Complete Address</label>
                      <textarea class="form-control shadow-none" id="alamat" rows="3" placeholder="Alamat Lengkap" v-model="customer.address"></textarea>
                      <div v-if="validation.address" class="mt-2 alert alert-danger">Input Your Address</div>
                  </div>
                </div>
                <div @click.prevent="checkout" class="col-md-12" v-if="btnCheckout">
                  <button class="btn btn-light btn-lg btn-block" style="color:#000;font-weight:700;">CHECKOUT</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center" v-else>
      <!-- data carts tidak tersedia -->
      <div class="col-md-10">
        <div class="card border-0 rounded border-top shadow-none">
          <div class="card-body">
            <div class="col-sm-12 empty-cart-cls text-center">
              <img src="/images/shopping-cart.png" width="150" height="150" class="img-fluid mb-4 mr-3">
                <h3><strong>Empty Shopping Cart</strong></h3>
                  <nuxt-link :to="{name: 'products'}" class="btn btn-light btn-lg mt-4" data-abc="true" style="color:#000;font-weight:900;">CONTINUE SHOPPING</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Breadcrumbs from '@/components/web/breadcrumbs.vue'
export default {
    //middleware
    middleware: 'isCustomer',
    //meta
    head() {
      return {
        title: 'Cart - @andaristudio - Creative graphic design, Bullet Journal and Illustrations!',
        meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Cart - @andaristudio - Creative graphic design, Bullet Journal and Illustrations!'
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Cart - @andaristudio - Creative graphic design, Bullet Journal and Illustrations!'
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: '/images/shopping-cart.png'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Cart - Officially Online Store Aesthetic Stuff'
        },
      ]
      }
    },
    //register components
    components: {
        Breadcrumbs
    },
    //hook asyncData
    async asyncData({ store }) {
      //call action vuex "getCartsData"
      await store.dispatch('web/cart/getCartsData')
      //call action vuex "getProvincesData"
      await store.dispatch('web/rajaongkir/getProvincesData')

    },
    //computed
    computed: {
      //cart data
      carts() {
        return this.$store.state.web.cart.carts
      },
      //cart weight
      cartWeight() {
        return this.$store.state.web.cart.cartWeight
      },
      //cart price
      cartPrice() {
        return this.$store.state.web.cart.cartPrice
      },
      //provinces
      provinces() {
        return this.$store.state.web.rajaongkir.provinces
      },
      //cities
      cities() {
        return this.$store.state.web.rajaongkir.cities
      },
      //costs
      costs() {
        return this.$store.state.web.rajaongkir.costs
      }
    },
    //data function
    data() {
      return {
        //state customer
        customer: {
          name: '',
          phone: '',
          address: ''
        },
        //state validation
        validation: {
          name: false,
          phone: false,
          address: false
        },
        //state rajaongkir
        rajaongkir: {
          province_id: '',
          city_id: ''
        },
        //state courier
        courier: {
          showCourier: false,
          showService: false,
          courier_name: '',
          courier_service_cost: '',
          courier_service: '',
          courier_cost: ''
        },
        //grandTotal
        grandTotal: 0,
        //state button checkout
        btnCheckout: false

      }
    },
    //method
    methods: {
        //method "removeCart"
        async removeCart(cartId) {
          await this.$swal.fire({
            title: 'Are You Sure ?',
            text: "Want To Delete This Product !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Delete!',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
                //call action vuex "getCartsData"
                this.$store.dispatch('web/cart/removeCart', {
                cart_id: cartId
              })
              .then(async () => {
                //dispatch action "getCartPrice"
                await this.$store.dispatch('web/cart/getCartPrice')
                //sum grandTotal after remove cart
                this.grandTotal = parseInt(this.cartPrice) + parseInt(this.courier.courier_cost)

                //alert
                this.$swal.fire({
                  title: 'Success!',
                  text: "Product Successfully Removed From Cart!",
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2000
                })
              })
            }
          })
        },
        //method "getCities"
        getCities() {
          this.$store.dispatch('web/rajaongkir/getCitiesData', {
          province_id: this.rajaongkir.province_id
          })
        },
        //method "showCourier"
        showCourier() {
          this.courier.showCourier = true
        },
        //method "showService"
        async showService() {
          //check weight product
          if (this.cartWeight == 0) {
          alert('Please select the product first!')
          return
          }
          await this.$store.dispatch('web/rajaongkir/getOngkirData', {
            destination: this.rajaongkir.city_id,
            weight: this.cartWeight,
            courier: this.courier.courier_name
          })
          .then(() => {
            this.courier.showService = true
          })
        },
        //method "getServiceCost"
        getServiceCost() {
          //split value dengan menghapus string -> |
          let shipping = this.courier.courier_service_cost.split("|")
          //set state cost dan service
          this.courier.courier_cost = shipping[0]
          this.courier.courier_service = shipping[1]
          //sum grandTotal
          this.grandTotal = parseInt(this.cartPrice) +
          parseInt(this.courier.courier_cost)
          //show button checkout
          this.btnCheckout = true
        },
        //method "checkout"
        async checkout() {
          //ceck apakah ada nama, phone, address dan berat produk ?
          if (this.customer.name && this.customer.phone &&
          this.customer.address && this.cartWeight) {
            //define formData
            let formData = new FormData();
            formData.append('courier', this.courier.courier_name)
            formData.append('courier_service',
            this.courier.courier_service)
            formData.append('courier_cost', this.courier.courier_cost)
            formData.append('weight', this.cartWeight)
            formData.append('name', this.customer.name)
            formData.append('phone', this.customer.phone)
            formData.append('address', this.customer.address)
            formData.append('city_id', this.rajaongkir.city_id)
            formData.append('province_id', this.rajaongkir.province_id)
            formData.append('grand_total', this.grandTotal)
            //sending data to action "storeCheckout" vuex
            await this.$store.dispatch('web/checkout/storeCheckout',formData)
            //success
            .then(response => {
              //sweet alert
              this.$swal.fire({
                title: 'SUCCESS!',
                text: "Checkout Successful!",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
              //redirect route "detail invoice"
              this.$router.push({
                name: 'customer-invoices-show-snap_token',
                params: {
                  snap_token: response.snap_token
                }
              })
            })
          }
          //check validasi name
          if (!this.customer.name) {
            this.validation.name = true
          }
          //check validasi phone
          if (!this.customer.phone) {
            this.validation.phone = true
          }
          //check validasi address
          if (!this.customer.address) {
            this.validation.address = true
          }
        }
          
    }
}
</script>

<style scoped>
.table-font {
 font-size: 14px;
 }
input {
  transition: all 0.25s linear;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
input {
  outline: none;
}
</style>