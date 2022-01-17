<template>
  <q-menu
    touch-position
    context-menu
    ref="menu"
    data-cy="movement-menu"
    :persistent="closeDisabled"
    no-backdrop-dismiss
  >
    <q-list dense style="min-width: 120px">
      <div v-for="opt in options" :key="opt.label">
        <component
          dense
          v-if="opt.component"
          :is="opt.component.component"
          v-bind="opt.component.props"
          :data-cy="opt['data-cy']"
          @click="getClickMethod($event, opt)"
        />
        <!-- :v-close-popup="!opt.children" -->
        <q-item
          dense
          clickable
          :to="opt.to"
          :aria-label="opt.label"
          @click="getClickMethod($event, opt)"
          v-else
          :data-cy="opt['data-cy']"
        >
          <q-item-section avatar>
            <q-icon :name="opt.icon" />
          </q-item-section>
          <q-item-section>{{ opt.label }}</q-item-section>
          <q-item-section side v-if="opt.child">
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>
          <component
            v-if="opt.child"
            :ref="opt.label"
            :is="opt.child.component"
            v-bind="opt.child.props"
          ></component>
        </q-item>
        <q-separator v-if="opt.separate" />
      </div>
      <mt-remove-dialog
        ref="deleteDialog"
        :name="localMovement.name"
        type="Movement"
        @confirmed="removeMovement"
      />
    </q-list>
  </q-menu>
</template>

<script>
import { debounce, Dark, Notify, Platform } from "quasar";
import { mapGetters, mapMutations } from "vuex";
import { getFirestore, doc, updateDoc, deleteDoc } from "@firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import { defineAsyncComponent } from "vue";
import { carbonCopy, copy, create, remove } from "./../../scripts/movement.js";

