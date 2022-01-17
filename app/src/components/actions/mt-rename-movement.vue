<template>
  <component
    :is="q.platform.is.mobile ? 'q-dialog' : 'q-menu'"
    v-bind="propsData"
    data-cy="rename-movement-comp"
    ref="dialog"
  >
    <q-list dense style="min-width: 100px">
      <q-item>
        <q-input
          label="Movement Name"
          label-stacked
          v-model="name"
          :color="q.dark.isActive ? 'blue-2' : ''"
        />
      </q-item>
      <q-item>
        <q-item-section>
          <q-btn
            @click="renameMovement(name)"
            icon="save"
            dense
            color="positive"
            v-close-popup
          />
        </q-item-section>
      </q-item>
    </q-list>
  </component>
</template>

<script>
import { rename } from "./../../scripts/movement.js";
import { useQuasar } from "quasar";
import { ref, computed, watch } from "vue";
export default {
  name: "RenameMovement",
  props: {
    localMovement: {
      id: "",
      name: "",
    },
  },
  setup(props) {
    const q = useQuasar();
    const name = ref("");
    const dialog = ref(null);
    function renameMovement(newName) {
      rename(props.localMovement.id, newName);
    }
    function show() {
      dialog.show();
    }
    function hide() {
      dialog.hide();
    }
    const propsData = computed(() => {
      if (q.platform.is.mobile) {
        return {};
      }
      return { anchor: "top right", self: "top left" };
    });

    watch(props.localMovement, () => {
      name.value = props.localMovement.name;
    });

    return { q, propsData, renameMovement, show, hide };
  },
};
</script>
