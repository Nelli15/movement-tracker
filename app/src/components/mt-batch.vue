<template>
  <div v-if="this.permissions.members_edit">
    <q-page-sticky position="top-right" :offset="fabPos" style="z-index: 1000">
      <q-card
        class
        style="min-width: 400px; max-width: 400px"
        :disable="draggingFab"
        v-touch-pan.prevent.mouse="moveFab"
      >
        <!-- {{membersSelected}} -->
        <q-list bordered dense padding>
          <q-item style="width: 100%">
            <q-item-section avatar style="cursor: move">
              <q-icon name="drag_handle" />
            </q-item-section>
            <q-item-section></q-item-section>
            <q-item-section side style="cursor: pointer">
              <q-icon name="close" @click="batchCancel" />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>
                <!-- <q-select :options="roleOpts" label="Role" v-model="batchEdit.role" clearable :color="Dark.isActive ? 'blue-2' : ''"/> -->
                <q-select
                  v-model="batchEdit.role"
                  :options="roleOptsFiltered"
                  lazy-rules
                  label="Role"
                  use-input
                  @filter="filterBaseStyles"
                  :color="Dark.isActive ? 'blue-2' : ''"
                  popup-content-style="width: 100px"
                >
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                      <q-item-section>
                        <q-item-label v-html="scope.opt.label" />
                        <q-item-label caption>{{
                          typeof scope.opt.desc === "string" &&
                          scope.opt.desc > ""
                            ? scope.opt.desc.substring(0, 100).concat("...")
                            : scope.opt.desc
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-select
                use-chips
                :options="modOptsFiltered"
                :model-value="batchEdit.mods"
                input-debounce="0"
                @update:model-value="
                  addOverrideStyle($event[$event.length - 1].id)
                "
                label="Modifiers"
                multiple
                use-input
                @filter="filterOverrideStyles"
                :color="Dark.isActive ? 'blue-2' : ''"
                popup-content-style="width: 100px"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section>
                      <q-item-label v-html="scope.opt.label" />
                      <q-item-label caption>{{
                        typeof scope.opt.desc === "string" &&
                        scope.opt.desc > ""
                          ? scope.opt.desc.substring(0, 100).concat("...")
                          : scope.opt.desc
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:selected-item="scope">
                  <q-chip
                    v-if="mods[scope.opt]"
                    removable
                    dense
                    @remove="removeOverrideStyle(scope.opt)"
                    :tabindex="scope.tabindex"
                    color="blue"
                    text-color="white"
                    class="q-mx-xs"
                    >{{ mods[scope.opt].label }}</q-chip
                  >
                </template>
              </q-select>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-select
                v-model="batchEdit.tree"
                :options="treeOpts"
                options-dense
                option-label="label"
                option-value="id"
                input-debounce="0"
                label="Tree"
                clearable
                :color="Dark.isActive ? 'blue-2' : ''"
                map-options
                emit-value
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey"
                      >No results</q-item-section
                    >
                  </q-item>
                </template>
              </q-select>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-select
                v-model="batchEdit.parent"
                :options="parentOptionsFiltered"
                options-dense
                option-label="name"
                option-value="id"
                @filter="filterParents"
                use-input
                input-debounce="0"
                label="Parent"
                clearable
                :color="Dark.isActive ? 'blue-2' : ''"
                :disable="!this.batchEdit.tree"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey"
                      >No results</q-item-section
                    >
                  </q-item>
                </template>
              </q-select>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label> Shadow? </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox
                v-model="batchEdit.shadow"
                :disable="!this.batchEdit.tree"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="row">
              <div class="row q-gutter-sm q-mx-sm q-mt-sm">
                <div
                  class="col-3"
                  style="display: inline-block; margin-left: auto"
                >
                  <q-btn
                    label="Update"
                    color="positive"
                    class="q-mb-sm"
                    @click="batchConfirm = true"
                    :disable="
                      !(
                        batchEdit.role > '' ||
                        batchEdit.mods.length > 0 ||
                        batchEdit.parent > '' ||
                        batchEdit.altParent > ''
                      )
                    "
                    style="width: 100%"
                    v-if="permissions.members_edit"
                  />
                </div>
                <div class="col-3" style="display: inline-block">
                  <q-btn
                    label="Cancel"
                    class="q-mb-sm"
                    @click="batchCancel"
                    style="width: 100%"
                  />
                </div>
                <div class="col-3" style="display: inline-block">
                  <q-btn
                    label="Delete"
                    color="negative"
                    class="q-mb-sm"
                    @click="batchDeleteConfirm = true"
                    v-if="permissions.members_delete"
                    style="width: 100%"
                  />
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-page-sticky>
    <q-dialog v-model="batchConfirm" persistent v-if="membersSelected">
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="warning" size="xl" color="warning" />
          <span class="q-ml-sm"
            >Please confirm that you want to edit
            {{
              membersSelected.length > 1
                ? membersSelected.length + " members"
                : membersSelected.length + " member"
            }}.</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Confirm"
            color="positive"
            v-close-popup
            @click="batchUpdate"
          />
          <q-btn flat label="Cancel" @click="batchCancel" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="batchDeleteConfirm" persistent v-if="membersSelected">
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="warning" size="xl" color="negative" />
          <span class="q-ml-sm"
            >Please confirm that you want to DELETE
            {{
              membersSelected.length > 1
                ? membersSelected.length + " members"
                : membersSelected.length + " member"
            }}.</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Delete"
            color="negative"
            v-close-popup
            @click="batchDelete"
          />
          <q-btn flat label="Cancel" @click="batchCancel" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { getFirestore, arrayUnion, updateDoc, doc } from "@firebase/firestore";
// // import { $firestore } from "./../data/firebase.js";

import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { LocalStorage, Dark, Notify } from "quasar";
// import { mapActions } from 'vuex'

export default {
  props: {
    // user: {}
    membersSelected: Array,
    treeOpt: null,
  },
  data() {
    return {
      parentOptionsFiltered: [],
      modOptsFiltered: [],
      roleOptsFiltered: [],
      fabPos: [18, 18],
      draggingFab: false,
      batchEdit: {
        role: "",
        mods: [],
        parent: "",
        tree: "",
        shadow: false,
      },
      batchConfirm: false,
      batchDeleteConfirm: false,
    };
  },
  created() {
    this.Dark = Dark;
  },
  methods: {
    ...mapMutations("movement", ["moveLocalMember", "updateStateMember"]),
    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true;

      this.fabPos = [this.fabPos[0] - ev.delta.x, this.fabPos[1] + ev.delta.y];
    },
    filterOverrideStyles(val, update) {
      update(() => {
        if (val === "") {
          this.modOptsFiltered = this.modOpts;
        } else {
          const needle = val.toLowerCase();
          this.modOptsFiltered = this.modOpts.filter((v) => {
            // console.log(
            //   v.label.toLowerCase(),
            //   needle,
            //   v.label.toLowerCase().indexOf(needle) > -1
            // );
            return v.label.toLowerCase().indexOf(needle) > -1;
          });
        }
      });
    },
    filterBaseStyles(val, update) {
      update(() => {
        if (val === "") {
          this.roleOptsFiltered = this.roleOpts;
        } else {
          const needle = val.toLowerCase();
          this.roleOptsFiltered = this.roleOpts.filter((v) => {
            // console.log(
            //   v.label.toLowerCase(),
            //   needle,
            //   v.label.toLowerCase().indexOf(needle) > -1
            // );
            return v.label.toLowerCase().indexOf(needle) > -1;
          });
        }
      });
    },
    filterParents(val, update) {
      if (val === "") {
        update(() => {
          this.parentOptionsFiltered = this.parentOptions.sort((a, b) => {
            return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
          });
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.parentOptionsFiltered = this.parentOptions
          .filter((v) => v.label || v.name)
          .filter((v) => {
            return (
              (v.name
                ? v.name.toLowerCase().indexOf(needle)
                : v.label.toLowerCase().indexOf(needle)) > -1
            );
          })
          .sort((a, b) => {
            return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
          });
      });
    },
    addOverrideStyle(overrideStyleText) {
      if (this.batchEdit.mods.indexOf(overrideStyleText) === -1) {
        this.batchEdit.mods.push(overrideStyleText);
      }
    },
    removeOverrideStyle(overrideStyleText) {
      var index = this.batchEdit.mods.indexOf(overrideStyleText);
      // console.log(index)
      if (index > -1) {
        this.batchEdit.mods.splice(index, 1);
      }
    },
    filterParents(val, update) {
      let parentOptions = [
        { id: "root", name: "--First Member in Tree--" },
        ...Object.values(this.parents),
      ];
      if (val === "") {
        update(() => {
          this.parentOptionsFiltered = parentOptions.sort((a, b) => {
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
            return (v.name && v.name.toLowerCase().indexOf(needle)) > -1;
          })
          .sort((a, b) => {
            return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
          });
      });
    },
    batchUpdate() {
      // this.batchLoading = true
      const members = this.membersSelected;
      const elements = this.batchEdit;
      const membersObject = {};
      // console.log(elements)
      for (var member in this.members) {
        membersObject[this.members[member].id] = this.members[member];
      }
      members.forEach((key) => {
        // console.log(membersObject)
        let newMember = {};
        var currentMember = membersObject[key];
        if (elements.role > "") {
          newMember.role = elements.role.id;
        }
        if (elements.mods.length > 0) {
          newMember.mods = [];
          for (var mod in currentMember.mods) {
            // console.log(currentMember.mods[mod].id, newMember.mods, !newMember.mods.includes(currentMember.mods[mod].id))
            if (
              currentMember.mods[mod].id &&
              !newMember.mods.includes(currentMember.mods[mod].id)
            ) {
              newMember.mods.push(currentMember.mods[mod].id);
            }
          }
          for (mod in elements.mods) {
            // console.log(newMember.mods, elements.mods[mod], !newMember.mods.includes(elements.mods[mod]))
            if (!newMember.mods.includes(elements.mods[mod])) {
              newMember.mods.push(elements.mods[mod]);
            }
          }
        }
        if (elements.parent > "" && elements.tree > "") {
          newMember.trees = arrayUnion(elements.tree);
          if (elements.shadow) {
            updateDoc(
              doc(
                getFirestore(),
                `/movements/${this.$route.params.movId}/trees/${elements.tree}/components/parents`
              ),
              { [currentMember.id + ".shadow"]: arrayUnion(elements.parent.id) }
            );
          } else {
            updateDoc(
              doc(
                getFirestore(),
                `/movements/${this.$route.params.movId}/trees/${elements.tree}/components/parents`
              ),
              { [currentMember.id + ".parent"]: elements.parent.id }
            );
          }
        }
        if (elements.role > "" || elements.mods.length > 0) {
          updateDoc(
            doc(
              getFirestore(),
              `/movements/${this.$route.params.movId}/members/${currentMember.id}`
            ),
            newMember
          )
            .then(() => {
              if (elements.role > "") {
                this.updateStateMember({
                  memberId: currentMember.id,
                  key: "role",
                  localValue: elements.role,
                });
              }
              if (elements.mods.length > 0) {
                let mods = [];
                for (var mod in newMember.mods) {
                  // console.log(mods, newMember,mods[mod], mods[newMember.mods[mod]])
                  mods.push(this.mods[newMember.mods[mod]]);
                }

                // console.log({ memberId: currentMember.id, key: 'mods', localValue: mods })
                this.updateStateMember({
                  memberId: currentMember.id,
                  key: "mods",
                  localValue: mods,
                });
              }
              // if (elements.parent > "") {
              // newMember.parent = elements.parent.value
              // let oldParentId = this.currentMember.parent
              // q.loading.show()
              // this.updateMember({ key: 'parent', memberId: this.localMember.id, value: event.id }).then(() => {
              // console.log({ key: 'parent', memberId: currentMember.id, value: newMember.parent, oldParentId: currentMember.parent })
              // this.moveLocalMember({
              //   key: "parent",
              //   memberId: currentMember.id,
              //   value: newMember.parent,
              //   oldParentId: currentMember.parent
              // });
              // q.loading.hide()
              // return true
              // })
              // this.updateStateMember({ memberId: currentMember.id, key: 'role', localValue: elements.role })
              // }
              this.$emit("clearMembers", "");
              this.batchEdit = {
                role: "",
                mods: [],
                tree: "",
                parent: "",
              };
              Notify.create({
                color: "positive",
                textColor: "white",
                icon: "cloud_download",
                message: "Member Updated",
              });
              // this.batchLoading = false
              return true;
            })
            .catch((err) => {
              if (process.env.PROD)
                logEvent(getAnalytics(), "exception", {
                  description: err,
                  fatal: false,
                });
              console.error(new Error("Oops, something went wrong: " + err));
              Notify.create({
                color: "negative",
                textColor: "white",
                icon: "error",
                message: "Oops, Something went wrong!",
              });
              // this.batchLoading = false
            });
        }
      });
    },
    batchDelete() {
      const checkDeletable = (currentMember) => {
        // return not deleteable if member is not being deleted
        if (!members.includes(currentMember)) return false;
        // search all members to see if the current member is a parent
        for (let ii in this.members) {
          // get member to check if child of current member
          const member = this.members[ii];
          // Check if member is child of current member
          if (member.parent === currentMember || member.alt === currentMember) {
            if (!checkDeletable(member.id)) {
              // current member is not deleteable, return false
              return false;
            }
          }
        }
        return true;
      };
      // this.batchLoading = true
      const members = this.membersSelected;
      // const elements = this.batchEdit
      const membersObject = {};
      for (var member in this.members) {
        membersObject[this.members[member].id] = this.members[member];
      }
      members.forEach((key) => {
        let deleteable = checkDeletable(key);
        if (this.permissions.members_delete && deleteable) {
          deleteDoc(
            doc(
              getFirestore(),
              `/movements/${this.$route.params.movId}/members/${key}`
            )
          )
            .then(() => {
              this.$emit("clearMembers", "");
              this.batchEdit = {
                role: "",
                mods: [],
                parent: "",
              };
              Notify.create({
                color: "positive",
                textColor: "white",
                icon: "cloud_download",
                message: "Member Updated",
              });
              // this.batchLoading = false
              return true;
            })
            .catch((err) => {
              if (process.env.PROD)
                logEvent(getAnalytics(), "exception", {
                  description: err,
                  fatal: false,
                });
              console.error(new Error("Oops, something went wrong: " + err));
              Notify.create({
                color: "negative",
                textColor: "white",
                icon: "error",
                message: "Oops, Something went wrong!",
              });
              // this.batchLoading = false
            });
        } else {
          Notify.create({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Cannot Delete, member has child!",
          });
        }
      });
    },
    batchCancel() {
      this.batchEdit = {
        role: "",
        mods: [],
        parent: "",
      };
      this.$emit("clearMembers", "");
    },
  },
  computed: {
    ...mapGetters("movement", [
      "roleOpts",
      "modOpts",
      "parentOptions",
      "treeOpts",
    ]),
    ...mapState("movement", [
      "movement",
      "permissions",
      "mods",
      "members",
      "trees",
    ]),
    parents() {
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
      let dataTree = {
        children: JSON.parse(
          JSON.stringify(this.trees[this.batchEdit.tree].tree)
        ),
      };
      // console.log("bfs", bfs(dataTree, "children", flattenedCollection));
      bfs(dataTree, "children", flattenedCollection);

      for (let ii in flattenedCollection) {
        flattenedCollection[ii].name =
          this.members[flattenedCollection[ii].id].name;
      }
      // console.log("out", flattenedCollection);
      return flattenedCollection;
    },
  },
  watch: {
    treeOpts: {
      deep: true,
      immediate: true,
      handler() {
        if (this.treeOpt) {
          this.batchEdit.tree = this.treeOpt.id;
        }
      },
    },
    // movement () {
    //   // console.log('movement watcher')
    //   if (this.movements) {
    //     if (this.movement) {
    //       if (this.$route.params.movId !== this.$route.params.movId) {
    //         this.$store.dispatch('fetchMovement', { movId: this.$route.params.movId })
    //       }
    //     }
    //   }
    // },
    // movements () {
    //   // console.log('movements watcher')
    //   if (this.movements) {
    //     if (this.movement) {
    //       if (this.$route.params.movId !== this.$route.params.movId) {
    //         // console.log('all checks complete')
    //         this.$store.dispatch('fetchMovement', { movId: this.$route.params.movId })
    //       }
    //     } else {
    //       // console.log('all checks complete')
    //       this.$store.dispatch('fetchMovement', { movId: this.$route.params.movId })
    //     }
    //   }
    // }
  },
};
</script>
