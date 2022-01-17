<template>
  <component
    :is="Platform.is.mobile ? 'q-dialog' : 'q-menu'"
    v-bind="propsData"
    data-cy="change-movement-color-comp"
  >
    <q-list dense style="min-width: 100px">
      <q-item>
        <!-- <q-color
          label="Movement Color"
          label-stacked
          v-model="color"
          @change="changeMovementColor($event)"
        /> -->
        <q-input
          v-model="color"
          :rules="['hexColor']"
          label="Movement Color"
          label-stacked
          :color="Dark.isActive ? 'blue-2' : ''"
          @update:model-value="changeMovementColor($event)"
          debounce="1000"
        >
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color
                  v-model="color"
                  no-header
                  @change="changeMovementColor($event)"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-item>
    </q-list>
  </component>
</template>

<script>
import { debounce, Platform, Dark } from "quasar";
import { changeColor } from "./../../scripts/movement.js";
import { mapMutations, mapGetters, mapState } from "vuex";

export default {
  name: "ChangeColorMovement",
  props: {
    localMovement: {
      id: "",
      name: "",
    },
  },
  data() {
    return {
      color: "",
    };
  },
  created() {
    this.changeColor = debounce(changeColor, 4000);
    this.Platform = Platform;
    this.Dark = Dark;
  },
  methods: {
    ...mapMutations("movements", ["setMovColor"]),
    changeMovementColor(newColor) {
      // let oldColor = this.localMovement.style.backgroundColor
      this.setMovColor({
        mov: this.$route.path.includes("home")
          ? this.movements[this.localMovement.id]
          : this.movement,
        color: newColor,
      });
      changeColor(this.localMovement.id, newColor, this);
    },
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },
  },
  computed: {
    ...mapGetters("movements", ["movements"]),
    ...mapState("movement", ["movement"]),
    propsData() {
      if (Platform.is.mobile) {
        return { ref: "dialog" };
      }
      return { anchor: "top right", self: "top left" };
    },
  },
  watch: {
    localMovement: {
      immediate: true,
      deep: true,
      handler() {
        this.color = this.localMovement.style.backgroundColor;
      },
    },
  },
};
</script>
