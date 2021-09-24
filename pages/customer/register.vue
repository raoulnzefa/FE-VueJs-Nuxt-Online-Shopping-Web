<template>
  <div class="pt-3 pb-3" style="background: rgb(255, 255, 255);">
    <!-- <div class="fade-in"> -->
      <div class="row justify-content-center">
        <div class="col-md-7" style="background: rgb(255, 255, 255);">
          <div class="card-group">
            <div class="card border-top border-0 shadow-sm rounded">
              <div class="card-body">
                <h3 style="color:#000;">REGISTER</h3>
                <hr>
                  <div v-if="validation.message" class="mt-2">
                    <b-alert show variant="danger">{{ validation.message }}</b-alert>
                  </div>
                  <form @submit.prevent="register">
                      <div class="row" style="background: rgb(255, 255, 255);">
                        <div class="col-md-6">
                            <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                <span class="input-group-text">
                                  <i class="fa fa-user"></i>
                                </span>
                              </div>
                              <input class="form-control shadow-none" v-model="user.name" type="text" placeholder="Full Name">
                            </div>
                            <div v-if="validation.name" class="mt-2">
                              <b-alert show variant="danger">{{ validation.name[0] }}</b-alert>
                            </div>
                        </div>
                        <div class="col-md-6">
                          <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                <span class="input-group-text">
                                  <i class="fa fa-envelope"></i>
                                </span>
                              </div>
                              <input class="form-control shadow-none" v-model="user.email" type="email" placeholder="Email Address">
                          </div>
                          <div v-if="validation.email" class="mt-2">
                            <b-alert show variant="danger">{{ validation.email[0] }}</b-alert>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                          <div class="col-md-6">
                            <div class="input-group mb-4">
                              <div class="input-group-prepend">
                                <span class="input-group-text">
                                  <i class="fa fa-lock"></i>
                                </span>
                              </div>
                              <input class="form-control shadow-none" v-model="user.password" type="password" placeholder="Password">
                            </div>
                            <div v-if="validation.password" class="mt-2">
                              <b-alert show variant="danger">{{ validation.password[0] }}</b-alert>
                            </div>
                          </div>
                          <div class="col-md-6">
                              <div class="input-group mb-4">
                                <div class="input-group-prepend">
                                  <span class="input-group-text">
                                    <i class="fa fa-lock"></i>
                                  </span>
                                </div>
                                <input class="form-control shadow-none" v-model="user.password_confirmation" type="password" placeholder="Password Confirmation">
                              </div>
                          </div>
                      </div>
                      <div class="row">
                        <div class="col-12">
                          <button class="btn btn-light shadow-sm rounded-sm px-4" type="submit" style="font-weight:900;color:#000;">REGISTER</button>
                          <button class="btn btn-light shadow-sm rounded-sm px-4" type="reset" style="font-weight:900;color:#000;">RESET</button>
                        </div>
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-3 mb-5"> Already Have An Account? 
          <nuxt-link :to="{name: 'customer-login'}" class="font-weight-bold" style="text-decoration:none;"> Login Here! </nuxt-link>
        </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
    //middleware
    middleware: 'authenticated',
    //layout
    layout: 'default',
      //meta
      head() {
        return {
            title: 'Register - Customer',
        }
    },
    //data function
    data() {
      return {
      //state user
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      //validation
      validation: []
      }
    },
    //method
    methods: {
      //method "register"
      async register() {
        //dispatch to action "storeRegister"
        await this.$store.dispatch('customer/customer/storeRegister', {
            name: this.user.name,
            email: this.user.email,
            password: this.user.password,
            password_confirmation: this.user.password_confirmation
        })
        .then(() => {
            //sweet alert
            this.$swal.fire({
              title: 'REGISTER BERHASIL!',
              text: "Proses Register Berhasil!",
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            })
            //redirect
            this.$router.push({
              name: 'customer-login'
            })
        })
        .catch(error => {
          //assign validation
          this.validation = error.response.data
        })
      }
   }

}
</script>

<style>

</style>