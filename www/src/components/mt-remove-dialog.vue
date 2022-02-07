<template>
  <q-dialog v-model="show">
    <q-card>
      <q-card-section class="row items-center">
        <div class="text-h6">Delete this {{ type }}?</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <form @submit="confirmed">
          Are you sure you want to delete the {{ type }}: {{ name }}?
          <!-- <q-banner inline-actions> -->
          <q-input
            outlined
            v-model="confirmDelete"
            label="Type DELETE to confirm the deletion!"
            :rules="[val => val == 'DELETE' || 'Input must match DELETE']"
            class="q-pt-md"
            autofocus
          >
            <template v-slot:append>
              <q-btn
                type="submit"
                @click="confirmed"
                icon="delete"
                color="negative"
                dense
              />
            </template>
          </q-input>
        </form>
        <!-- </q-banner> -->
      </q-card-section>
      <q-inner-loading :showing="loading">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    name: String,
    type: String,
    show: Boolean,
    loading: Boolean
  },
  emits: ["confirmed"],
  data() {
    return {
      confirmDelete: ""
    };
  },
  methods: {
    confirmed() {
      // console.log('confirmed', this.confirmDelete)
      if (this.confirmDelete === "DELETE") {
        // this.show = false
        this.$emit("confirmed");
      }
    }
  },
  watch: {
    show() {
      console.log("close");
      this.$emit("change", this.show);
    }
  }
};
</script>
