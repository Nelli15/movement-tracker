<template>
  <q-card data-cy="move-member-comp">
    <q-list style="min-width: 200px" class="q-pa-sm">
      <q-item>
        <q-select
          :model-value="
            members[currentParent] ? members[currentParent].name : ''
          "
          :options="parentOptionsFiltered"
          option-label="name"
          option-value="id"
          options-dense
          label="Parent"
          stack-label
          @filter="filterParents"
          use-input
          input-debounce="0"
          :color="Dark.isActive ? 'blue-2' : ''"
          @update:model-value="updateParent($event.id)"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import { mapState } from "vuex";
import {
  getFirestore,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "@firebase/firestore";
import { Dark } from "quasar";
export default {
  name: "MoveMemberInTree",
  props: ["movement", "member", "treeOpt", "shadow", "currentParent"],
  data() {
    return {
      parentOptionsFiltered: [],
    };
  },
  created() {
    this.Dark = Dark;
  },
  methods: {
    filterParents(val, update) {
      let parentOptions = [
        { id: "root", name: "--First Member in Tree--" },
        ...Object.values(this.parents),
      ];
      if (val === "") {
        update(() => {
          this.parentOptionsFiltered = parentOptions
            .filter((v) => this.checkValidParent(v.id))
            .sort((a, b) => {
              return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
            });
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.parentOptionsFiltered = parentOptions
          .filter((v) => v.name)
          .filter((v) => {
            return (
              (v.name && v.name.toLowerCase().indexOf(needle)) > -1 &&
              this.checkValidParent(v.id)
            );
          })
          .sort((a, b) => {
            return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
          });
      });
    },
    checkValidParent(id) {
      //return true if valid, false if not
      const checkChildren = (currentId, localId) => {
        if (!currentId || !localId) return false;
        // localId is the id of the member
        // currentId is the id of the member being checked
        // returns true if member is not a child of localId otherwise return false
        if (currentId === localId) return false;
        // console.log(
        //   this.parents,
        //   currentId,
        //   localId,
        //   this.parents[currentId].parent
        // );
        if (this.parents[currentId].parent === "root") return true;
        return checkChildren(this.parents[currentId].parent, localId);
      };

      if (id === this.member.id || id === this.member.parent) return false;
      if (id === "root") return true;
      if (!id || !this.member.id) return false;
      return checkChildren(id, this.member.id);
    },
    updateParent(parentId) {
      // console.log(
      //   this.movement.value,
      //   `/movements/${this.movement.value.id}/trees/${this.treeOpt.id}/components/parents`
      // );
      if (!this.shadow) {
        updateDoc(
          doc(
            getFirestore(),
            `/movements/${this.movement.value.id}/trees/${this.treeOpt.id}/components/parents`
          ),
          { [this.member.id + ".parent"]: parentId }
        ).catch((err) => console.error(err));
      } else {
        updateDoc(
          doc(
            getFirestore(),
            `/movements/${this.movement.value.id}/trees/${this.treeOpt.id}/components/parents`
          ),
          { [this.member.id + ".shadow"]: arrayRemove(this.currentParent) }
        ).catch((err) => console.error(err));

        updateDoc(
          doc(
            getFirestore(),
            `/movements/${this.movement.value.id}/trees/${this.treeOpt.id}/components/parents`
          ),
          { [this.member.id + ".shadow"]: arrayUnion(parentId) }
        ).catch((err) => console.error(err));
      }
    },
  },
  computed: {
    ...mapState("movement", ["members", "trees"]),
    parents() {
      if (this.treeOpt && this.treeOpt.id <= "") return [];
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
      // console.log(this.trees[this.treeOpt.id].tree);
      let dataTree = {
        children: JSON.parse(JSON.stringify(this.trees[this.treeOpt.id].tree)),
      };
      // console.log("bfs", bfs(dataTree, "children", flattenedCollection));
      bfs(dataTree, "children", flattenedCollection);
      // console.log(flattenedCollection);
      for (let ii in flattenedCollection) {
        flattenedCollection[ii].name = this.members[flattenedCollection[ii].id]
          ? this.members[flattenedCollection[ii].id].name
          : "";
      }
      // console.log("out", flattenedCollection);
      return flattenedCollection;
    },
  },
};
</script>
