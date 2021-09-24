<template>
<div style="background-image: url('images/header.png');linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)) ," class="jumbotron bg-cover text-white">
    <div class="container text-center">
        <div class="row gx-5 justify-content-center">
            <div class="col-lg-6">
                <div class="text-center my-5">
                    <h2 class="display-5 fw-bolder text-white mb-2">Stay Home and Shop Online</h2>
                    <p class="lead text-black bold -50 mb-4">Creative graphic design, Bullet Journal and Illustrations!</p>
                    <p class="lead text-black bold -50 mb-4">C O L L E C T I O N <span class="ml-2">2 0 2 1</span></p>
                    <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
                        <nuxt-link :to="{name: 'products'}">
                            <h2 class="btn btn-white text-uppercase letter-spacing-05 text-center px-4" style="font-weight:700;color:#000;">SHOP NOW</h2>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
export default {

}
</script>

<style scoped>
.bg-cover {
    background-size: cover !important;
}
body {
    min-height: 100vh;
}
.jumbotron {
    padding: 2rem 1rem;
    margin-bottom: 0rem;
    border-radius: .3rem;
    background-color: #d8dbe0;
}
.btn-white{
    color:#000;
    background-color:#fff;
    border-color:#fff;
    box-shadow:none;
    border-radius: 0px;
    font-size: 20px;
    font-weight: 900;
}
.btn-white:hover{
    color:#212529;
    background-color:#ececec;
    border-color:#e6e6e6
}
.btn-white:focus,.btn-white.focus{
    color:#212529;
    background-color:#ececec;
    border-color:#e6e6e6;
    box-shadow:0 0 0 .2rem rgba(222,222,223,.5)
}
</style>