<template>
  <q-card>
    <q-form @submit="renameTree">
      <q-list dense padding bordered>
        <q-item> <q-input label="Tree Label" v-model="label" /> </q-item
      ></q-list>
    </q-form>
  </q-card>
</template>

<script>
import { getFirestore, updateDoc, doc } from "@firebase/firestore";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  name: "RenameTree",
  props: ["tree"],
  setup(props) {
    const q = useQuasar();
    const store = useStore();
    const label = ref("");
    const movement = computed(() => store.state.movement.movement);
    function renameTree(e) {
      updateDoc(
        doc(
          getFirestore(),
          `/movements/${movement.value.id}/trees/${props.tree.id}`
        ),
        { label: label.value }
      )
        .then((res) => {
          return q.notify({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Tree Updated",
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

    onMounted(() => {
      label.value = props.tree.label;
    });
    return { label, movement, renameTree };
  },
};
</script>
