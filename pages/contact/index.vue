<template>
<div class="pt-5 pb-4" style="background: rgb(255, 255, 255);">
  <div class="container" style="background: rgb(255, 255, 255);">
    <Breadcrumbs />
    <div class="row">
      <div class="col-md-4 mb-4" style="background: rgb(255, 255, 255);">
         <div class="single-contact-info-item">
              <div class="icon">
                  <i class="lnr lnr-clock"></i>
              </div>
              <div class="iconbox-desc">
                  <h6 class="mb-10">Work Time</h6>
                  <p>Monday – Friday : 07:00 – 19:00 <br>Saturday – Sunday : 07:00 – 19:00</p>
              </div>
          </div>
          <div class="single-contact-info-item">
              <div class="icon">
                  <i class="lnr lnr-phone-handset"></i>
              </div>
              <div class="iconbox-desc">
                  <h6 class="mb-10">Our Phone Number</h6>
                  <p> +(62) 822 - 1302 - 0687 <br>  +(62) 813 - 8996 - 50119</p>
              </div>
          </div>
          <div class="single-contact-info-item">
              <div class="icon">
                  <i class="far fa-envelope-open"></i>
              </div>
              <div class="iconbox-desc">
                  <h6 class="mb-10">Our Email</h6>
                  <p>andaristudio@gmail.com <br>arizkalianda@gmail.com</p>
              </div>
          </div>
          <div class="single-contact-info-item">
              <div class="icon">
                  <i class="lnr lnr-map-marker"></i>
              </div>
              <div class="iconbox-desc">
                  <h6 class="mb-10">Our Location</h6>
                  <p>15152 Ciledug, Tangerang City <br>andaristudio, Indonesia, INA.</p>
              </div>
          </div>
        </div>
        <div class="col-md-8 mapouter" style="background: rgb(255, 255, 255);">
           <div class="google-maps">
              <iframe width="800" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Ciledug&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                <a href="https://www.whatismyip-address.com/divi-discount/"></a><br>
                <!-- <style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}</style>
                <style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style> -->
            </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import Breadcrumbs from '@/components/web/breadcrumbs.vue'
export default {
    //register components
    components: {
        Breadcrumbs
    }
}
</script>

<style scoped>
.google-maps {
    position: relative;
    padding-bottom: 75%; 
    height: 0;
    overflow: hidden;
}
.google-maps iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
}
</style>