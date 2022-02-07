<template>
  <q-card>
    <q-form @submit="createTree">
      <q-list dense padding bordered>
        <q-item>
          <q-input
            label="Tree Label"
            v-model="newTree.label"
            :color="q.dark.isActive ? 'blue-2' : ''"
          />
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn
              icon="add"
              label="Create"
              type="submit"
              v-close-popup
              color="positive"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-form>
  </q-card>
</template>

<script>
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
import { getFirestore, addDoc, collection } from '@firebase/firestore';

export default {
  name: 'CreateTree',
  setup() {
    const q = useQuasar();
    const store = useStore();
    const newTree = ref({
      label: '',
      importedBy: [],
    });
    function createTree(e) {
      addDoc(
        collection(getFirestore(), `/movements/${movement.value.id}/trees`),
        newTree.value
      )
        .then((res) => {
          return q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_download',
            message: 'Tree Created',
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
    return { q, newTree, createTree };
  },
};
</script>
