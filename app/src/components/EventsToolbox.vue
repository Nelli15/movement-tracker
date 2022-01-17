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
              v-on="tool.item.events && tool.item.events"
              :class="tool.item.classes"
              :style="tool.item.styles"
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
                    tool.badge > "" && tool.badge !== true ? tool.badge : ""
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
                ref="menu"
                anchor="bottom right"
                self="top left"
                style=""
                v-if="tool.component && tool.component.isMenu"
              >
                <component
                  dense
                  :is="tool.component.component"
                  v-bind="tool.component.props"
                  v-on="tool.component.events && tool.component.events"
                />
              </q-menu>
            </q-item>
            <component
              dense
              v-if="tool.component && !tool.component.isMenu"
              :is="tool.component.component"
              v-bind="tool.component.props"
              v-on="tool.component.events && tool.component.events"
            />
            <q-separator v-if="tool.separate" />
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { saveAs } from "file-saver";
import { defineAsyncComponent } from "vue";

export default {
  name: "EventsToolBox",
  props: {
    showFilter: Boolean,
    readOnly: Boolean,
    tab: String,
  },
  data() {
    return {
      toolCabinet: true,
    };
  },
  methods: {
    ...mapActions(["changeSize", "showDrawer"]),
    ...mapMutations("movement", ["toggleFilterVisible"]),
    exportToCSV() {
      // get all the members and their data
      let members = JSON.parse(JSON.stringify(this.members));
      for (var memberId in members) {
        let member = members[memberId];
        member.role = this.roles[member.role]
          ? this.roles[member.role].label
          : this.roles[member.role];
        member.mods = Array.isArray(member.mods) ? member.mods : [];
        for (var styleId in member.mods) {
          member.mods[styleId] = this.mods[member.mods[styleId]]
            ? this.mods[member.mods[styleId]].label
            : this.mods[member.mods[styleId]];
        }
        member.parent = members[member.parent]
          ? members[member.parent].name
          : member.parent;
        member.alt = members[member.alt]
          ? members[member.alt].name
          : member.alt;
      }

      // bundle the members into a CSV file
      let csv = "Name, Role, Modifiers, Parent, Alternate Parent, Notes\r\n";
      for (var memberId in members) {
        if (memberId === "root" || memberId === "No Parent") continue;
        let member = members[memberId];
        csv += '"' + member.name + '",';
        csv += '"' + member.role + '",';
        csv += '"' + member.mods.toString().replace(/,/g, ", ") + '",';
        csv += '"' + member.parent + '",';
        csv += '"' + member.alt + '",';
        csv += '"' + (member.notes ? member.notes.replace(/\r?\n/g, ", ") : "");
        csv += '"\r\n';
      }
      // download the file
      saveAs(
        new Blob([csv], { type: "text/plain;charset=utf-8" }),
        `${this.movement.name}.csv`
      );
    },
  },
  computed: {
    ...mapGetters("movement", ["role"]),
    ...mapState("movement", [
      "members",
      "roles",
      "mods",
      "movement",
      "filterQuery",
    ]),
    toolListFiltered() {
      const filteredTools = [];
      let toolList = [
        {
          item: { icon: "person_add", tooltip: "Add Member" },
          hideIf: this.permissions.events_create,
          component: {
            component: defineAsyncComponent(() =>
              import("./actions/mt-add-member.vue")
            ),
            props: {},
            events: { success: () => this.$refs.newMenu.hide() },
            isMenu: true,
          },
        },
        {
          item: { icon: "event", tooltip: "Add Event" },
          restrictTo: ["editor", "super editor", "owner"],
          component: {
            component: defineAsyncComponent(() => import("./EventCreate.vue")),
            props: {},
            events: { success: () => this.$refs.newEventMenu.hide() },
            isMenu: true,
          },
        },
      ];

      for (var tool of toolList) {
        if (
          (!tool.restrictTo || tool.restrictTo.indexOf(this.role) !== -1) &&
          (!this.readOnly || (this.readOnly && tool.readOnly)) &&
          (tool.excludedTabs ? !tool.excludedTabs.includes(this.tab) : true)
        ) {
          filteredTools.push(tool);
        }
      }
      return filteredTools;
    },
  },
};
</script>
