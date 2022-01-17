<template>
  <q-card style="width: 200px" data-cy="add-sub-tree-comp">
    <q-list bordered dense padding>
      <q-item>
        <q-item-section>
          <q-select
            v-model="subTree"
            label="Tree"
            :options="treeOpts"
            option-label="label"
            option-value="id"
            option-dense
            emit-value
            map-options
            :color="q.dark.isActive ? 'blue-2' : ''"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-btn
            icon="add"
            dense
            @click="addTree"
            color="positive"
            label="Add to Tree"
            v-close-popup
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { useQuasar } from "quasar";
import { getFirestore, setDoc, doc } from "@firebase/firestore";

export default {
  name: "AddSubTree",
  props: ["parent", "treeId"],
  setup() {
    const q = useQuasar();
    return { q };
  },
  data() {
    return {
      subTree: "",
      shadow: false,
    };
  },
  methods: {
    addTree() {
      // console.log(
      //   `/movements/${this.movement.id}/trees/${this.treeId}/components/parents`,
      //   {
      //     [this.subTree]: { subTreeParent: this.parent ? this.parent : "root" },
      //   }
      // );
      return setDoc(
        doc(
          getFirestore(),
          `/movements/${this.movement.id}/trees/${this.treeId}/components/parents`
        ),
        {
          [this.subTree]: { subTreeParent: this.parent ? this.parent : "root" },
        },
        { merge: true }
      ).catch((err) => {
        // if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
        console.error(new Error("Oops, something went wrong: " + err));
        return false;
      });
    },
  },
  computed: {
    ...mapGetters("movement", ["memberList", "treeOpts"]),
    ...mapState("movement", ["movement"]),
  },
};
</script>
