<template>
  <div
    v-if="!isCypress && !timedout"
    class="bg-primary"
    style="
      height: 100vh;
      width: 100vw;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
    "
  >
    <q-img
      src="app-logo-128x128.png"
      style="
        top: calc(50% - 104px);
        left: calc(50% - 64px);
        position: absolute;
        width: 128px;
        height: 128px;
      "
    />
    <transition
      v-if="showText"
      appear
      enter-active-class="animated jackInTheBox"
      duration="1000"
    >
      <div
        style="top: calc(50% + 20px); left: 0; position: absolute; width: 100vw"
        class="row"
      >
        <div class="text-h3 text-center col-12 text-white">
          Movement Tracker
        </div>
        <div
          class="text-h5 text-center col-12 text-white q-my-md"
          v-if="message"
        >
          {{ message }}
        </div>
        <!-- <div class="row full-width"> -->
        <!-- <div class="col-auto"/> -->
        <!-- <div class="col-1"> -->
        <q-spinner
          size="50px"
          color="secondary"
          style="margin-left: auto; margin-right: auto"
        />
        <!-- </div> -->
        <!-- <div class="col-auto"/> -->
      </div>
      <!-- </div> -->
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
export default {
  props: {
    message: String,
  },
  setup() {
    const showText = ref(false);
    const timedout = ref(false);

    onMounted(() => {
      // console.log(window.Cypress);
      setTimeout(() => {
        showText.value = true;
      }, 500);
      setTimeout(() => {
        timedout.value = true;
      }, 5000);
    });
    const isCypress = computed(() => {
      return window.Cypress;
    });
    return {
      showText,
      timedout,
      isCypress,
    };
  },
};
</script>
