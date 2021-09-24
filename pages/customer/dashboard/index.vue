<template>
<div class="pt-5 pb-5" style="background: rgb(255, 255, 255);">
  <div class="container" style="background: rgb(255, 255, 255);">
              <Breadcrumbs />
    <div class="row" style="background: rgb(255, 255, 255);">
        <div class="col-md-4" style="background: rgb(255, 255, 255);">
        <!-- sidebar -->
        <Sidebar />
        <!-- end sidebar -->
        </div>
        <div class="col-md-8" style="background: rgb(255, 255, 255);">
          <div class="card border-0 rounded shadow-non border-top">
            <div class="card-body">
              <h5><i class="fa fa-tachometer-alt" style="color#000;"></i> DASHBOARD</h5>
              <hr>
              <div class="row">
                <div class="col-md-12">
                  <div class="alert alert-success" role="alert"> Welcome! <strong>{{ $auth.user.name }}</strong></div>
                </div>
              </div>
              <div class="row">
                <div class="col-6 col-lg-4">
                  <div class="card rounded shadow-sm overflow-hidden">
                    <div class="card-body p-0 d-flex align-items-center">
                      <div class="bg-primary py-4 px-5 mfe-3">
                        <i class="fas fa-circle-notch fa-spin fa-2x"></i>
                      </div>
                      <div>
                        <div class="text-value text-primary">{{ pending }}</div>
                        <div class="text-muted text-uppercase font-weight-bold small">PENDING</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-lg-4">
                  <div class="card rounded shadow-sm overflow-hidden">
                    <div class="card-body p-0 d-flex align-items-center">
                      <div class="bg-success py-4 px-5 mfe-3">
                        <i class="fas fa-check-circle fa-2x"></i>
                      </div>
                      <div>
                        <div class="text-value text-success">{{ success }}</div>
                        <div class="text-muted text-uppercase font-weight-bold small">SUCCESS</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-lg-4">
                  <div class="card rounded shadow-sm overflow-hidden">
                    <div class="card-body p-0 d-flex align-items-center">
                      <div class="bg-warning py-4 px-5 mfe-3">
                        <i class="fas fa-exclamation-triangle fa-2x"></i>
                      </div>
                      <div>
                        <div class="text-value text-warning">{{ expired }}</div>
                        <div class="text-muted text-uppercase font-weight-bold small">EXPIRED</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-lg-4">
                  <div class="card rounded shadow-sm overflow-hidden">
                    <div class="card-body p-0 d-flex align-items-center">
                      <div class="bg-danger py-4 px-5 mfe-3">
                        <i class="fas fa-times-circle fa-2x"></i>
                      </div>
                      <div>
                        <div class="text-value text-danger">{{ failed }}</div>
                        <div class="text-muted text-uppercase font-weight-bold small">FAILED</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
 </div>
</template>

<script>
    //import sidebar
    import Sidebar from '@/components/web/sidebar.vue'
    import Breadcrumbs from '@/components/web/breadcrumbs.vue'
    export default {
    //middleware
    middleware: 'isCustomer',
    //layout
    layout: 'default',
    //register components
    components: {
      Sidebar,
      Breadcrumbs
    },
    //meta
    head() {
      return {
        title: 'Dashboard - Customer',
      }
    },
    
    async asyncData({ $axios }) {
      //fetching dashboard
      const dashboard = await $axios.$get('/api/customer/dashboard')
      return {
          //count statistik
          'pending': dashboard.data.count.pending,
          'success': dashboard.data.count.success,
          'expired': dashboard.data.count.expired,
          'failed': dashboard.data.count.failed,
      }
    },
 }
</script>

<style scoped>
@media (max-width: 414px){
.col-6{
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
}
}
</style>