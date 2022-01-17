<template>
  <q-drawer :model-value="show" side="right" :width="300" elevated>
    <q-btn
      round
      color="primary"
      icon="chevron_right"
      fab-mini
      class="absolute"
      style="top: 50%; left: -30px; z-index: 10"
      @click="$emit('close', {})"
      aria-label="Hide Saved Graphs"
    />
    <q-scroll-area style="height: 99%; max-width: 100%">
      <q-list class="q-mt-md" dense>
        <q-item class="text-h5">My Saved Graphs</q-item>
        <q-item
          v-if="Object.keys(savedGraphsFiltered).length <= 0"
          class="text-caption"
          >No saved graphs.</q-item
        >
        <q-item
          :key="'slide: ' + graph.id"
          v-for="graph in savedGraphsFiltered"
          dense
          left-color="positive"
          right-color="negative"
          clickable
          @click="
            $emit('close', {});
            openGraph(graph.id);
          "
          class="shadow-2 q-ma-sm not-round text-bold"
          icon="img:icons/mdi-finance.svg"
          v-ripple
        >
          <q-btn dense :icon="getIcon(graph.type)" no-caps class="full-width">{{
            graph.label ? graph.label : graph.title
          }}</q-btn>
          <q-menu context-menu>
            <q-list style="width: 210px">
              <q-item
                @click="uploadGraph(graph.id)"
                icon="cloud_upload"
                v-close-popup
                clickable
                v-if="permissions.trends_movementGraphs_create"
                ><q-item-section side
                  ><q-icon name="cloud_upload" /></q-item-section
                ><q-item-section>Upload to Movement</q-item-section></q-item
              >
              <q-separator />
              <q-item
                @click="deleteGraph(graph.id)"
                icon="delete"
                v-close-popup
                clickable
                v-if="permissions.trends_movementGraphs_delete"
                ><q-item-section side><q-icon name="delete" /></q-item-section
                ><q-item-section>Delete</q-item-section></q-item
              >
            </q-list>
          </q-menu>
          <!-- </q-item> -->
        </q-item>
        <q-item class="text-h5" v-if="permissions.trends_movementGraphs_view"
          >Movement Saved Graphs</q-item
        >
        <q-item
          v-if="
            Object.keys(movementSavedGraphsFiltered).length <= 0 &&
            permissions.trends_movementGraphs_view
          "
          class="text-caption text-center"
          >No saved movement graphs.</q-item
        >
        <q-item
          :key="'slide: ' + graph.id"
          v-for="graph in movementSavedGraphsFiltered"
          dense
          clickable
          @click="
            $emit('close', {});
            openMovementGraph(graph.id);
          "
          class="shadow-2 q-ma-sm not-round text-bold"
          v-if="permissions.trends_movementGraphs_view"
        >
          <q-btn dense class="full-width" :icon="getIcon(graph.type)" no-caps>{{
            graph.label ? graph.label : graph.title
          }}</q-btn>
          <!-- </q-item> -->
          <q-menu context-menu>
            <q-list style="width: 210px">
              <q-item
                @click="deleteMovementGraph(graph.id)"
                icon="delete"
                v-close-popup
                clickable
                v-if="permissions.trends_movementGraphs_delete"
                ><q-item-section side><q-icon name="delete" /></q-item-section
                ><q-item-section>Download and Remove</q-item-section></q-item
              >
            </q-list>
          </q-menu>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
// import { $firestore, getAnalytics() } from "./../data/firebase.js";
import { collection, getFirestore, onSnapshot } from "@firebase/firestore";
import { mapGetters, mapState } from "vuex";
import {
  saveGraph,
  uploadGraph,
  deleteGraph,
  deleteMovementGraph,
} from "./../scripts/trends.js";

