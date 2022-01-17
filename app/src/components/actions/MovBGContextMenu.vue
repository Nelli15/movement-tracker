<template>
  <q-menu context-menu touch-position ref="newMenu">
    <q-list dense style="min-width: 100px">
      <div v-for="opt in options" :key="opt.label">
        <component
          dense
          v-if="opt.component"
          :is="opt.component.component"
          v-bind="opt.component.props"
          v-on="opt.component.events ? opt.component.events : {}"
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
          >
            <component
              v-if="opt.child"
              :ref="opt.label"
              :is="opt.child.component"
              v-bind="opt.child.props"
            ></component>
          </q-menu>
          <q-dialog v-else :ref="opt.label + '-menu'">
            <component
              v-if="opt.child"
              :ref="opt.label"
              :is="opt.child.component"
              v-bind="opt.child.props"
            ></component>
          </q-dialog>
        </q-item>
        <q-separator v-if="opt.separate" />
      </div>
    </q-list>
  </q-menu>
</template>

<script>
import { defineAsyncComponent, computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
export default {
  name: 'MovBGContextMenu',
  props: ['treeOpt', 'readOnly', 'storeModule'],
  setup(props) {
    const q = useQuasar();
    const store = useStore();
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
    const storeModule = ref(props.storeModule ? props.storeModule : 'movement');
    const options = computed(() => {
      const allOpts = [
        {
          label: 'Filter',
          icon: 'filter_alt',
          click: () =>
            store.commit(`${storeModule.value}/toggleFilterVisible`, {}),
          separate: true,
        },
        {
          label: 'New Tree',
          icon: q.dark.isActive
            ? 'img:icons/file-tree-white.svg'
            : 'img:icons/file-tree.svg',
          hideIf: !permissions.value.trees_create || props.readOnly,
          separate: false,
          platform: {
            mobile: {
              click: ($event) => {
                $refs['New Tree-menu'][0].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() => import('./CreateTree.vue')),
            props: {},
          },
        },
        {
          label: 'Rename Tree',
          icon: q.dark.isActive
            ? 'img:icons/file-tree-white.svg'
            : 'img:icons/file-tree.svg',
          hideIf: !permissions.value.trees_create || props.readOnly,
          separate: false,
          platform: {
            mobile: {
              click: ($event) => {
                $refs['Rename Tree-menu'][0].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() => import('./RenameTree.vue')),
            props: { treeOpt: props.treeOpt },
          },
        },
        {
          hideIf: !permissions.value.trees_delete || props.readOnly,
          separate: true,
          component: {
            component: defineAsyncComponent(() =>
              import('./mt-delete-tree.vue')
            ),
            props: {
              treeOpt: props.treeOpt,
              menu: true,
            },
          },
        },
        {
          label: 'New Member',
          icon: 'person_add',
          hideIf: !permissions.value.members_create || props.readOnly,
          platform: {
            mobile: {
              click: ($event) => {
                $refs['New Member-menu'][0].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() =>
              import('../actions/mt-add-member.vue')
            ),
            props: { parent: 'root', treeOpt: props.treeOpt },
          },
        },
        {
          label: 'Existing',
          icon: 'person_add',
          hideIf: !permissions.value.members_edit || props.readOnly,
          platform: {
            mobile: {
              click: ($event) => {
                // console.log($refs["Existing-menu"][0]);
                $refs['Existing-menu'][0].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() =>
              import('./AddExistingMemberToTree.vue')
            ),
            props: {
              parent: 'root',
              treeId: props.treeOpt && props.treeOpt.id,
            },
          },
        },
        {
          label: 'Add sub-tree',
          icon: q.dark.isActive
            ? 'img:icons/file-tree-white.svg'
            : 'img:icons/file-tree.svg',
          hideIf: !permissions.value.subTrees_add || props.readOnly,
          separate: true,
          platform: {
            mobile: {
              click: ($event) => {
                // console.log($refs["Existing-menu"][0]);
                $refs['Add sub-tree'][0].show();
              },
            },
          },
          child: {
            component: defineAsyncComponent(() => import('./AddSubTree.vue')),
            props: {
              parent: 'root',
              treeId: props.treeOpt && props.treeOpt.id,
            },
          },
        },
        {
          hideIf: props.readOnly,
          component: {
            component: defineAsyncComponent(() =>
              import('./mt-take-snapshot.vue')
            ),
            props: { menu: true },
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
    return { q, movement, permissions, options, getClickMethod };
  },
  components: {
    'mt-member-node': defineAsyncComponent(() =>
      import('../mt-member-node.vue')
    ),
    'mt-add-member': defineAsyncComponent(() =>
      import('../actions/mt-add-member.vue')
    ),
    'mt-summary-drawer': defineAsyncComponent(() =>
      import('../mt-summary-drawer.vue')
    ),
    'mt-legend-drawer': defineAsyncComponent(() =>
      import('../mt-legend-drawer.vue')
    ),
    'mt-movement-toolbox': defineAsyncComponent(() =>
      import('../mt-movement-toolbox.vue')
    ),
    'mt-batch': defineAsyncComponent(() => import('../mt-batch.vue')),
    'mt-take-snapshot': defineAsyncComponent(() =>
      import('./mt-take-snapshot.vue')
    ),
    'mt-filter-sort': defineAsyncComponent(() =>
      import('./../mt-filter-sort.vue')
    ),
  },
};
</script>
