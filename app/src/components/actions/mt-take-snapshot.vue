<template>
  <q-item clickable v-ripple @click="confirm = true" :dense="menu">
    <!-- <q-item-section> -->
    <q-item-section avatar>
      <q-icon name="add_a_photo" />
    </q-item-section>
    <q-item-section v-if="menu">Update Snapshot</q-item-section>
    <q-tooltip
      class="bg-accent text-grey-10"
      anchor="center right"
      self="center left"
      >Overwrites this months Snapshot</q-tooltip
    ><q-dialog v-model="confirm">
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="warning" size="xl" color="warning" />
          <span class="q-ml-sm"
            >Please confirm you want to update this month's snapshot. This
            cannot be undone!</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Confirm"
            color="positive"
            @click="addSnapshot()"
            data-cy="submit"
            v-close-popup="2"
          />
          <q-btn flat label="Cancel" v-close-popup="2" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-item>
</template>

<script>
import { useStore } from "vuex";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useQuasar } from "quasar";
import { ref, computed } from "vue";
export default {
  name: "TakeSnapshot",
  props: {
    menu: Boolean,
    movId: String,
  },
  setup(props) {
    const q = useQuasar();
    const store = useStore();
    const confirm = ref(false);
    function addSnapshot() {
      const updateSnap = httpsCallable(
        getFunctions(),
        "mt-snapshots-updateSnap"
      );

      updateSnap({
        movId: props.movId ? props.movId : movement.value.id,
        createdBy: user.value,
      })
        .then(() => {
          q.notify({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Snapshot Updated",
          });
        })
        .catch((err) => {
          console.error(err);
          q.notify({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!",
          });
        });
    }
    const movement = computed(() => store.state.movement.movement);
    const user = computed(() => store.state.auth.user);
    return { confirm, addSnapshot, movement, user };
  },
};
</script>