export default {
  // name: 'ComponentName',
  props: {
    show: Boolean,
  },
  data() {
    return {
      savedGraphs: {},
      movementSavedGraphs: {},
    };
  },
  created() {
    if (this.movement) {
      if (this.$route.params.movId === this.$route.params.movId) {
        if (this.user.uid) {
          onSnapshot(
            collection(
              getFirestore(),
              `/movements/${this.$route.params.movId}/users/${this.user.uid}/graphs`
            ),
            (querySnap) => {
              querySnap.forEach((doc) => {
                let d = new Date();
                const temp = doc.data();
                temp.id = doc.id;
                temp.selectedStats = temp.selectedStats
                  ? temp.selectedStats
                  : temp.dataOptions;
                this.$set(this.savedGraphs, doc.id, temp);
              });
            }
          );
        }
        onSnapshot(
          collection(
            getFirestore(),
            `/movements/${this.$route.params.movId}/graphs`
          ),
          (querySnap) => {
            querySnap.forEach((doc) => {
              let d = new Date();
              const temp = doc.data();
              temp.id = doc.id;
              temp.selectedStats = temp.selectedStats
                ? temp.selectedStats
                : temp.dataOptions;
              this.$set(this.movementSavedGraphs, doc.id, temp);
            });
          }
        );
      }
    }
  },
  methods: {
    openGraph(graphId) {
      this.$emit("openGraph", this.savedGraphs[graphId]);
      this.graphDetails = { ...this.savedGraphs[graphId] };
      this.graphDetails.label = "";
    },
    openMovementGraph(graphId) {
      this.$emit("openGraph", this.movementSavedGraphs[graphId]);
      this.graphDetails = { ...this.movementSavedGraphs[graphId] };
      this.graphDetails.label = "";
    },
    saveGraph() {
      saveGraph(this.$route.params.movId, this.user.uid, this.graphDetails)
        .then((res) => {
          return q.notify({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Graph Saved",
          });
        })
        .catch((err) => {
          q.notify({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!",
          });
        });
    },
    uploadGraph(graphId) {
      const graph = this.savedGraphs[graphId];
      uploadGraph(this.$route.params.movId, graph)
        .then(() => {
          return deleteGraph(this.$route.params.movId, this.user.uid, graphId);
        })
        .then((res) => {
          q.notify({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Graph Saved",
          });
          return this.$set(this.savedGraphs, graphId, {});
        })
        .catch((err) => {
          q.notify({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!",
          });
        });
    },
    deleteGraph(graphId) {
      deleteGraph(this.$route.params.movId, this.user.uid, graphId)
        .then((res) => {
          q.notify({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Graph Deleted",
          });
          return this.$set(this.savedGraphs, graphId, {});
        })
        .catch((err) => {
          q.notify({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!",
          });
        });
    },
    deleteMovementGraph(graphId) {
      deleteMovementGraph(this.$route.params.movId, graphId)
        .then(() => {
          const graph = this.movementSavedGraphs[graphId];
          // console.log(this.$route.params.movId, this.user.uid, graph);
          return saveGraph(this.$route.params.movId, this.user.uid, graph);
        })
        .then((res) => {
          q.notify({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Graph Deleted",
          });
          return this.$set(this.movementSavedGraphs, graphId, {});
        })
        .catch((err) => {
          q.notify({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!",
          });
        });
    },
    getIcon(type) {
      if (type === "Line") {
        return "show_chart";
      } else if (type === "Bar") {
        return "bar_chart";
      } else if (type === "Pie") {
        return "pie_chart";
      } else if (type === "Doughnut") {
        return "doughnut_large";
      } else if (type === "Polar") {
        return "doughnut_small";
      } else if (type === "Individual Member") {
        return "person";
      } else {
        return "img:icons/mdi-finance.svg";
      }
    },
  },
  computed: {
    ...mapGetters("auth", ["user"]),
    ...mapState("movement", ["permissions", "movement"]),
    savedGraphsFiltered() {
      return Object.keys(this.savedGraphs)
        .map((i) => this.savedGraphs[i])
        .filter((x) => x.id > "")
        .sort((a, b) => {
          return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
        });
    },
    movementSavedGraphsFiltered() {
      return Object.keys(this.movementSavedGraphs)
        .map((i) => this.movementSavedGraphs[i])
        .filter((x) => x.id > "")
        .sort((a, b) => {
          return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
        });
    },
  },
};
</script>
