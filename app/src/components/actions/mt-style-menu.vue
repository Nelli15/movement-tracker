<template>
  <q-menu context-menu touch-position ref="menu" :persistent="closeDisabled">
    <q-list dense style="min-width: 200px">
      <q-item
        clickable
        @click="addStyle"
        v-close-popup
        v-if="type === 'role' && permissions.settings_roles_create"
      >
        <q-item-section avatar>
          <q-icon
            :name="
              Dark.isActive
                ? 'img:icons/mdi-cards-white.svg'
                : 'img:icons/mdi-cards.svg'
            "
          />
        </q-item-section>
        <q-item-section>Add Role</q-item-section
        ><q-tooltip
          class="bg-accent text-grey-10"
          anchor="center right"
          self="center left"
          >Add Role</q-tooltip
        >
      </q-item>
      <q-item
        clickable
        @click="addStyle"
        v-close-popup
        v-if="type === 'mod' && permissions.settings_mods_create"
      >
        <q-item-section avatar>
          <q-icon
            :name="
              Dark.isActive
                ? 'img:icons/mdi-cards-outline-white.svg'
                : 'img:icons/mdi-cards-outline.svg'
            "
          />
        </q-item-section>
        <q-item-section>Add Modifier</q-item-section
        ><q-tooltip
          class="bg-accent text-grey-10"
          anchor="center right"
          self="center left"
          >Add Modifier</q-tooltip
        >
      </q-item>
      <q-item
        clickable
        @click="addStyle"
        v-close-popup
        v-if="type === 'complex' && permissions.settings_complex_create"
      >
        <q-item-section avatar>
          <q-icon
            name="insights"
            :style="'color: ' + Dark.isActive ? 'white' : 'black' + ';'"
          />
        </q-item-section>
        <q-item-section>Add Complex</q-item-section
        ><q-tooltip
          class="bg-accent text-grey-10"
          anchor="center right"
          self="center left"
          >Add Complex</q-tooltip
        >
      </q-item>
      <q-item
        clickable
        @click="addStyle"
        v-close-popup
        v-if="type === 'calc' && permissions.settings_calc_create"
      >
        <q-item-section avatar>
          <q-icon
            name="functions"
            :style="'color: ' + Dark.isActive ? 'white' : 'black' + ';'"
          />
        </q-item-section>

        <q-item-section>Add Calculated</q-item-section
        ><q-tooltip
          class="bg-accent text-grey-10"
          anchor="center right"
          self="center left"
          >Add Calculated</q-tooltip
        >
      </q-item>
      <q-separator />
      <q-item
        clickable
        @click="$refs['editDialog-' + currentStyle.id].show()"
        v-if="permissions[typePermission + 'edit'] && Platform.is.mobile"
      >
        <q-item-section avatar>
          <q-icon name="edit" />
        </q-item-section>
        <q-item-section>Edit</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>
        <q-dialog :ref="'editDialog-' + currentStyle.id">
          <q-card>
            <q-list bordered padding dense>
              <q-item>
                <q-item-section>
                  <q-input
                    v-model="currentStyle.label"
                    dense
                    autofocus
                    lazy-rules
                    :rules="[(val) => !!val || 'Field is required']"
                    label="Label"
                    stack-label
                    :color="Dark.isActive ? 'blue-2' : ''"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input
                    v-model="currentStyle.desc"
                    dense
                    autofocus
                    label="Description"
                    stack-label
                    :color="Dark.isActive ? 'blue-2' : ''"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input
                    v-model="currentStyle.target"
                    dense
                    autofocus
                    label="Target"
                    stack-label
                    :color="Dark.isActive ? 'blue-2' : ''"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-btn
                    @click="saveStyle"
                    icon="save"
                    dense
                    color="positive"
                    v-close-popup
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </q-dialog>
      </q-item>
      <q-item
        clickable
        v-if="permissions[typePermission + 'edit'] && !Platform.is.mobile"
      >
        <q-item-section avatar>
          <q-icon name="edit" />
        </q-item-section>
        <q-item-section>Edit</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>
        <q-menu anchor="top right" self="top left">
          <q-card>
            <q-list bordered padding dense>
              <q-item>
                <q-item-section>
                  <q-input
                    v-model="currentStyle.label"
                    dense
                    autofocus
                    lazy-rules
                    :rules="[(val) => !!val || 'Field is required']"
                    label="Label"
                    stack-label
                    :color="Dark.isActive ? 'blue-2' : ''"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input
                    v-model="currentStyle.desc"
                    dense
                    autofocus
                    label="Description"
                    stack-label
                    type="textarea"
                    :color="Dark.isActive ? 'blue-2' : ''"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input
                    v-model="currentStyle.target"
                    dense
                    autofocus
                    label="Target"
                    stack-label
                    :color="Dark.isActive ? 'blue-2' : ''"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section></q-item-section>
                <q-item-section side>
                  <q-btn
                    @click="saveStyle"
                    icon="save"
                    dense
                    color="positive"
                    v-close-popup
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </q-menu>
      </q-item>
      <q-item
        clickable
        v-if="permissions[typePermission + 'edit'] && Platform.is.mobile"
        @click="$refs.copyDialog.show()"
      >
        <q-item-section avatar>
          <q-icon name="content_copy" />
        </q-item-section>
        <q-item-section>Copy to</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>
        <q-dialog ref="copyDialog">
          <q-card>
            <q-list bordered padding dense>
              <q-item
                v-for="movement in filteredMovements"
                :key="movement.id"
                clickable
                @click="copyStyle"
                v-close-popup
              >
                <q-item-section>{{ movement.name }}</q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </q-dialog>
      </q-item>
      <q-item
        clickable
        v-if="permissions[typePermission + 'edit'] && !Platform.is.mobile"
      >
        <q-item-section avatar>
          <q-icon name="content_copy" />
        </q-item-section>
        <q-item-section>Copy to</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>
        <q-menu anchor="top right" self="top left">
          <q-card>
            <q-list bordered padding dense>
              <q-item
                v-for="movement in filteredMovements"
                :key="movement.id"
                clickable
                @click="copyStyle"
              >
                <q-item-section>{{ movement.name }}</q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </q-menu>
      </q-item>
      <q-separator />
      <q-item
        :disable="deleteable"
        clickable
        @click.stop="checkRemove"
        v-if="permissions[typePermission + 'delete']"
      >
        <q-item-section avatar>
          <q-icon name="delete" />
        </q-item-section>
        <q-item-section>Delete</q-item-section>
        <q-tooltip
          class="bg-accent text-grey-10"
          anchor="center right"
          self="center left"
          >Delete</q-tooltip
        >
      </q-item>
    </q-list>
    <mt-remove-dialog
      ref="deleteDialog"
      :name="currentStyle.label"
      type="Role"
      @confirmed="deleteStyle"
      persistent
    />
  </q-menu>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import {
  addStyle,
  saveStyle,
  copyStyle,
  deleteStyle,
} from "./../../scripts/styles.js";
import { defineAsyncComponent } from "vue";
import { Notify, Dark, Platform } from "quasar";
export default {
  name: "mt-style-menu",
  props: ["current", "type", "allowDelete"],
  data() {
    return {
      currentStyle: {
        label: "",
        desc: "",
      },
      ititial: {
        label: "",
        desc: "",
      },
      closeDisabled: false,
    };
  },
  created() {
    if (Object.keys(this.movements).length === 0) {
      this.fetchMovements({ uid: this.user.uid });
    }
    this.Notify = Notify;
    this.Dark = Dark;
    this.Platform = Platform;
  },
  methods: {
    ...mapActions("movements", ["fetchMovements"]),
    addStyle(e) {
      return addStyle(this.$route.params.movId, this.type)
        .then(() => {
          return Notify({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Style Added",
          });
        })
        .catch((err) => {
          Notify({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!",
          });
        });
    },
    copyStyle(e) {
      return copyStyle(this.$route.params.movId, this.currentStyle)
        .then(() => {
          return Notify({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Style Copied",
          });
        })
        .catch((err) => {
          Notify({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!",
          });
        });
    },
    deleteStyle(e) {
      this.closeDisabled = false;
      return deleteStyle(this.$route.params.movId, this.currentStyle.id)
        .then(() => {
          Notify({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Style Deleted",
          });
          this.$refs.deleteDialog && this.$refs.deleteDialog.hide();
        })
        .catch((err) => {
          Notify({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!",
          });
        });
    },
    saveStyle(e) {
      return saveStyle(
        this.$route.params.movId,
        this.user.id,
        this.currentStyle
      )
        .then(() => {
          return Notify({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Style Updated",
          });
        })
        .catch((err) => {
          Notify({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!",
          });
        });
    },
    checkRemove() {
      this.closeDisabled = true;
      this.$refs.deleteDialog.show();
    },
    toggleCloseDisabled() {
      this.closeDisabled = true; //!this.closeDisabled;
    },
  },
  computed: {
    ...mapGetters("auth", ["user"]),
    ...mapGetters("movements", ["movements"]),
    ...mapState("movement", ["movement", "permissions", "stats"]),
    deleteable() {
      // console.log(this.allowDelete ? true : false);
      if (this.allowDelete ? true : false) return false;
      if (this.currentStyle.id && this.stats[this.currentStyle.id]) {
        // console.log(id, this.stats[id].total, this.stats[id].noParentTotal)
        return this.stats[this.currentStyle.id].total > 0;
      }
      return false;
    },
    typePermission() {
      let type = "";
      if (this.type === "role") {
        type = "roles";
      } else if (this.type === "mod") {
        type = "mods";
      } else if (this.type === "complex") {
        type = "complex";
      } else if (this.type === "calc") {
        type = "calc";
      } else {
        return false;
      }
      return "settings_" + type + "_";
    },
    filteredMovements() {
      return Object.keys(this.movements).map((i) => this.movements[i]);
      // .filter(x => {
      //   return x.role === "owner" || x.role === "super editor";
      // });
    },
  },
  watch: {
    current: {
      handler() {
        if (
          JSON.stringify(this.ititial) === JSON.stringify(this.currentStyle) ||
          this.current.id !== this.currentStyle.id
        ) {
          this.currentStyle = { ...this.current };
          this.initial = { ...this.current };
        }
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    "mt-remove-dialog": defineAsyncComponent(() =>
      import("./mt-remove-dialog.vue")
    ),
  },
};
</script>
