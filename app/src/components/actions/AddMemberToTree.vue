<template>
  <q-card style="width: 200px">
    <q-list bordered dense padding>
      <q-item>
        <q-item-section>
          <q-select
            :model-value="tree"
            label="Tree"
            :options="treeOpts"
            option-label="label"
            option-value="id"
            option-dense
            emit-value
            map-options
            :color="dark.isActive ? 'blue-2' : ''"
            @update:model-value="fetchTree"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-select
            v-model="parent"
            label="Parent"
            @filter="filterParents"
            use-input
            :options="parentOptionsFiltered"
            option-label="name"
            option-value="id"
            option-dense
            emit-value
            map-options
            :color="dark.isActive ? 'blue-2' : ''"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label> Shadow? </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-checkbox v-model="shadow" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-btn icon="add" dense @click="addMemberToTree" color="positive" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

import {
  getFirestore,
  updateDoc,
  setDoc,
  doc,
  arrayUnion,
} from "@firebase/firestore";
import { useQuasar } from "quasar";

export default {
  name: "AddMemberToTree",
  props: ["member"],
  setup() {
    const q = useQuasar();
    const tree = ref("");
    const parent = ref("");
    const parentOptionsFiltered = reactive([]);
    const shadow = ref(false);

    function addMemberToTree() {
      // console.log(tree, member.id, parent);
      try {
        return updateDoc(
          doc(getFirestore(), `/movements/${movement.id}/members/${member.id}`),
          { trees: arrayUnion(tree) }
        )
          .then(async (res) => {
            if (shadow) {
              return await setDoc(
                doc(
                  getFirestore(),
                  `/movements/${movement.id}/trees/${treeId}/components/parents`
                ),
                {
                  [member.id]: {
                    shadow: arrayUnion(parent),
                    styles: [member.role, ...member.mods],
                  },
                },
                { merge: true }
              );
            } else {
              return await setDoc(
                doc(
                  getFirestore(),
                  `/movements/${movement.id}/trees/${tree}/components/parents`
                ),
                {
                  [member.id]: {
                    parent: parent,
                    styles: [member.role, ...member.mods],
                  },
                },
                { merge: true }
              );
            }
          })
          .then(() => {
            q.notify({
              color: "positive",
              textColor: "white",
              icon: "cloud_download",
              message: "Member Added to Tree",
            });
          })
          .then(() => true)
          .catch((err) => {
            // if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
            console.error(new Error("Oops, something went wrong: " + err));
            q.notify({
              color: "negative",
              textColor: "white",
              icon: "error",
              message: "Oops, Something went wrong!",
            });
            return false;
          });
      } catch (err) {
        // if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
        console.error(new Error("Oops, something went wrong: " + err));
        q.notify({
          color: "negative",
          textColor: "white",
          icon: "error",
          message: "Oops, Something went wrong!",
        });
        return false;
      }
    }
    function fetchTree(e) {
      tree.value = e;
    }
    function filterParents(val, update) {
      let parentOptions = [
        { id: "root", name: "--First Member in Tree--" },
        ...Object.values(parents),
      ];
      if (val === "") {
        update(() => {
          parentOptionsFiltered = parentOptions
            // .filter(v => checkValidParent(v.id))
            .sort((a, b) => {
              return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
            });
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        parentOptionsFiltered = parentOptions
          .filter((v) => v.name)
          .filter((v) => {
            return (
              (v.name && v.name.toLowerCase().indexOf(needle)) > -1
              //  &&              checkValidParent(v.id)
            );
          })
          .sort((a, b) => {
            return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
          });
      });
    }
    function checkValidParent(id) {
      //return true if valid, false if not
      const checkChildren = (currentId, localId) => {
        if (!currentId || !localId) return false;
        // localId is the id of the member
        // currentId is the id of the member being checked
        // returns true if member is not a child of localId otherwise return false
        if (currentId === localId) return false;
        if (parents[currentId].parent === "root") return true;
        return checkChildren(parents[currentId].parent, localId);
      };

      if (id === member.id || id === member.parent) return false;
      if (id === "root") return true;
      if (!id || !member.id) return false;
      return checkChildren(id, member.id);
    }

    const treeOpts = computed(() => {
      return store.getters["movement/treeOpts"];
    });

    const movement = computed(() => {
      return store.state.movement.movement;
    });

    const trees = computed(() => {
      return store.state.movement.trees;
    });

    const members = computed(() => {
      return store.state.movement.members;
    });

    const parents = computed(() => {
      if (tree <= "") return [];
      let bfs = function (tree, key, collection) {
        // console.log("tree", tree[key]);
        if (!tree[key] || tree[key].length === 0) return;
        for (var i = 0; i < tree[key].length; i++) {
          var child = tree[key][i];
          // console.log("child", child);
          collection[child.id] = child;
          // console.log(child, key, collection);
          bfs(child, key, collection);
        }
        return;
      };
      let flattenedCollection = {};
      // console.log(trees[tree].tree);
      let dataTree = { children: JSON.parse(JSON.stringify(trees[tree].tree)) };
      // console.log("bfs", bfs(dataTree, "children", flattenedCollection));
      bfs(dataTree, "children", flattenedCollection);
      // console.log(flattenedCollection);
      for (let ii in flattenedCollection) {
        flattenedCollection[ii].name = members[flattenedCollection[ii].id]
          ? members[flattenedCollection[ii].id].name
          : "";
      }
      // console.log("out", flattenedCollection);
      return flattenedCollection;
    });
    return {
      tree,
      treeOpts,
      members,
      parent,
      parentOptionsFiltered,
      filter,
      shadow,
    };
  },
};
</script>
