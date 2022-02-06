<template>
  <div>
    <q-drawer
      show-if-above
      mini
      overlay
      :width="200"
      :breakpoint="1"
      bordered
      style="background-color: #c54210; color: white"
      v-model="toolCabinet"
    >
      <q-scroll-area style="height: calc(100vh - 60px)">
        <q-list padding>
          <div v-for="(tool, index) in toolListFiltered" :key="index">
            <q-item
              clickable
              v-ripple
              v-if="tool.item"
              v-on="tool.item.events ? tool.item.events : {}"
              :class="tool.item.classes"
              :style="tool.item.styles"
              :data-cy="tool['data-cy']"
            >
              <q-item-section avatar>
                <q-icon :name="tool.item.icon" />
                <q-badge
                  floating
                  v-if="tool.badge"
                  style="
                    min-height: 12px;
                    right: 8px;
                    top: 8px;
                    background-color: #0f0;
                  "
                  >{{
                    tool.badge > '' && tool.badge !== true ? tool.badge : ''
                  }}</q-badge
                >
              </q-item-section>

              <q-tooltip
                class="bg-accent text-grey-10"
                anchor="center right"
                self="center left"
                >{{ tool.item.tooltip }}</q-tooltip
              >
              <q-menu
                :ref="
                  (el) => {
                    if (el) refs[tool['data-cy'] + '-menu'] = el;
                  }
                "
                anchor="bottom right"
                self="top left"
                style="min-height: 378px"
                v-if="tool.component && tool.component.isMenu"
              >
                <component
                  dense
                  :is="tool.component.component"
                  v-bind="tool.component.props"
                  v-on="tool.component.events ? tool.component.events : {}"
                />
              </q-menu>
            </q-item>
            <component
              dense
              v-if="tool.component && !tool.component.isMenu"
              :is="tool.component.component"
              v-bind="tool.component.props"
              v-on="tool.component.events ? tool.component.events : {}"
              :data-cy="tool['data-cy']"
            />
            <q-separator v-if="tool.separate" />
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
// import { $firestore } from "./../data/firebase.js";
import { useStore } from 'vuex';
import { saveAs } from 'file-saver';
import { defineAsyncComponent, ref, computed } from 'vue';
export default {
  props: {
    readOnly: Boolean,
    tab: String,
    treeOpt: {},
    storeModule: String,
  },
  setup(props) {
    const store = useStore();
    const refs = ref({});
    const toolCabinet = ref(true);
    const storeModule = ref(props.storeModule ? props.storeModule : 'movement');
    function changeSize(val) {
      store.dispatch('changeSize', val);
    }
    function showDrawer(val) {
      store.dispatch('showDrawer', val);
    }
    function toggleFilterVisible(val) {
      store.commit(`${storeModule.value}/toggleFilterVisible`, val);
    }
    function exportToCSV() {
      // get all the members and their data
      let l_members = JSON.parse(JSON.stringify(members.value));
      for (var memberId in l_members) {
        let member = l_members[memberId];
        // console.log(memberId, member, member.name);
        if (!member.name) continue;
        member.role = roles.value[member.role]
          ? roles.value[member.role].label
          : roles.value[member.role];
        member.mods = Array.isArray(member.mods) ? member.mods : [];
        for (var styleId in member.mods) {
          member.mods[styleId] = mods.value[member.mods[styleId]]
            ? mods[member.mods[styleId]].label
            : mods[member.mods[styleId]];
        }
      }

      // bundle the members into a CSV file
      let csv = 'Name, Role, Modifiers, Notes\r\n';
      for (var memberId in l_members) {
        if (memberId === 'root' || memberId === 'No Parent') continue;
        let member = l_members[memberId];
        csv += '"' + member.name + '",';
        csv += '"' + member.role + '",';
        csv += '"' + member.mods.toString().replace(/,/g, ', ') + '",';
        csv += '"' + (member.notes ? member.notes.replace(/\r?\n/g, ', ') : '');
        csv += '"\r\n';
      }
      // download the file
      saveAs(
        new Blob([csv], { type: 'text/plain;charset=utf-8' }),
        `${movement.value.name}.csv`
      );
    }
    const movement = computed(() => store.state[storeModule.value].movement);
    const roles = computed(() => store.state[storeModule.value].roles);
    const mods = computed(() => store.state[storeModule.value].mods);
    const members = computed(() => store.state[storeModule.value].members);
    const filterQuery = computed(
      () => store.state[storeModule.value].filterQuery
    );
    const permissions = computed(() => store.state.movement.permissions);

    const toolListFiltered = computed(() => {
      const filteredTools = [];
      let toolList = [
        {
          item: { icon: 'person_add', tooltip: 'Add Member' },
          hideIf: !permissions.value.members_create,
          component: {
            component: defineAsyncComponent(() =>
              import('./actions/mt-add-member.vue')
            ),
            props: { treeOpt: props.treeOpt },
            events: {
              success: () => {
                refs.value['create-member-menu'].hide();
              },
            },
            isMenu: true,
          },
          'data-cy': 'create-member',
        },
        {
          hideIf: !permissions.value.snapshots_update,
          component: {
            component: defineAsyncComponent(() =>
              import('./actions/mt-take-snapshot.vue')
            ),
            props: {},
            isMenu: false,
          },
          separate: true,
          'data-cy': 'update-snap-movement',
        },
        {
          item: {
            icon: 'zoom_out',
            tooltip: 'Zoom Out',
            events: { click: () => changeSize('-') },
            styles: 'cursor: zoom-out;',
          },
          readOnly: true,
          'data-cy': 'zoom-out',
        },
        {
          item: {
            icon: 'zoom_in',
            tooltip: 'Zoom In',
            events: { click: () => changeSize('+') },
            styles: 'cursor: zoom-in;',
          },
          readOnly: true,
          'data-cy': 'zoom-in',
        },
        {
          item: {
            icon: 'filter_alt',
            tooltip: 'Filter and Sort',
            events: { click: () => toggleFilterVisible() },
          },
          readOnly: true,
          badge: filterQuery.value > '',
          separate: true,
          'data-cy': 'filter-members',
        },
        {
          item: {
            icon: 'equalizer',
            tooltip: 'Movement Summary',
            events: { click: () => showDrawer('movementDetails') },
          },
          readOnly: true,
          'data-cy': 'movement-summary',
        },
        {
          item: {
            icon: 'view_list',
            tooltip: 'Legend of Symbols',
            events: { click: () => showDrawer('movementLegend') },
          },
          readOnly: true,
          'data-cy': 'movement-legend',
        },
        // {
        //   item: {
        //     icon: "print",
        //     tooltip: "Print",
        //     events: { click: () => $router.push({ name: "printable" }) },
        //   },
        //   hideIf: !permissions.value.trees_export,
        //   readOnly: true,
        //   "data-cy": "print",
        // },
        {
          item: {
            icon: 'import_export',
            tooltip: 'Export Members to CSV',
            events: { click: () => exportToCSV() },
          },
          hideIf: !permissions.value.members_export || props.readOnly,
          readOnly: true,
          'data-cy': 'export-members',
        },
      ];

      for (var tool of toolList) {
        if (tool.hideIf) continue;
        if (
          (!props.readOnly || (props.readOnly && tool.readOnly)) &&
          (tool.excludedTabs ? !tool.excludedTabs.includes(props.tab) : true)
        ) {
          filteredTools.push(tool);
        }
      }
      return filteredTools;
    });
    return { toolCabinet, toggleFilterVisible, toolListFiltered, refs };
  },
};
</script>
