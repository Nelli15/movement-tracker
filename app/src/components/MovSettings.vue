<template>
  <q-card>
    <q-card-section
      ><div class="text-center text-h6 bg-primary text-white shadow-2">
        Movement Settings
      </div></q-card-section
    >
    <q-card-section>
      <div class="row">
        <div class="col-4" data-cy="rename-movement">
          <q-input
            :model-value="movement.name"
            @update:model-value="
              e => {
                updateMovement({ key: 'name', val: e });
              }
            "
            label="Movement Name"
            :color="q.dark.isActive ? 'blue-2' : ''"
            debounce="3000"
          />
        </div>
        <div class="col-4 q-px-sm" data-cy="change-mov-color">
          <q-input
            :model-value="movement.style ? movement.style.backgroundColor : ''"
            @update:model-value="
              e => {
                updateMovement({ key: 'style.backgroundColor', val: e });
              }
            "
            label="Movement Color"
            :color="q.dark.isActive ? 'blue-2' : ''"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color
                    :model-value="
                      movement.style ? movement.style.backgroundColor : ''
                    "
                    @update:model-value="
                      e => {
                        updateMovement({
                          key: 'style.backgroundColor',
                          val: e
                        });
                      }
                    "
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-4" data-cy="defaultTree">
          <q-select
            :options="treeOpts"
            :model-value="movement.defaultTree"
            @update:model-value="
              e => {
                updateMovement({ key: 'defaultTree', val: e });
              }
            "
            label="Default Tree"
            :color="q.dark.isActive ? 'blue-2' : ''"
            option-value="id"
            map-options
            emit-value
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, computed } from 'vue';
import { useQuasar } from 'quasar';
import {
  doc,
  getFirestore,
  updateDoc,
  FirestoreError
} from '@firebase/firestore';
export default defineComponent({
  props: {},
  setup(props) {
    const q = useQuasar();
    const store = useStore();
    const movement = computed(() => store.state.movement.movement);
    const permissions = computed(() => store.state.movement.permissions);
    const treeOpts = computed(() => {
      return store.getters['movement/treeOpts'];
    });

    async function updateMovement({ key, val }: { key: string; val: string }) {
      return await updateDoc(
        doc(getFirestore(), `/movements/${movement.value.id}`),
        { [key]: val }
      )
        .then(() => {
          return q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_download',
            message: 'Movement Updated'
          });
        })
        .catch((err: FirestoreError) => {
          console.log(err);
          q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!'
          });
        });
    }
    return { q, movement, treeOpts, permissions, updateMovement };
  },
  components: {}
});
</script>