export default {
  props: {
    movementProp: {},
    permissions: {},
  },
  data() {
    return {
      localMovement: {},
      closeDisabled: false,
    };
  },
  created() {
    this.Dark = Dark;
    this.createMovement = debounce(this.createMovement, 2000);
    this.copyMovement = debounce(this.copyMovement, 2000);
    this.carbonCopyMovement = debounce(this.carbonCopyMovement, 2000);
    this.removeMovement = debounce(this.removeMovement, 2000);
  },
  methods: {
    ...mapMutations("movements", ["setHidden"]),
    createMovement() {
      create(this);
    },
    copyMovement() {
      copy(this.localMovement.id, this);
    },
    carbonCopyMovement() {
      // console.log('carbonCopy')
      carbonCopy(this.localMovement.id, this);
    },
    checkRemoveMovement() {
      this.closeDisabled = true;
      this.$refs.deleteDialog.show();
    },
    removeMovement() {
      this.closeDisabled = false;
      // console.log("removeMovement");
      this.$store.commit("movements/removeMovement", this.localMovement.id);
      remove(this.localMovement.id, this);
      this.$refs.menu.hide();
      this.$refs.deleteDialog.hide();
    },
    toggleMovementHidden() {
      // console.log(this.user)
      updateDoc(
        doc(
          getFirestore(),
          `/movements/${this.localMovement.id}/users/${this.user.uid}`
        ),
        { hide: !this.localMovement.hide }
      )
        .then(() => {
          return this.setHidden({
            movId: this.localMovement.id,
            hide: !this.localMovement.hide,
          });
        })
        .catch((err) => {
          if (process.env.DEV)
            logEvent(getAnalytics(), "exception", {
              description: err,
              fatal: false,
            });
          console.error(new Error("Oops, something went wrong: " + err));
        });
    },
    leaveMovement(id) {
      // console.log(`/movements/${id}/users/${this.user.uid}`);
      deleteDoc(doc(getFirestore(), `/movements/${id}/users/${this.user.uid}`))
        .then((res) => {
          Notify.create({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: this.user.displayName
              ? this.user.displayName
              : this.user.email + " has left the building!",
          });
          if (process.env.DEV)
            logEvent(getAnalytics(), "movement_leave", {
              movement: this.user.uid,
            });
          return true;
        })
        .catch((err) => {
          if (process.env.DEV)
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
        });
    },
    getClickMethod($event, opt) {
      for (var platform in opt.platform) {
        if (Platform.is[platform] && opt.platform[platform].click) {
          return opt.platform[platform].click($event);
        }
      }
      return opt.click ? opt.click($event) : () => {};
    },
    toggleCloseDisabled() {
      this.closeDisabled = true; //!this.closeDisabled;
    },
  },
  computed: {
    ...mapGetters("auth", ["user"]),
    options() {
      const allOpts = [
        {
          label: "Open",
          icon: Dark.isActive
            ? "img:icons/file-tree-white.svg"
            : "img:icons/file-tree.svg",
          to: "/movement/" + this.localMovement.id + "/members",
          separate: true,
          hideIf: !this.$route.path.includes("home"),
          "data-cy": "open-movement",
        },
        {
          label: "New",
          icon: "add",
          click: this.createMovement,
          separate: true,
          hideIf: !this.$route.path.includes("home"),
          "data-cy": "create-movement",
        },
        {
          label: "Rename",
          icon: "edit",
          hideIf: !this.permissions.movement_edit,
          platform: {
            mobile: {
              click: ($event) => {
                this.$refs.Rename[0].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() =>
              import("./mt-rename-movement.vue")
            ),
            props: { localMovement: this.localMovement },
          },
          "data-cy": "rename-movement",
        },
        {
          label: "Change Color",
          icon: "color_lens",
          hideIf: !this.permissions.movement_edit,
          platform: {
            mobile: {
              click: ($event) => {
                this.$refs["Change Color"][0].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() =>
              import("./mt-change-movement-color.vue")
            ),
            props: { localMovement: this.localMovement },
          },
          "data-cy": "change-movement-color",
        },
        {
          component: {
            component: defineAsyncComponent(() =>
              import("./mt-take-snapshot.vue")
            ),
            props: { menu: true, movId: this.localMovement.id },
          },
          hideIf: !this.permissions.snapshots_update,
          "data-cy": "update-snap-movement",
          click: this.toggleCloseDisabled,
        },
        {
          label: "Copy",
          icon: "content_copy",
          hideIf: !this.permissions.movement_copy,
          click: this.copyMovement,
          tooltip: "Copy Movement Stucture",
          "data-cy": "copy-movement",
        },
        // {
        //   label: "Carbon Copy",
        //   icon: "content_copy",
        //   click: this.carbonCopyMovement,
        //   hideIf: !this.permissions.movement_carbonCopy,
        //   tooltip: "Copy Movement in it's entirinty",
        //   "data-cy": "carbon-copy-movement",
        // },
        {
          label: this.localMovement.hide ? "Show" : "Hide",
          icon: this.localMovement.hide ? "visibility" : "visibility_off",
          click: this.toggleMovementHidden,
          separate: true,
          "data-cy": "hide-movement",
        },
        {
          label: "Settings",
          icon: "settings",
          to: "/movement/" + this.localMovement.id + "/settings",
          hideIf: !this.permissions.settings_view,
          "data-cy": "settings-link",
        },
        {
          label: "Access",
          icon: "people",
          to: "/movement/" + this.localMovement.id + "/access",
          separate: true,
          hideIf: !this.permissions.access_view,
          "data-cy": "access-link",
        },
        {
          label: "Delete",
          icon: "delete_forever",
          click: this.checkRemoveMovement,
          hideIf: !this.permissions.movement_delete,
          "data-cy": "delete-movement",
        },
        {
          label: "Leave Movement",
          icon: "delete",
          click: () => {
            this.leaveMovement(this.localMovement.id);
          },
          hideIf: this.permissions.movement_delete,
          "data-cy": "leave-movement",
        },
      ];
      const filteredOpts = [];

      for (var opt of allOpts) {
        if (!opt.hideIf) {
          filteredOpts.push(opt);
        }
      }
      return filteredOpts;
    },
  },
  watch: {
    movementProp: {
      deep: true,
      immediate: true,
      handler() {
        this.localMovement = { ...this.movementProp };
      },
    },
  },
  components: {
    "mt-remove-dialog": defineAsyncComponent(() =>
      import("./mt-remove-dialog.vue")
    ),
  },
};
</script>
