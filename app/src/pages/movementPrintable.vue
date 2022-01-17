<template>
  <div>
    <div style="min-height: 90vh">
      <div class="text-center text-h3 w-100">
        {{ movement ? movement.name : "" }}
      </div>
      <!-- <Container @drop="e => onDrop('root', e)" group-name="members" style="width:100%"> -->
      <div class="row">
        <!-- {{tree}} -->
        <!-- {{members}} -->
        <q-tree
          v-for="member in tree"
          :key="member.id"
          :nodes="[member]"
          node-key="id"
          label-key="display.label"
          default-expand-all
          :filter="filter"
          :filter-method="treeFilterMethod"
          no-results-label=" "
        >
          <template v-slot:default-header="prop">
            <!-- <Container @drop="onDrop"> -->
            <!-- {{prop.node}} -->
            <mt-member-node :member="members[prop.node.id]" readOnly />
            <!-- </Container> -->
          </template>
        </q-tree>
      </div>
      <!-- </Container> -->
      <q-separator />
      <q-expansion-item
        label="Members with No Parent"
        v-show="noParents.length > 0"
        default-opened
      >
        <!-- <Container @drop="e => onDrop('No Parent', e)" group-name="members" style="width:100%"> -->
        <div class="row">
          <q-tree
            v-for="member in noParents"
            :key="member.id"
            :nodes="[member]"
            node-key="id"
            label-key="display.label"
            default-expand-all
            :filter="filter"
            :filter-method="treeFilterMethod"
            no-results-label=" "
          >
            <template v-slot:default-header="prop">
              <!-- <Container @drop="onDrop"> -->
              <!-- <Draggable> -->
              <mt-member-node :member="members[prop.node.id]" readOnly />
              <!-- </Draggable> -->
              <!-- </Container> -->
            </template>
          </q-tree>
        </div>
        <!-- </Container> -->
      </q-expansion-item>
    </div>
    <mt-summary-drawer
      :roles="roles"
      :roleStats="roleStats"
      :mods="mods"
      :modStats="modStats"
      :totalStats="totalStats"
      :complexStats="complexStats"
    />
  </div>
</template>

<script>
import { getAnalytics, setCurrentScreen } from "firebase/analytics";
import { mapGetters, mapActions, mapState } from "vuex";
import { defineAsyncComponent } from "vue";
import { LocalStorage, Dark } from "quasar";
export default {
  props: {
    // user: {}
  },
  data() {
    return {
      filter: "",
    };
  },
  created: function () {
    this.Dark = Dark;
    this.dateStamp = LocalStorage.has("dateStamp")
      ? LocalStorage.getItem("dateStamp")
      : true;
    setCurrentScreen(getAnalytics(), "Movement_Printable");
    Dark.set(false);
    this.showDrawer("movementDetails");
  },
  beforeDestroy() {
    Dark.set(true);
  },
  updated: function () {
    setTimeout(() => {
      window.print();
    }, 2000);
  },
  methods: {
    ...mapActions(["changeSize", "showDrawer"]),
    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true;

      this.fabPos = [this.fabPos[0] - ev.delta.x, this.fabPos[1] + ev.delta.y];
    },
    toggleViewOptions() {
      this.viewOptions = !this.viewOptions;
    },
    toggleHideNoParents() {
      this.hideNoParents = !this.hideNoParents;
      LocalStorage.set("noParents", this.hideNoParents);
    },
    toggleDateStamp() {
      this.dateStamp = !this.dateStamp;
      LocalStorage.set("dateStamp", this.dateStamp);
    },
    treeFilterMethod(node, terms) {
      const lowerTerms = terms ? terms.toLowerCase() : "";
      const name = node.name.toLowerCase().indexOf(lowerTerms) !== -1;
      const base = node.role.label.toLowerCase().indexOf(lowerTerms) !== -1;
      const override = node.mods.some(
        (style) => style.label.toLowerCase().indexOf(lowerTerms) !== -1
      );
      return name || base || override;
    },

    resetFilter() {
      this.filter = "";
      this.$refs.filter.focus();
    },
  },
  computed: {
    ...mapGetters(["size"]),
    ...mapGetters("movement", [
      "lastUpdated",
      "backgroundColor",
      "color",
      "roleStats",
      "modStats",
      "totalStats",
      "roleOpts",
      "modOpts",
      "complexStats",
    ]),
    ...mapState("movement", [
      "movement",
      "roles",
      "mods",
      "parents",
      "members",
      "permissions",
    ]),
  },
  components: {
    "mt-member-node": defineAsyncComponent(() =>
      import("./../components/mt-member-node.vue")
    ),
    "mt-summary-drawer": defineAsyncComponent(() =>
      import("./../components/mt-summary-drawer.vue")
    ),
  },
};
</script>
