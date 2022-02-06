<template>
  <q-btn
    :class="{ 'text-underline': localMember.display.underline }"
    :style="
      'background-color:' +
      localMember.display.background +
      '; color:' +
      localMember.display.color +
      '; ' +
      'font-size:' +
      size +
      '%;border-color:' +
      localMember.display.outline +
      ' !important;'
    "
    style="border-width: 1px; border-style: solid; z-index: 10"
    :rounded="localMember.display.round"
    :key="localMember.name"
    icon="person"
    :label="localMember.display ? localMember.display.label : localMember.name"
    no-caps
    :loading="loading"
    @click.stop
  >
    <!--     <q-inner-loading :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading> -->
    <!-- Left Click Menu -->
    <q-menu @before-show.stop="">
      <q-list bordered padding>
        <q-item>
          <q-item-section avatar> Name </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ localMember.name }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar> Role </q-item-section>
          <q-item-section>
            <q-item-label>
              <!-- {{ baseStyles[localMember.baseStyle] }} -->
              {{
                baseStyles[localMember.baseStyle]
                  ? baseStyles[localMember.baseStyle].label
                  : localMember.baseStyle
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar> Modifiers </q-item-section>
          <q-item-section>
            <q-item-label v-if="localMember.overrideStyles">
              <div class="q-gutter-xs">
                <q-badge
                  color="blue"
                  v-for="overrideStyle in localMember.overrideStyles"
                  :key="overrideStyle"
                >
                  <!-- v-if="overrideStyles"> -->
                  {{
                    overrideStyles[overrideStyle]
                      ? overrideStyles[overrideStyle].label
                      : ""
                  }}
                </q-badge>
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
    <!-- Right Click Menu-->
    <q-menu touch-position context-menu ref="menu" @before-show.stop="">
      <q-list dense style="min-width: 100px">
        <q-item clickable v-if="editor">
          <q-item-section avatar><q-icon name="person_add" /></q-item-section>
          <q-item-section>New</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>
          <q-menu anchor="top right" self="top left">
            <q-form @submit="addMember()" class="q-gutter-md">
              <q-list bordered padding separator dense>
                <q-item>
                  <q-item-section avatar> Name </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <q-input
                        :value="newMember.name"
                        @input="newMember.name = $event"
                        dense
                        autofocus
                        counter
                        lazy-rules
                        :rules="[(val) => !!val || 'Field is required']"
                        label="Name"
                        stack-label
                      />
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar> Role </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <q-select
                        :value="
                          newMember.baseStyle
                            ? baseStyles[newMember.baseStyle].label
                            : ''
                        "
                        :options="baseStyleOptions"
                        @input="newMember.baseStyle = $event.id"
                        lazy-rules
                        :rules="[(val) => !!val || 'Field is required']"
                        label="Role"
                        stack-label
                      />
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar> Modifiers </q-item-section>
                  <q-item-section>
                    <q-item-label v-if="editor">
                      <!-- Add -->
                      <!-- <q-popup-edit :value="newMember.overrideStyles" dense v-if="editor"> -->
                      <q-select
                        :value="newMember.overrideStyles"
                        :options="overrideStyleOptions"
                        new-value-overrideStyle="add-unique"
                        @input="
                          newMember.overrideStyles.indexOf($event.id) === -1
                            ? newMember.overrideStyles.push($event.id)
                            : ''
                        "
                        label="Add Modifier"
                        stack-label
                      />
                      <!-- </q-popup-edit> -->
                      <q-tooltip
                        content-class="bg-accent text-grey-10"
                        anchor="center right"
                        self="center left"
                      >
                        <q-icon name="add" />
                      </q-tooltip>
                    </q-item-label>
                    <q-item-label v-if="newMember.overrideStyles">
                      <div class="q-gutter-xs">
                        <q-badge
                          color="blue"
                          v-for="overrideStyle in newMember.overrideStyles"
                          :key="overrideStyle"
                        >
                          <!-- v-if="overrideStyles"> -->
                          {{
                            overrideStyles[overrideStyle]
                              ? overrideStyles[overrideStyle].label
                              : ""
                          }}
                          <q-btn
                            flat
                            dense
                            rounded
                            size="xs"
                            icon="close"
                            @click="removeNewOverrideStyle(overrideStyle)"
                            v-if="editor"
                          />
                        </q-badge>
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar> Parent </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <q-select
                        :value="
                          newMember.parent
                            ? parents[newMember.parent].label
                            : ''
                        "
                        :options="parentOptionsFiltered"
                        options-dense
                        @input="newMember.parent = $event.value"
                        @filter="filterParents"
                        use-input
                        input-debounce="0"
                        lazy-rules
                        :rules="[(val) => !!val || 'Field is required']"
                        label="Parent"
                        stack-label
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-btn label="Create" type="submit" class="q-pt-sm" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-form>
            <q-inner-loading :showing="addLoading">
              <q-spinner size="50px" color="primary" />
            </q-inner-loading>
          </q-menu>
        </q-item>
        <q-separator />
        <q-item clickable>
          <q-item-section avatar><q-icon name="person" /></q-item-section>
          <q-item-section>View</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>
          <q-menu anchor="top right" self="top left">
            <q-list bordered padding>
              <q-item>
                <q-item-section avatar> Name </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ localMember.name }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar> Role </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{
                      baseStyles[localMember.baseStyle]
                        ? baseStyles[localMember.baseStyle].label
                        : localMember.baseStyle
                    }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar> Modifiers </q-item-section>
                <q-item-section>
                  <q-item-label v-if="localMember.overrideStyles">
                    <div class="q-gutter-xs">
                      <q-badge
                        color="blue"
                        v-for="overrideStyle in localMember.overrideStyles"
                        :key="overrideStyle"
                      >
                        <!--  v-if="overrideStyles"> -->
                        {{
                          overrideStyles[overrideStyle]
                            ? overrideStyles[overrideStyle].label
                            : ""
                        }}
                      </q-badge>
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
        <q-item clickable v-if="editor">
          <q-item-section avatar><q-icon name="edit" /></q-item-section>
          <q-item-section>Edit</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>
          <q-menu anchor="top right" self="top left">
            <q-list bordered padding separator dense>
              <q-item>
                <q-item-section avatar> Name </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-input
                      :value="localMember.name"
                      dense
                      autofocus
                      counter
                      @input="
                        updateMemberFn({
                          key: 'name',
                          memberId: localMember.id,
                          value: $event,
                        })
                      "
                      debounce="2000"
                      lazy-rules
                      :rules="[(val) => !!val || 'Field is required']"
                      label="Name"
                      stack-label
                    />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar> Role </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-select
                      :value="baseStyles[localMember.baseStyle].label"
                      :options="baseStyleOptions"
                      @input="
                        updateMemberFn({
                          key: 'baseStyle',
                          memberId: localMember.id,
                          value: $event.id,
                        })
                      "
                      lazy-rules
                      :rules="[(val) => !!val || 'Field is required']"
                      label="Role"
                      stack-label
                    />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar> Modifiers </q-item-section>
                <q-item-section>
                  <q-item-label v-if="editor">
                    <!-- <q-popup-edit :value="member.overrideStyles" dense v-if="editor"> -->
                    <q-select
                      value=""
                      :options="overrideStyleOptions"
                      new-value-overrideStyle="add-unique"
                      @input="addOverrideStyle($event.id)"
                      label="Add Modifier"
                      stack-label
                    />
                    <!-- </q-popup-edit> -->
                    <q-tooltip
                      content-class="bg-accent text-grey-10"
                      anchor="center right"
                      self="center left"
                    >
                      <q-icon name="add" />
                    </q-tooltip>
                  </q-item-label>
                  <q-item-label v-if="localMember.overrideStyles">
                    <div class="q-gutter-xs">
                      <q-badge
                        color="blue"
                        v-for="overrideStyle in localMember.overrideStyles"
                        :key="overrideStyle"
                      >
                        <!--  v-if="overrideStyles"> -->
                        {{
                          overrideStyles[overrideStyle]
                            ? overrideStyles[overrideStyle].label
                            : ""
                        }}
                        <q-btn
                          flat
                          dense
                          rounded
                          size="xs"
                          icon="close"
                          @click="removeOverrideStyle(overrideStyle)"
                          v-if="editor"
                        />
                      </q-badge>
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-inner-loading :showing="loading">
              <q-spinner size="50px" color="primary" />
            </q-inner-loading>
          </q-menu>
        </q-item>
        <q-item clickable v-if="editor">
          <q-item-section avatar
            ><q-icon name="mdi-folder-move"
          /></q-item-section>
          <q-item-section>Move to</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>
          <q-menu anchor="top right" self="top left">
            <q-list style="min-width: 200px" class="q-pa-sm">
              <q-select
                v-model="parents[localMember.parent].label"
                :options="parentOptionsFiltered"
                options-dense
                @input="updateParent"
                label="Parent"
                stack-label
                @filter="filterParents"
                use-input
                input-debounce="0"
                :loading="loading"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </q-list>
          </q-menu>
        </q-item>
        <q-item clickable v-close-popup v-if="editor" @click="copyMember">
          <q-item-section avatar><q-icon name="content_copy" /></q-item-section>
          <q-item-section>Copy</q-item-section>
        </q-item>
        <!-- <q-item clickable>
          <q-item-section avatar><q-icon name="notes" /><q-badge color="red" floating>New</q-badge></q-item-section>
          <q-item-section>Notes (Under Construction) </q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>
          <q-menu anchor="top right" self="top left">
            <q-list>
              <q-item clickable v-close-popup v-if="editor">
                <q-item-section avatar><q-icon name="edit" /></q-item-section>
                <q-item-section>Some Notes</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item> -->
        <q-item
          clickable
          v-if="
            owner && !localMember.children.some((a) => typeof a === 'object')
          "
          @click="deleteDialog = true"
        >
          <q-item-section avatar><q-icon name="delete" /></q-item-section>
          <q-item-section>Delete</q-item-section>
          <mt-remove-dialog
            v-if="!localMember.children.some((a) => typeof a === 'object')"
            :name="localMember ? localMember.name : ''"
            type="Member"
            :show="deleteDialog"
            @confirmed="removeMember"
            @change="deleteDialog = $event"
            :loading="removeMemberLoading"
          />
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
// import mt_member_edit from './mt-member-edit.vue'
// import storage_objects from './storage-objects.js'
// import draggable from 'vuedraggable'
import { mapGetters, mapActions } from "vuex";
// import { debounce } from 'quasar'

const memberJS = require("./../scripts/member.js");
const promiseDebounce = require("./../scripts/promiseDebounce.js");
// import { debounce } from 'quasar'
import firebase from "@firebase/app";
require("@firebase/firestore");

export default {
  name: "mt-member-node",
  props: {
    // movement: {},
    member: {
      name: "",
      display: {
        color: "#FFF",
        background: "#FFF",
        label: "",
        outline: "#FFF",
        underline: false,
      },
    },
    // edit: Boolean
    // size: Number
    // userRoles: {},
    // overrideStyles: {},
    // roles: {}
  },
  data() {
    return {
      // children:[]
      // hideChildren: false,
      // memberDrawer: false,
      // editmodal: false,
      confirmDelete: "",
      deleteDialog: false,
      loading: false,
      removeMemberLoading: false,
      addLoading: false,
      parentOptionsFiltered: [],
      showMenu: false,
      // viewer: true,
      // editor: false,
      // superEditor: false,
      // owner: false,
      // show: {
      //   name: false,
      //   baseStyle: false,
      //   baseStyleEdit: false,
      //   overrideStyles: false,
      //   overrideStylesEdit: false,
      //   parent: false,
      //   parentEdit: false,
      //   comment: false
      // },
      newMember: {
        name: "",
        baseStyle: "",
        overrideStyles: [],
        parent: this.member.id,
      },
      localMember: {
        id: "",
        label: "",
      },
      // newComment: {
      //   text: '',
      //   permission: 'viewer'
      // }
    };
  },
  created: function () {
    this.localMember = this.member;
    this.updateMember = promiseDebounce.debounce(this.updateMember, 2000);
    // this.updateMember = debounce(this.updateMember, 600)
    // this.movement.roles = this.movement.roles ? this.movement.roles : []
    // this.movement.overrideStyles = this.movement.overrideStyles ? this.movement.overrideStyles : []
    // this.member.role = (typeof this.member.role === 'string') ? this.member.role : ''
    // this.member.overrideStyles = Array.isArray(this.member.overrideStyles) ? this.member.overrideStyles : [this.member.overrideStyles]
  },
  methods: {
    ...mapActions(["updateMember"]),
    addMember() {
      this.addLoading = true;
      this.newMember.parent = this.newMember.parent
        ? this.newMember.parent
        : "No Parent";
      firebase
        .firestore()
        .collection(`/movements/${this.movement.id}/members`)
        .doc()
        .set(this.newMember)
        .then(() => {
          this.$refs["menu"].hide();
          this.newMember = {
            name: "",
            baseStyle: "",
            overrideStyles: [],
            parent: "",
          };
          this.addLoading = false;
          this.$q.notify({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Member Added",
          });
          return true;
        })
        .catch((err) => {
          console.log("Oops, something went wrong: " + err);
          this.$q.notify({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!",
          });
        });
    },
    updateMemberFn(payload) {
      this.loading = true;
      this.$refs["menu"].hide();
      this.updateMember(payload).then(() => {
        console.log("updated");
        this.loading = false;
        return true;
      });
    },
    removeMember() {
      if (this.member.children.some((a) => typeof a === "object")) {
        return;
      }
      return memberJS.remove(this.movement.id, this.localMember.id, this);
    },
    copyMember() {
      return memberJS.copy(this.member, this.movement.id, this);
    },
    updateParent(event) {
      this.loading = true;
      // console.log('updating parent', this.member)
      // console.log({ parentKey: this.member.parent, childKey: this.member.id })
      // this.deleteNodeByKey(this.tree, this.currentMember.id, event.value)
      this.updateMember({
        key: "parent",
        memberId: this.localMember.id,
        value: event.value,
      });
      this.loading = false;
    },
    filterParents(val, update) {
      if (val === "") {
        update(() => {
          this.parentOptionsFiltered = this.parentOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.parentOptionsFiltered = this.parentOptions.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    showConfirmDelete() {
      this.editmodal = false;
      this.memberDrawer = false;
      this.confirmDelete = true;
    },
    toggleConfirmDelete() {
      this.confirmDelete = this.confirmDelete !== true;
    },
    // editMember: function (event) {
    //   // console.log(event)
    //   if (typeof event !== 'string') {
    //     event.preventDefault()
    //   }
    //   // this.editmodal = false
    //   // console.log(this.member)
    //   if (this.member.name <= '') {
    //     this.$toasted.global.toast_error('Edit Failed! Missing Name field')
    //   } else if (this.member.role <= '') {
    //     this.$toasted.global.toast_error('Creation Failed! Missing Role field')
    //   } else if (!this.member.overrideStyles) {
    //     this.$toasted.global.toast_error('Creation Failed! Missing overrideStyleifiers field')
    //   } else if (this.member.parent <= '') {
    //     this.$toasted.global.toast_error('Creation Failed! Missing Parent field')
    //   } else {
    //     // this.$toasted.global.toast_success(`Updating ${this.member.name}`)
    //     this.member.movement = this.movement.id
    //     var editMember = firebase.functions().httpsCallable('editMember')
    //     editMember({ member: this.member }).then((doc) => {
    //       this.$toasted.global.toast_success(`${this.member.name} Update Successful!`)
    //       this.editmodal = false
    //     }).catch((err) => {
    //       this.$toasted.global.toast_error(`Edit Failed! ${err}`)
    //       console.error(err)
    //     })
    //   }
    // },
    // deleteMember: function (event) {
    //   if (this.member.name <= '') {
    //     this.$toasted.global.toast_error('Creation Failed! Missing Name field')
    //   } else {
    //     this.confirmDelete = false
    //     this.member.movement = this.movement.id
    //     console.log('Deleting Member')
    //     var deleteMember = firebase.functions().httpsCallable('deleteMember')
    //     deleteMember({ member: this.member }).then((doc) => {
    //       this.$toasted.global.toast_success(`${this.member.name} Delete Successful!`)
    //     }).catch((err) => {
    //       this.$toasted.global.toast_error(`Edit Failed! ${err}`)
    //     })
    //   }
    // },
    // onDrop (member) {
    //   var parent = this.member.id
    //   console.log(member)
    //   this.member.children = this.member.children ? this.member.children.sort((a, b) => { return (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0 }) : []
    //   // console.log(this.member.id)
    //   if (typeof member.added === 'object') {
    //     var child = member.added.element
    //     child.parent = this.member.id
    //     child.movement = this.movement.id
    //     var memberAdded = firebase.functions().httpsCallable('memberAdded')
    //     memberAdded({ member: child }).then(() => { return true }).catch(err => console.log(err))
    //     console.log(`Set Parent of /movements/${this.movement.id}/members/${child.id} to ${parent}`)

    //     console.log(`Add {name:,id:,role:,overrideStyles:} to ${parent} in /movements/${this.movement.id}/trees/tree`)
    //   } else if (member.removed) {
    //     child = member.removed.element
    //     child.parent = this.member.id
    //     child.movement = this.movement.id
    //     var memberRemoved = firebase.functions().httpsCallable('memberRemoved')
    //     memberRemoved({ member: child }).then(() => { return true }).catch(err => console.log(err))
    //     console.log(`Remove {name:,id:,role:,overrideStyles:} from ${parent} in /movements/${this.movement.id}/trees/tree`)
    //   }
    //   //
    // },
    addOverrideStyle(overrideStyleText) {
      // console.log('done')
      // console.log(typeof this.localMember.overrideStyles)
      // console.log('add overrideStyle, ', overrideStyleText)

      if (this.localMember.overrideStyles.indexOf(overrideStyleText) === -1) {
        this.localMember.overrideStyles.push(overrideStyleText);
        this.updateMemberFn({
          key: "overrideStyles",
          memberId: this.localMember.id,
          value: this.localMember.overrideStyles,
        });
      }
    },
    removeOverrideStyle(overrideStyleText) {
      // console.log('Override Style')
      // var overrideStyleValIndex = this.overrideStyles.map(function (d) { return d['text'] }).indexOf(overrideStyleText)
      // console.log(this.overrideStyles)
      // console.log(overrideStyleValIndex)
      // var overrideStyleVal = this.overrideStyles[overrideStyleText].value
      // console.log(this.localMember.overrideStyles, this.overrideStyles, overrideStyleVal, overrideStyleText)
      var index = this.localMember.overrideStyles.indexOf(overrideStyleText);
      // console.log(index)
      if (index > -1) {
        this.localMember.overrideStyles.splice(index, 1);
        // console.log(this.localMember.overrideStyles)
        this.updateMemberFn({
          key: "overrideStyles",
          memberId: this.localMember.id,
          value: this.localMember.overrideStyles,
        });
      }
    },
    removeNewOverrideStyle(overrideStyleText) {
      var overrideStyleVal = this.overrideStyles[overrideStyleText].value;
      // console.log(overrideStyleVal)
      var index = this.newMember.overrideStyles.indexOf(overrideStyleVal);
      if (index > -1) {
        this.newMember.overrideStyles.splice(index, 1);
      }
    },
  },
  computed: {
    ...mapGetters([
      "movement",
      "noAccess",
      "viewer",
      "editor",
      "superEditor",
      "owner",
      "size",
      "baseStyleOptions",
      "baseStyles",
      "overrideStyleOptions",
      "overrideStyles",
      "parents",
      "parentOptions",
    ]),
  },
  watch: {
    member() {
      // console.log(this.localMember, this.member)
      this.localMember = this.member;
    },
  },
  components: {
    "mt-remove-dialog": () => import("../components/mt-remove-dialog.vue"),
    // LabelEdit,
    // 'mt-add-member': () => import('./../components/mt-add-member.vue')
    // draggable
  },
};
</script>

<style lang="styl">
.q-drawer__backdrop
  display none
</style>

<style scoped>
.q-tree__node:after {
  content: "";
  position: absolute;
  top: 0px;
  bottom: -20px;
  width: 2px;
  right: auto;
  left: -3px;
  border-left: 0px solid black;
}
</style>
