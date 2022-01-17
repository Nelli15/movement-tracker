<template>
  <div>
    <div style="min-height: 90vh">
      <div class="text-center text-h3 w-100">
        {{ movement ? movement.name : "" }}
      </div>
      <div class="text-center text-h5 w-100">{{ snapshot.title }}</div>
      <!-- <Container @drop="e => onDrop('root', e)" group-name="members" style="width:100%"> -->
      <div class="row">
        <!-- {{tree}} -->
        <!-- {{members}} -->
        <q-tree
          v-for="member in snapshot.tree"
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
            <mt-member-node
              v-if="snapshot.members"
              :member="snapshot.members[prop.node.id]"
              readOnly
            />
            <mt-member-node v-else :member="prop.node" readOnly />
            <!-- </Container> -->
          </template>
        </q-tree>
      </div>
      <!-- </Container> -->
      <q-separator />
      <!-- {{snapshot}} -->
      <q-expansion-item label="Members with No Parent" default-opened>
        <!-- <Container @drop="e => onDrop('No Parent', e)" group-name="members" style="width:100%"> -->
        <div class="row">
          <q-tree
            v-for="member in snapshot.noParents"
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
              <mt-member-node
                v-if="snapshot.members"
                :member="snapshot.members[prop.node.id]"
                readOnly
              />
              <mt-member-node v-else :member="prop.node" readOnly />
              <!-- </Draggable> -->
              <!-- </Container> -->
            </template>
          </q-tree>
        </div>
        <!-- </Container> -->
      </q-expansion-item>
    </div>
    <mt-summary-drawer
      :roles="snapshot.roleStats"
      :roleStats="snapshot.roleStats"
      :mods="snapshot.modStats"
      :modStats="snapshot.modStats"
      :totalStats="snapshot.totalStats"
      :complexStats="snapshot.complexStats"
    />
  </div>
</template>

<script>
// import { $firestore, getAnalytics() } from "./../data/firebase.js";
import { mapGetters, mapActions, mapState } from "vuex";
// import { LocalStorage } from 'quasar'
// import { mapActions } from 'vuex'
import { defineAsyncComponent } from "vue";
export default {
  props: {
    // user: {}
  },
  data() {
    return {
      // movId: '',
      hideNoParents: false,
      // tab: 'roleStats',
      // showRefresh: true,
      // edit: false,
      // parentOptionsFiltered: [],
      // addLoading: false,
      // newMember: {
      //   name: '',
      //   role: '',
      //   modStats: [],
      //   parent: 'root'
      // },
      dateStamp: Boolean,
      // toolCabinet: true,
      // comments: [],
      // membersSelected: [],
      filter: "",
      fabPos: [18, 18],
      draggingFab: false,
      // loading: false,
      showFilter: false,
      // snapshot: {}
    };
  },
  preFetch({ store, currentRoute }) {
    if (!store.state.movement.snapshots[currentRoute.params.snapId]) {
      store.dispatch("movement/fetchSnapshot", {
        movId: currentRoute.params.movId,
        snapId: currentRoute.params.snapId,
      });
    }
  },
  created: function () {
    this.dateStamp = q.localStorage.has("dateStamp")
      ? q.localStorage.getItem("dateStamp")
      : true;
    this.hideNoParents = q.localStorage.has("noParents")
      ? q.localStorage.getItem("NoParents")
      : false;
    getAnalytics().setCurrentScreen("Movement_Snapshot_Printable");
    q.dark.set(false);
    this.showDrawer("movementDetails");
  },
  updated: function () {
    setTimeout(() => {
      window.print();
    }, 2000);
  },
  methods: {
    ...mapActions([
      "changeSize",
      "showDrawer",
      // 'fetchSnapshots'
      // 'fetchInvites',
      // 'fetchShares'
    ]),
    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true;

      this.fabPos = [this.fabPos[0] - ev.delta.x, this.fabPos[1] + ev.delta.y];
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
    toggleViewOptions() {
      this.viewOptions = !this.viewOptions;
    },
    toggleHideNoParents() {
      this.hideNoParents = !this.hideNoParents;
      q.localStorage.set("noParents", this.hideNoParents);
    },
    toggleDateStamp() {
      this.dateStamp = !this.dateStamp;
      q.localStorage.set("dateStamp", this.dateStamp);
    },
    addToSelected(id) {
      if (this.membersSelected.indexOf(id) === -1) {
        this.membersSelected.push(id);
      }
    },
    treeFilterMethod(node, terms) {
      const lowerTerms = terms ? terms.toLowerCase() : "";
      const name = node.name.toLowerCase().indexOf(lowerTerms) !== -1;
      const base = this.roleStats[node.role]
        ? this.roleStats[node.role].label.toLowerCase().indexOf(lowerTerms) !==
          -1
        : false;
      const override = node.modStats.some((style) =>
        this.modStats[style]
          ? this.modStats[style].label.toLowerCase().indexOf(lowerTerms) !== -1
          : false
      );
      const parent = this.parents[node.parent]
        ? this.parents[node.parent].label.toLowerCase().indexOf(lowerTerms) !==
          -1
        : false;
      return name || base || override || parent;
    },

    resetFilter() {
      this.filter = "";
      this.$refs.filter.focus();
    },
    formatDate(timeStamp) {
      if (timeStamp) {
        const date = timeStamp.toDate();
        return `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()} ${date.getHours()}:${(
          "00" + date.getMinutes()
        ).slice(-2)}`;
      } else {
        return "";
      }
    },
  },
  computed: {
    ...mapGetters(["size"]),
    ...mapState("movement", ["movement", "snapshots"]),
    roleOpts() {
      var tempArray = Object.keys(this.snapshot.roleStats)
        .map((i) => this.snapshot.roleStats[i])
        .sort((a, b) => {
          return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
        });
      return tempArray;
    },
    modOpts() {
      var tempArray = Object.keys(this.snapshot.modStats)
        .map((i) => this.snapshot.modStats[i])
        .sort((a, b) => {
          return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
        });
      return tempArray;
    },
    snapshot() {
      // console.log('getting snap', this.snapshots)
      return this.snapshots[this.$route.params.snapId]
        ? this.snapshots[this.$route.params.snapId]
        : {};
    },
  },
  watch: {
    // movement () {
    //   if (this.movement) {
    //     if (this.$route.params.movId === this.$route.params.movId && Object.keys(this.snapshots).length <= 0) {
    //       // console.log(`/movements/${this.$route.params.movId}/snapshots`)
    //       this.fetchSnapshots(this.$route.params.movId)
    //     }
    //   }
    // }
  },
  components: {
    "mt-member-node": defineAsyncComponent(() =>
      import("../components/mt-member-node.vue")
    ),
    // 'mt-add-member-menu':defineAsyncComponent(() => import('./../components/mt-add-member-menu.vue'),
    "mt-summary-drawer": defineAsyncComponent(() =>
      import("../components/mt-summary-drawer.vue")
    ),
  },
};
</script>
