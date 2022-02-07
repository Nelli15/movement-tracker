<template>
  <q-item clickable v-ripple @click="deleteDialog.toggle()" :dense="menu">
    <!-- <q-item-section> -->
    <q-item-section avatar>
      <q-icon
        name="
          delete
        "
      />
    </q-item-section>
    <q-item-section v-if="menu">Delete Tree</q-item-section>
    <q-tooltip
      class="bg-accent text-grey-10"
      anchor="center right"
      self="center left"
      >Deletes the currently visible Tree</q-tooltip
    >
    <mt-remove-dialog
      ref="deleteDialog"
      :name="treeOpt.label"
      type="Tree"
      @confirmed="confirmed"
      @change="($event) => (confirm = $event)"
    />
  </q-item>
</template>

<script>
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import { ref, computed, defineAsyncComponent, watch } from 'vue';
import { deleteDoc, doc, getFirestore } from '@firebase/firestore';
export default {
  name: 'Delete-Tree',
  props: {
    menu: Boolean,
    treeOpt: { label: String, id: String, tree: [] },
  },
  emits: ['open'],
  setup(props, { emit }) {
    const q = useQuasar();
    const store = useStore();
    const confirm = ref(false);
    const removeLoading = ref(false);
    const deleteDialog = ref(null);
    function confirmed() {
      const id = props.treeOpt.id;
      return deleteDoc(
        doc(getFirestore(), `/movements/${movement.value.id}/trees/${id}`)
      )
        .then((res) => {
          store.commit('movement/removeTree', id);
          return q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_download',
            message: 'Tree Deleted',
          });
        })
        .catch((err) => {
          console.error(err);
          q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          });
        });
    }
    const movement = computed(() => store.state.movement.movement);
    const user = computed(() => store.state.auth.user);
    watch(confirm, () => {
      emit('open', confirm.value);
    });
    return {
      q,
      confirm,
      confirmed,
      movement,
      user,
      removeLoading,
      deleteDialog,
      treeOpt: props.treeOpt ? props.treeOpt : { label: '' },
    };
  },
  components: {
    'mt-remove-dialog': defineAsyncComponent(() =>
      import('./mt-remove-dialog.vue')
    ),
  },
};
</script>
