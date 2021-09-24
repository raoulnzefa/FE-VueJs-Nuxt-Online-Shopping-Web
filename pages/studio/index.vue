<template>
  <section class="pt-5 pb-5" style="background: rgb(255, 255, 255);">
    <div class="container" style="background: rgb(255, 255, 255);">
      <Breadcrumbs />
      <div class="row align-items-center">
        <div class="col-md-6">
          <img src="images/studio.jpg" alt="Bobby Bar Stools" class="d-block w-100">
        </div>
        <div class="col-md-6">
          <h2 class="fs-30 fs-md-60 mb-5" style="color:#000;">Creative graphic design,<br>Bullet Journal and Illustrations!</h2>
            <p class="mb-7" style="text-align:justify;">In 2021 at the age of 21, we started to think that we want to do something
              that not only give a profit for us, but also for anyone we’ll be working
              with and turn the projects into a valuable thing.</p>
            <nuxt-link :to="{name: 'products'}" class="btn btn-light text-uppercase letter-spacing-05" style="color:#000;font-weight:900;">SHOP COLLECTION</nuxt-link>
        </div>
      </div>
    </div>
    <div class="container mt-5 mb-5">
      <div class="embed-responsive embed-responsive-16by9">
        <iframe width="853" height="480" src="https://www.youtube.com/embed/PNGkxr2PCbg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </section>
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

<style>
</style>