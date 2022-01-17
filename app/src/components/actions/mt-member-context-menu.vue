<template>
  <q-menu touch-position context-menu ref="menu">
    <q-list dense style="min-width: 120px">
      <div v-for="opt in options" :key="opt.label">
        <component
          dense
          v-if="opt.component"
          :is="opt.component.component"
          v-bind="opt.component.props"
        />
        <q-item
          dense
          clickable
          :v-close-popup="!opt.children"
          :to="opt.to"
          :aria-label="opt.label"
          @click="getClickMethod($event, opt)"
          v-else
        >
          <q-item-section avatar>
            <q-icon :name="opt.icon" />
          </q-item-section>
          <q-item-section>{{ opt.label }}</q-item-section>
          <q-item-section side v-if="opt.child">
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>
          <q-menu
            v-if="!q.platform.is.mobile"
            anchor="top right"
            self="top left"
            :ref="opt.label + '-menu'"
          >
            <component
              v-if="opt.child"
              :ref="opt.label"
              :is="opt.child.component"
              v-bind="opt.child.props"
              v-on="opt.child.events ? opt.child.events : {}"
              v-close-popup="!opt.child"
            ></component>
          </q-menu>
          <q-dialog v-else :ref="opt.label + '-menu'">
            <component
              v-if="opt.child"
              :ref="opt.label"
              :is="opt.child.component"
              v-bind="opt.child.props"
              v-on="opt.child.events ? opt.child.events : {}"
            ></component>
          </q-dialog>
        </q-item>
        <q-separator v-if="opt.separate" />
      </div>
    </q-list>
  </q-menu>
</template>

