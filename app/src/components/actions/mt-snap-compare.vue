<template>
  <div>
    <q-dialog v-model="visible">
      <q-card style="min-width: 80vw; min-height: 80vh">
        <q-card-section
          class="row items-center q-px-lg q-py-md text-white bg-primary"
        >
          <q-expansion-item
            expand-separator
            default-opened
            dense-toggle
            expand-icon="info"
            expanded-icon="info"
            label="Member Movements"
            header-class="text-h4"
          >
            <q-card class="text-white bg-primary">
              <q-card-section caption>
                Select two Snapshots to see which members have joined, stayed
                around or left.<br />
                See who has changed in a Statistic by selecting a filter.
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-space />
          <div class="verticle-top">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>

        <q-card-section
          class="row q-px-xl q-px-none q-gutter-sm text-white bg-deep-orange-9"
        >
          <q-select
            outlined
            v-model="snapA"
            label="Snapshot A"
            :options="snaps"
            label-color="white"
            :color="q.dark.isActive ? 'blue-2' : ''"
            style="min-width: 250px"
          >
            <template v-slot:prepend>
              <q-icon name="collections" />
            </template>
          </q-select>

          <q-select
            outlined
            v-model="snapB"
            label="Snapshot B"
            :options="snaps"
            label-color="white"
            :color="q.dark.isActive ? 'blue-2' : ''"
            style="min-width: 250px"
          >
            <template v-slot:prepend>
              <q-icon name="collections" />
            </template>
          </q-select>
          <q-select
            outlined
            v-model="stat"
            label="Filter by Statistic"
            :options="statOpts"
            label-color="white"
            :color="q.dark.isActive ? 'blue-2' : ''"
            style="min-width: 250px"
          >
            <template v-slot:prepend>
              <q-icon name="filter_alt" />
            </template>
          </q-select>
        </q-card-section>
        <q-scroll-area style="height: 60vh; max-width: 100%" class="q-mb-sm">
          <q-card-section
            class="text-center text-h5"
            v-if="
              membersAdded > [] || membersUnchanged > [] || membersRemoved > []
            "
          >
            Trees
          </q-card-section>
          <q-card-section
            class="row"
            v-if="
              membersAdded > [] || membersUnchanged > [] || membersRemoved > []
            "
          >
            <q-list bordered class="col-4 q-px-sm">
              <q-item outlined class="text-center full-width">
                <q-expansion-item
                  expand-separator
                  :label="`Added in ${
                    snapB.label ? snapB.label : 'Untitled Snapshot'
                  }`"
                  :caption="`(${membersAdded.length} Members)`"
                  header-class="text-h6"
                  default-opened
                  class="text-center full-width"
                >
                  <q-list>
                    <q-item
                      v-for="member in membersAdded"
                      :key="member.id + 'member'"
                    >
                      <mt-member-node
                        :member="member"
                        @contextmenu.stop
                        readOnly
                        class="q-mx-auto"
                      />
                    </q-item>
                  </q-list>
                </q-expansion-item>
              </q-item>
            </q-list>
            <q-list bordered class="col-4 q-px-sm">
              <q-item outlined class="text-center full-width">
                <q-expansion-item
                  expand-separator
                  :label="`Unchanged from ${
                    snapA.label ? snapA.label : 'Untitled Snapshot'
                  } to ${snapB.label ? snapB.label : 'Untitled Snapshot'}`"
                  :caption="`(${membersUnchanged.length} Members)`"
                  header-class="text-h6"
                  default-opened
                  class="text-center full-width"
                >
                  <q-list>
                    <q-item
                      v-for="member in membersUnchanged"
                      :key="member.id + 'member'"
                    >
                      <mt-member-node
                        :member="member"
                        @contextmenu.stop
                        readOnly
                        class="q-mx-auto"
                      />
                    </q-item>
                  </q-list>
                </q-expansion-item>
              </q-item>
            </q-list>
            <q-list bordered class="col-4 q-x-sm">
              <q-item outlined class="text-center full-width">
                <q-expansion-item
                  expand-separator
                  :label="`Removed in ${
                    snapB.label ? snapB.label : 'Untitled Snapshot'
                  }`"
                  :caption="`(${membersRemoved.length} Members)`"
                  header-class="text-h6"
                  default-opened
                  class="text-center full-width"
                >
                  <q-list>
                    <q-item
                      v-for="member in membersRemoved"
                      :key="member.id + 'member'"
                    >
                      <mt-member-node
                        :member="member"
                        @contextmenu.stop
                        readOnly
                        class="q-mx-auto"
                      />
                    </q-item>
                  </q-list>
                </q-expansion-item>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section
            v-if="
              membersAdded <= [] &&
              membersUnchanged <= [] &&
              membersRemoved <= []
            "
            style="text-align: center"
            class="q-mt-xl"
          >
            Nothing to display yet, select some snapshots to get started.
          </q-card-section>
        </q-scroll-area>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { defineAsyncComponent } from "vue";
export default {
  name: "mtSnapCompare",
  data() {
    return {
      visible: false,
      stat: { label: "--No Filter--", value: "" },
      snapA: "",
      snapB: { value: "now", label: "Now" },
    };
  },
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    flatten(arr) {
      let flatArr = arr.reduce((acc, cur) => {
        let current = !cur.alt ? { [cur.id]: { ...cur, children: null } } : {};
        let children =
          cur.children.length > 0 ? this.flatten(cur.children) : {};
        return (acc = {
          ...acc,
          ...current,
          ...children,
        });
      }, {});
      return flatArr;
    },
  },
  computed: {
    ...mapGetters("movement", [
      "backgroundColor",
      "color",
      "roleStats",
      "modStats",
      "totalStats",
      "complexStats",
      "calcStats",
    ]),
    ...mapState("movement", [
      "snapshots",
      "movement",
      "permissions",
      "members",
    ]),
    statA() {
      if (!this.snapA) return {};
      // get snap from snapshots
      let snapA = this.localSnaps[this.snapA.value];

      if (this.stat.value === "") {
        return snapA;
      }
      // find the current stat and return
      return snapA.roleStats.filter((x) => this.stat.id === x.id) > []
        ? snapA.roleStats.filter((x) => this.stat.id === x.id)[0]
        : snapA.modStats.filter((x) => this.stat.id === x.id) > []
        ? snapA.modStats.filter((x) => this.stat.id === x.id)[0]
        : snapA.complexStats.filter((x) => this.stat.id === x.id) > []
        ? snapA.complexStats.filter((x) => this.stat.id === x.id)[0]
        : {};
    },
    statB() {
      if (!this.snapB) return {};
      // get snap from snapshots
      let snapB = this.localSnaps[this.snapB.value];
      if (this.stat.value === "") {
        return snapB;
      }
      // find the current stat and return
      return snapB.roleStats.filter((x) => this.stat.id === x.id) > []
        ? snapB.roleStats.filter((x) => this.stat.id === x.id)[0]
        : snapB.modStats.filter((x) => this.stat.id === x.id) > []
        ? snapB.modStats.filter((x) => this.stat.id === x.id)[0]
        : snapB.complexStats.filter((x) => this.stat.id === x.id) > []
        ? snapB.complexStats.filter((x) => this.stat.id === x.id)[0]
        : {};
    },
    membersAdded() {
      let added = [];
      let membersA = this.statA.tree
        ? this.flatten(this.statA.tree)
        : this.statA.members
        ? this.statA.members
        : [];
      let membersB = this.statB.tree
        ? this.flatten(this.statB.tree)
        : this.statB.members
        ? this.statB.members
        : [];

      if (
        this.statB &&
        membersB &&
        membersB.constructor === Object &&
        Object.keys(this.statB.members).length > 0
      ) {
        for (let memberB in membersB) {
          if (memberB === "No Parent" || memberB === "root") continue;
          if (!membersA[memberB]) {
            added.push(this.localSnaps[this.snapB.value].members[memberB]);
          }
        }
      }
      return added;
    },
    membersUnchanged() {
      let unchanged = [];
      let membersA = this.statA.tree
        ? this.flatten(this.statA.tree)
        : this.statA.members
        ? this.statA.members
        : [];
      let membersB = this.statB.tree
        ? this.flatten(this.statB.tree)
        : this.statB.members
        ? this.statB.members
        : [];

      if (
        this.statB &&
        membersB &&
        membersB.constructor === Object &&
        Object.keys(this.statB.members).length > 0
      ) {
        for (let memberB in membersB) {
          if (memberB === "No Parent" || memberB === "root") continue;
          if (membersA[memberB]) {
            unchanged.push(this.localSnaps[this.snapB.value].members[memberB]);
          }
        }
      }
      return unchanged;
    },
    membersRemoved() {
      let removed = [];
      let membersA = this.statA.tree
        ? this.flatten(this.statA.tree)
        : this.statA.members
        ? this.statA.members
        : [];
      let membersB = this.statB.tree
        ? this.flatten(this.statB.tree)
        : this.statB.members
        ? this.statB.members
        : [];
      if (
        this.statA &&
        membersA &&
        membersA.constructor === Object &&
        Object.keys(this.statA.members).length > 0
      ) {
        for (let memberA in membersA) {
          if (memberA === "No Parent" || memberA === "root") continue;
          if (!membersB[memberA]) {
            removed.push(this.localSnaps[this.snapA.value].members[memberA]);
          }
        }
      }
      return removed;
    },
    statOpts() {
      let stats = [{ label: "No Filter", value: "" }];

      if (
        !this.localSnaps[this.snapA.value] ||
        !this.localSnaps[this.snapB.value]
      )
        return stats;
      for (let ii in this.localSnaps[this.snapA.value].roleStats) {
        stats.push(this.localSnaps[this.snapA.value].roleStats[ii]);
      }
      for (let ii in this.localSnaps[this.snapB.value].roleStats) {
        stats.push(this.localSnaps[this.snapB.value].roleStats[ii]);
      }
      for (let ii in this.localSnaps[this.snapA.value].modStats) {
        stats.push(this.localSnaps[this.snapA.value].modStats[ii]);
      }
      for (let ii in this.localSnaps[this.snapB.value].modStats) {
        stats.push(this.localSnaps[this.snapB.value].modStats[ii]);
      }
      for (let ii in this.localSnaps[this.snapA.value].complexStats) {
        stats.push(this.localSnaps[this.snapA.value].complexStats[ii]);
      }
      for (let ii in this.localSnaps[this.snapB.value].complexStats) {
        stats.push(this.localSnaps[this.snapB.value].complexStats[ii]);
      }
      return stats
        .filter((value, index, self) => {
          return (
            self
              .map(function (x) {
                return x.id;
              })
              .indexOf(value.id) === index
          );
        })
        .sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));
    },
    snaps() {
      let snaps = Object.entries(this.localSnaps).map((obj) => {
        return {
          value: obj[1].id,
          label: obj[1].title ? obj[1].title : "Untitled Snapshot",
        };
      });
      return snaps
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        })
        .sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));
    },
    localSnaps() {
      let snapshots = JSON.parse(JSON.stringify(this.snapshots));
      snapshots.now = {
        title: "Now",
        id: "now",
        roleStats: this.roleStats,
        modStats: this.modStats,
        complexStats: this.complexStats,
        totalStats: this.totalStats,
        members: this.members,
        noParents: this.noParents,
        tree: this.tree,
      };
      return snapshots;
    },
  },
  components: {
    "mt-member-node": defineAsyncComponent(() =>
      import("./../mt-member-node.vue")
    ),
  },
};
</script>
