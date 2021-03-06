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
          <q-dialog
            v-else
            :ref="
              (el) => {
                refs[opt.label + '-menu'] = el;
              }
            "
          >
            <component
              v-if="opt.child"
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
import { copy } from './../../scripts/member.js';
import {
  getFirestore,
  setDoc,
  doc,
  deleteField,
  arrayRemove,
} from '@firebase/firestore';
import { defineAsyncComponent, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';

export default {
  name: 'mt-member-context-menu',
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
  emits: ['selected', 'changeTree'],
  setup(props, { emit }) {
    const q = useQuasar();
    const store = useStore();
    const route = useRoute();
    const l_member = ref({});
    const refs = ref({});
    function copyMember() {
      return copy(l_member.value.id, route.params.movId, this);
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
          label: 'Select',
          icon: 'check',
          click: () => emit('selected', l_member.value.id),
          separate: true,
          hideIf: !(permissions.value.members_edit && !props.readOnly),
        },
        {
          label: 'New',
          icon: 'person_add',
          hideIf:
            !(permissions.value.members_create && !props.readOnly) ||
            props.shadow ||
            (props.node && props.node.subTree),
          separate: !props.treeOpt,
          platform: {
            mobile: {
              click: ($event) => {
                refs.value['New-menu'].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() =>
              import('./mt-add-member.vue')
            ),
            props: { parent: l_member.value.id, treeOpt: props.treeOpt },
          },
        },
        {
          label: 'Existing',
          icon: 'person_add',
          hideIf:
            !(permissions.value.members_edit && !props.readOnly) ||
            !props.treeOpt ||
            props.shadow ||
            (props.node && props.node.subTree),
          platform: {
            mobile: {
              click: ($event) => {
                // console.log(refs.value["Existing-menu"][0]);
                refs.value['Existing-menu'].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() =>
              import('./AddExistingMemberToTree.vue')
            ),
            props: {
              parent: l_member.value.id,
              treeId: props.treeOpt && props.treeOpt.id,
            },
          },
        },
        {
          label: 'Add sub-tree',
          icon: q.dark.isActive
            ? 'img:icons/file-tree-white.svg'
            : 'img:icons/file-tree.svg',
          hideIf:
            !(permissions.value.subTrees_add && !props.readOnly) ||
            !props.treeOpt ||
            props.shadow ||
            (props.node && props.node.subTree),
          separate: true,
          platform: {
            mobile: {
              click: ($event) => {
                // console.log(refs.value["Existing-menu"][0]);
                refs.value['Add sub-tree'].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() => import('./AddSubTree.vue')),
            props: {
              parent: l_member.value.id,
              treeId: props.treeOpt && props.treeOpt.id,
            },
          },
        },
        {
          label: 'Go to Tree',
          icon: q.dark.isActive
            ? 'img:icons/file-tree-white.svg'
            : 'img:icons/file-tree.svg',
          hideIf: !props.treeOpt || !(props.node && props.node.subTree),
          separate: true,
          click: () => {
            emit('changeTree', props.node.subTree);
          },
        },
        {
          label: 'Add to Tree',
          icon: q.dark.isActive
            ? 'img:icons/file-tree-white.svg'
            : 'img:icons/file-tree.svg',
          hideIf: !(
            permissions.value.members_edit &&
            !props.readOnly &&
            !props.treeOpt
          ),
          platform: {
            mobile: {
              click: ($event) => {
                // console.log(refs.value["Existing-menu"][0]);
                refs.value['Add to Tree-menu'].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() =>
              import('./AddMemberToTree.vue')
            ),
            props: {
              member: l_member.value,
            },
          },
        },
        {
          label: 'View',
          icon: `person`,
          platform: {
            mobile: {
              click: ($event) => {
                refs.value['View-menu'].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() =>
              import('./mt-member-view-menu.vue')
            ),
            props: { l_member: l_member.value },
          },
        },
        {
          label: 'Edit',
          icon: 'edit',
          hideIf:
            !(permissions.value.members_edit && !props.readOnly) ||
            !props.treeOpt ||
            (props.node && props.node.subTree),
          platform: {
            mobile: {
              click: ($event) => {
                refs.value['Edit-menu'].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() =>
              import('./mt-edit-member.vue')
            ),
            props: {
              member: l_member.value,
              node: props.node,
              treeOpt: props.treeOpt,
              shadow: props.shadow,
            },
          },
        },
        {
          label: 'Move',
          icon: q.dark.isActive
            ? 'img:icons/outline_person_move_white.svg'
            : 'img:icons/outline_person_move_black.svg',
          hideIf:
            !(permissions.value.members_edit && !props.readOnly) ||
            !props.treeOpt ||
            (props.node && props.node.subTree),
          platform: {
            mobile: {
              click: ($event) => {
                refs.value['Move-menu'].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() =>
              import('./MoveMemberInTree.vue')
            ),
            props: {
              movement: movement,
              member: l_member.value,
              treeOpt: props.treeOpt,
              shadow: props.shadow,
              currentParent: props.node ? props.node.parent : null,
            },
          },
        },
        {
          label: 'Copy',
          icon: 'content_copy',
          hideIf: !(permissions.value.members_edit && !props.readOnly),
          click: copyMember,
        },
        {
          label: 'Notes',
          icon: 'notes',
          separate: true,
          hideIf: !(permissions.value.members_edit && !props.readOnly),
          platform: {
            mobile: {
              click: ($event) => {
                refs.value['Notes-menu'].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() => import('./MemberNotes.vue')),
            props: { member: l_member.value },
            events: { save: () => this.refs.value['Notes-menu'].hide() },
          },
        },
        {
          label: 'Remove from Tree',
          icon: 'person_remove',
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
                { [l_member.value.id]: deleteField() },
                { merge: true }
              );
            }
            return true;
          },
        },
        {
          label: 'Remove Tree',
          icon: 'person_remove',
          hideIf:
            !permissions.value.subTrees_remove ||
            !props.treeOpt ||
            !(props.node && props.node.subTree),
          click: async () => {
            if (props.treeOpt && props.treeOpt.id) {
              return await setDoc(
                doc(
                  getFirestore(),
                  `/movements/${movement.value.id}/trees/${props.treeOpt.id}/components/parents`
                ),
                { [props.node.subTree]: deleteField() },
                { merge: true }
              ).then(() => {
                setDoc(
                  doc(
                    getFirestore(),
                    `/movements/${movement.value.id}/trees/${props.node.subTree}`
                  ),
                  { importedBy: arrayRemove(props.treeOpt.id) },
                  { merge: true }
                );
              });
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
            component: defineAsyncComponent(() => import('./DeleteMember.vue')),
            props: {
              member: l_member.value,
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
        // console.log('member changed', l_member.value, member)
        l_member.value = { ...newVal };
      },
      { immediate: true, deep: true }
    );
    return { q, l_member, movement, options, getClickMethod, refs };
  },
};
</script>