<script>
import { copy } from "./../../scripts/member.js";
import { getFirestore, setDoc, doc, deleteField } from "@firebase/firestore";
import { defineAsyncComponent, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";

export default {
  name: "mt-member-context-menu",
  props: {
    member: {
      children: [],
    },
    readOnly: Boolean,
    deleteable: Boolean,
    treeOpt: null,
    node: {},
    shadow: false,
  },
  setup(props, { emit }) {
    const q = useQuasar();
    const store = useStore();
    const route = useRoute();
    const localMember = ref({});
    function copyMember() {
      return copy(localMember.value.id, route.params.movId, this);
    }
    function getClickMethod($event, opt) {
      for (var platform in opt.platform) {
        if (q.platform.is[platform] && opt.platform[platform].click) {
          return opt.platform[platform].click($event);
        }
      }
      return opt.click ? opt.click($event) : () => {};
    }
    const movement = computed(() => store.state.movement.movement);
    const permissions = computed(() => store.state.movement.permissions);
    const options = computed(() => {
      const allOpts = [
        {
          label: "Select",
          icon: "check",
          click: () => emit("selected", localMember.value.id),
          separate: true,
          hideIf: !(permissions.value.members_edit && !props.readOnly),
        },
        {
          label: "New",
          icon: "person_add",
          hideIf:
            !(permissions.value.members_create && !props.readOnly) ||
            props.shadow ||
            (props.node && props.node.subTree),
          separate: !props.treeOpt,
          platform: {
            mobile: {
              click: ($event) => {
                $refs["New-menu"][0].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() =>
              import("./mt-add-member.vue")
            ),
            props: { parent: localMember.value.id, treeOpt: props.treeOpt },
          },
        },
        {
          label: "Existing",
          icon: "person_add",
          hideIf:
            !(permissions.value.members_edit && !props.readOnly) ||
            !props.treeOpt ||
            props.shadow ||
            (props.node && props.node.subTree),
          platform: {
            mobile: {
              click: ($event) => {
                // console.log($refs["Existing-menu"][0]);
                $refs["Existing-menu"][0].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() =>
              import("./AddExistingMemberToTree.vue")
            ),
            props: {
              parent: localMember.value.id,
              treeId: props.treeOpt && props.treeOpt.id,
            },
          },
        },
        {
          label: "Add sub-tree",
          icon: q.dark.isActive
            ? "img:icons/file-tree-white.svg"
            : "img:icons/file-tree.svg",
          hideIf:
            !(permissions.value.subTrees_add && !props.readOnly) ||
            !props.treeOpt ||
            props.shadow ||
            (props.node && props.node.subTree),
          separate: true,
          platform: {
            mobile: {
              click: ($event) => {
                // console.log($refs["Existing-menu"][0]);
                $refs["Add sub-tree"][0].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() => import("./AddSubTree.vue")),
            props: {
              parent: localMember.value.id,
              treeId: props.treeOpt && props.treeOpt.id,
            },
          },
        },
        {
          label: "Go to Tree",
          icon: q.dark.isActive
            ? "img:icons/file-tree-white.svg"
            : "img:icons/file-tree.svg",
          hideIf: !props.treeOpt || !(props.node && props.node.subTree),
          separate: true,
          click: () => {
            emit("changeTree", props.node.subTree);
          },
        },
        {
          label: "Add to Tree",
          icon: q.dark.isActive
            ? "img:icons/file-tree-white.svg"
            : "img:icons/file-tree.svg",
          hideIf: !(
            permissions.value.members_edit &&
            !props.readOnly &&
            !props.treeOpt
          ),
          platform: {
            mobile: {
              click: ($event) => {
                // console.log($refs["Existing-menu"][0]);
                $refs["Add to Tree-menu"][0].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() =>
              import("./AddMemberToTree.vue")
            ),
            props: {
              member: localMember.value,
            },
          },
        },
        {
          label: "View",
          icon: `person`,
          platform: {
            mobile: {
              click: ($event) => {
                $refs["View-menu"][0].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() =>
              import("./mt-member-view-menu.vue")
            ),
            props: { localMember: localMember.value },
          },
        },
        {
          label: "Edit",
          icon: "edit",
          hideIf:
            !(permissions.value.members_edit && !props.readOnly) ||
            !props.treeOpt ||
            (props.node && props.node.subTree),
          platform: {
            mobile: {
              click: ($event) => {
                $refs["Edit-menu"][0].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() =>
              import("./mt-edit-member.vue")
            ),
            props: {
              member: localMember.value,
              node: props.node,
              treeOpt: props.treeOpt,
              shadow: props.shadow,
            },
          },
        },
        {
          label: "Move",
          icon: q.dark.isActive
            ? "img:icons/outline_person_move_white.svg"
            : "img:icons/outline_person_move_black.svg",
          hideIf:
            !(permissions.value.members_edit && !props.readOnly) ||
            !props.treeOpt ||
            (props.node && props.node.subTree),
          platform: {
            mobile: {
              click: ($event) => {
                $refs["Move-menu"][0].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() =>
              import("./MoveMemberInTree.vue")
            ),
            props: {
              movement: movement,
              member: localMember.value,
              treeOpt: props.treeOpt,
              shadow: props.shadow,
              currentParent: props.node ? props.node.parent : null,
            },
          },
        },
        {
          label: "Copy",
          icon: "content_copy",
          hideIf: !(permissions.value.members_edit && !props.readOnly),
          click: copyMember,
        },
        {
          label: "Notes",
          icon: "notes",
          separate: true,
          hideIf: !(permissions.value.members_edit && !props.readOnly),
          platform: {
            mobile: {
              click: ($event) => {
                $refs["Notes-menu"][0].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() => import("./MemberNotes.vue")),
            props: { member: localMember.value },
            events: { save: () => this.$refs["Notes-menu"].hide() },
          },
        },
        {
          label: "Remove from Tree",
          icon: "person_remove",
          hideIf:
            !permissions.value.members_edit ||
            !props.treeOpt ||
            (props.node && props.node.subTree),
          click: async () => {
            if (props.treeOpt && props.treeOpt.id) {
              return await setDoc(
                doc(
                  getFirestore(),
                  `/movements/${movement.value.id}/trees/${props.treeOpt.id}/components/parents`
                ),
                { [localMember.value.id]: deleteField() },
                { merge: true }
              );
            }
            return true;
          },
        },
        {
          label: "Remove Tree",
          icon: "person_remove",
          hideIf:
            !permissions.value.subTrees_remove ||
            !props.treeOpt ||
            !(props.node && props.node.subTree),
          click: async () => {
            if (props.treeOpt && props.treeOpt.id) {
              return await setDoc(
                doc(
                  getFirestore(),
                  `/movements/${movement.id}/trees/${props.treeOpt.id}/components/parents`
                ),
                { [props.node.subTree]: deleteField() },
                { merge: true }
              );
            }
            return true;
          },
        },
        {
          hideIf:
            !(permissions.value.members_delete && !props.readOnly) ||
            !props.treeOpt ||
            (props.node && props.node.subTree),
          component: {
            component: defineAsyncComponent(() => import("./DeleteMember.vue")),
            props: {
              member: localMember.value,
              deleteable: props.deleteable,
              readOnly: props.readOnly,
            },
          },
        },
      ];
      const filteredOpts = [];

      for (var opt of allOpts) {
        if (!opt.restrictTo || opt.restrictTo.indexOf(movement.role) !== -1) {
          if (!opt.hideIf) {
            filteredOpts.push(opt);
          }
        }
      }
      return filteredOpts;
    });
    watch(
      props.member,
      (newVal, oldVal) => {
        // console.log('member changed', localMember.value, member)
        localMember.value = { ...newVal };
      },
      { immediate: true, deep: true }
    );
    return { q, localMember, movement, options, getClickMethod };
  },
};
</script>
