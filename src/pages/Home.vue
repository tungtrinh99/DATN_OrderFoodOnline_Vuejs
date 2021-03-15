<template>
  <a-layout>
    <a-layout-content style="padding: 0 50px">
      <div
        class="now-banner"
        :style="{
          'background-image':
            'url(' +
            require('./../assets/images/Background/back-ground.jpg') +
            ')',
        }"
      >
        <div class="container">
          <form-search></form-search>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import FormSearch from "../components/Form/FormSearchHomePage.vue";
export default {
  components: {
    FormSearch,
  },
};
</script>
<style scoped>
.now-banner {
  height: 100vh;
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  z-index: 0;

  background-size: cover;
  overflow: hidden;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.now-banner .container {
  height: 100%;
  position: relative;
}
</style>
