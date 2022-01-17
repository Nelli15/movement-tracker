<template>
  <q-card data-cy="add-member-comp">
    <q-form @submit="addMember()" class="q-gutter-md">
      <q-list bordered dense>
        <q-item>
          <q-item-section>
            <q-input
              :model-value="newMember.name"
              @update:model-value="newMember.name = $event"
              autofocus
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
              label="Name"
              :color="q.dark.isActive ? 'blue-2' : ''"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <!-- <q-item-section avatar>
            Role
          </q-item-section>-->
          <q-item-section>
            <q-select
              :model-value="roles[newMember.role]"
              :options="roleOpts"
              @update:model-value="newMember.role = $event.id"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
              label="Role"
              :color="q.dark.isActive ? 'blue-2' : ''"
              dropdown-icon="arrow_drop_down"
              @filter="filterRoles"
            >
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                  style="max-width: 350px"
                >
                  <q-item-section>
                    <q-item-label v-html="scope.opt.label" />
                    <q-item-label caption
                      >{{
                        typeof scope.opt.desc === "string" &&
                        scope.opt.desc > ""
                          ? scope.opt.desc.length > 100
                            ? scope.opt.desc.substring(0, 100).concat("...")
                            : scope.opt.desc
                          : scope.opt.desc
                      }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              use-chips
              :options="modOptsFiltered"
              :model-value="newMember.mods"
              input-debounce="0"
              @update:model-value="addMod($event[$event.length - 1].id)"
              label="Modifiers"
              multiple
              use-input
              @filter="filterMods"
              :color="q.dark.isActive ? 'blue-2' : ''"
              dropdown-icon="arrow_drop_down"
            >
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                  style="max-width: 350px"
                >
                  <q-item-section>
                    <q-item-label v-html="scope.opt.label" />
                    <q-item-label caption
                      >{{
                        typeof scope.opt.desc === "string" &&
                        scope.opt.desc > ""
                          ? scope.opt.desc.length > 100
                            ? scope.opt.desc.substring(0, 100).concat("...")
                            : scope.opt.desc
                          : scope.opt.desc
                      }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:selected-item="scope">
                <q-chip
                  v-if="scope.opt && mods[scope.opt]"
                  :tabindex="scope.tabindex"
                  color="blue"
                  text-color="white"
                  class="q-mx-xs q-pr-none"
                >
                  {{ mods[scope.opt].label }}
                  <q-btn
                    icon="cancel"
                    round
                    dense
                    flat
                    size="md"
                    class="q-ml-xs"
                    style="color: inherit; opacity: 0.6"
                    @click="removeMod(scope.opt)"
                  />
                </q-chip>
              </template>
            </q-select>
          </q-item-section>
        </q-item>
        <q-item v-if="treeOpt && treeOpt.id">
          <q-item-section>
            <q-select
              :model-value="
                selectedParent && selectedParent !== 'root'
                  ? parents[selectedParent].name
                  : '--First Member in Tree--'
              "
              :options="parentOptsFiltered"
              option-label="name"
              option-value="id"
              options-dense
              @update:model-value="(event) => (selectedParent = event.id)"
              @filter="filterParents"
              use-input
              input-debounce="0"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
              label="Parent"
              :color="q.dark.isActive ? 'blue-2' : ''"
              dropdown-icon="arrow_drop_down"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">No results</q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label> Shadow Member? </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-checkbox v-model="shadow" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              v-model="newMember.notes"
              lazy-rules
              label="Notes"
              :color="q.dark.isActive ? 'blue-2' : ''"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn
              label="Create"
              type="submit"
              class="q-my-sm full-width bg-positive"
              v-close-popup
              ref="submit"
            />
          </q-item-section>
        </q-item>
        <!--         <q-item>
          <q-item-section>
            <q-btn label="Create" type="submit" class="q-mt-sm full-width bg-positive" />
          </q-item-section>
        </q-item>-->
      </q-list>
    </q-form>
  </q-card>
  <!-- </q-menu> -->
</template>

<script>
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { add } from "./../../scripts/member.js";
import { ref, computed, watch } from "vue";

export default {
  props: {
    parent: String,
    treeOpt: {},
  },
  setup(props, { emit }) {
    const q = useQuasar();
    const store = useStore();
    const route = useRoute();
    const parentOptsFiltered = ref([]);
    const newMember = ref({
      name: "",
      role: "",
      mods: [],
      notes: "",
      customFields: {},
    });
    const selectedParent = ref(props.parent ? props.parent : "root");
    const shadow = ref(false);

    const mods = computed(() => store.state.movement.mods);
    const modOpts = computed(() => store.getters["movement/modOpts"]);
    const modOptsFiltered = ref([]);
    function filterMods(val, update) {
      update(() => {
        if (val === "") {
          modOptsFiltered.value = modOpts.value;
        } else {
          const needle = val.toLowerCase();
          modOptsFiltered.value = modOpts.value.filter((v) => {
            return v.label.toLowerCase().indexOf(needle) > -1;
          });
        }
      });
    }
    function removeMod(overrideStyleText) {
      // console.log(overrideStyleText);
      // var overrideStyleVal = mods[overrideStyleText].value;
      // console.log(overrideStyleVal)
      var index = newMember.value.mods.indexOf(overrideStyleText);
      if (index > -1) {
        newMember.value.mods.splice(index, 1);
      }
    }
    function addMod(overrideId) {
      // console.log(overrideId)
      if (newMember.value.mods.indexOf(overrideId) === -1) {
        newMember.value.mods.push(overrideId);
      }
    }
    const roles = computed(() => store.state.movement.roles);
    const roleOpts = computed(() => store.getters["movement/roleOpts"]);
    const roleOptsFiltered = ref([]);
    function filterRoles(val, update) {
      update(() => {
        if (val === "") {
          roleOptsFiltered.value = roleOpts;
        } else {
          const needle = val.toLowerCase();
          roleOptsFiltered.value = roleOpts.filter((v) => {
            return v.label.toLowerCase().indexOf(needle) > -1;
          });
        }
      });
    }

    function addMember() {
      q.loading.show();
      add(
        newMember.value,
        route.params.movId,
        props.treeOpt,
        selectedParent.value ? selectedParent.value : "root",
        shadow.value
      ).then((res) => {
        q.loading.hide();
        if (res) {
          newMember.value = {
            name: "",
            role: "",
            mods: [],
            notes: "",
            customFields: {},
          };

          q.notify({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Member Created",
          });
          emit("success", {});
        } else {
          q.notify({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!",
          });
          emit("error", {});
        }
        return true;
      });
    }

    const trees = computed(() => store.state.movement.trees);
    const members = computed(() => store.state.movement.members);

    const parents = computed(() => {
      if (!props.treeOpt) return [];
      let bfs = function (tree, key, collection) {
        // console.log("tree", tree[key]);
        if (!tree[key] || tree[key].length === 0) return;
        for (var i = 0; i < tree[key].length; i++) {
          var child = tree[key][i];
          // console.log("child", child);
          collection[child.id] = child;
          // console.log("here", child, key, collection);
          bfs(child, key, collection);
        }
        return;
      };
      let flattenedCollection = {};
      // console.log("trees", trees.value[props.treeOpt.id].tree);
      let dataTree = {
        children: JSON.parse(
          JSON.stringify(trees.value[props.treeOpt.id].tree)
        ),
      };
      // console.log(
      //   "bfs",
      //   flattenedCollection,
      //   bfs(dataTree, "children", flattenedCollection)
      // );
      bfs(dataTree, "children", flattenedCollection);

      for (let ii in flattenedCollection) {
        // console.log("members", members.value[flattenedCollection[ii].id].name);
        // console.log(flattenedCollection[ii]);
        flattenedCollection[ii].name =
          members.value &&
          flattenedCollection[ii] &&
          members.value[flattenedCollection[ii].id]
            ? members.value[flattenedCollection[ii].id].name
            : "";
      }
      // console.log("out", flattenedCollection);
      return flattenedCollection;
    });
    function filterParents(val, update) {
      if (!parents.value)
        return [{ id: "root", name: "--First Member in Tree--" }];
      let parentOpts = [
        { id: "root", name: "--First Member in Tree--" },
        ...Object.values(parents.value),
      ];
      // console.log("parentOpts", parentOpts);
      if (val === "") {
        update(() => {
          parentOptsFiltered.value = parentOpts.sort((a, b) => {
            return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
          });
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        parentOptsFiltered.value = parentOpts
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
    watch(
      roleOpts,
      () => {
        // console.log(
        //   "roleOpts",
        //   newMember.value.role === "" && roleOpts.value.length > 0
        // );
        if (newMember.value.role === "" && roleOpts.value.length > 0) {
          newMember.value.role = roleOpts.value[0].id;
        }
      },
      { immediate: true }
    );
    return {
      q,
      mods,
      modOpts,
      modOptsFiltered,
      filterMods,
      addMod,
      removeMod,
      roles,
      roleOpts,
      roleOptsFiltered,
      filterRoles,
      trees,
      members,
      newMember,
      addMember,
      selectedParent,
      parents,
      filterParents,
      parentOptsFiltered,
      shadow,
    };
  },
};
</script>
