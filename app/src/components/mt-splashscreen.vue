<template>
  <div
    v-if="!isCypress"
    class="bg-primary"
    style="height:100vh; width:100vw; position:absolute; top:0; left:0; z-index:1000;"
  >
    <q-img
      src="app-logo-128x128.png"
      style="top:calc(50% - 104px); left:calc(50% - 64px); position:absolute; width:128px; height:128px;"
    />
    <transition
      v-if="showText"
      appear
      enter-active-class="animated jackInTheBox"
      duration="1000"
    >
      <div
        style="top:calc(50% + 20px); left:0; position:absolute; width:100vw"
        class="row"
      >
        <div class="text-h3 text-center col-12 text-white">
          Movement Tracker
        </div>
        <!-- <div class="row full-width"> -->
        <!-- <div class="col-auto"/> -->
        <!-- <div class="col-1"> -->
        <q-spinner
          size="50px"
          color="secondary"
          style="margin-left:auto;margin-right:auto;"
        />
        <!-- </div> -->
        <!-- <div class="col-auto"/> -->
      </div>
      <!-- </div> -->
    </transition>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      showText: false
    };
  },
  mounted() {
    // console.log(window.Cypress);
    setTimeout(() => {
      this.showText = true;
    }, 500);
  },
  computed: {
    isCypress() {
      return window.Cypress;
    }
  }
};
</script>
