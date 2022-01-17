<template>
  <q-dialog v-model="visible" data-cy="delete-dialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="text-h6">Delete this {{ type }}?</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        Are you sure you want to delete the {{ type }}: {{ name }}?
        <q-input
          outlined
          v-model="confirmDelete"
          label="Type DELETE to confirm the deletion!"
          :rules="[(val) => val == 'DELETE' || 'Input must match DELETE']"
          class="q-pt-md"
          autofocus
          :color="Dark.isActive ? 'blue-2' : ''"
        >
          <template v-slot:append>
            <q-btn
              data-cy="delete-submit-btn"
              @click="confirmed"
              icon="delete"
              color="negative"
              dense
            />
          </template>
        </q-input>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { Dark } from "quasar";
export default {
  props: {
    name: String,
    type: String,
  },
  data() {
    return {
      confirmDelete: "",
      visible: false,
    };
  },
  created() {
    this.Dark = Dark;
  },
  methods: {
    confirmed() {
      // console.log("confirmed", this.confirmDelete);
      if (this.confirmDelete === "DELETE") {
        // this.show = false
        this.$emit("confirmed");
      }
    },
    show() {
      // console.log("opening");
      this.visible = true;
    },
    hide() {
      // console.log("hide");
      this.visible = false;
    },
    toggle() {
      // console.log("hide");
      this.visible = !this.visible;
    },
  },
  watch: {
    visible() {
      // console.log("close");
      this.$emit("change", this.visible);
    },
  },
};
</script>
