<template>
  <div>
    <q-table
      :rows="eventsList"
      :columns="columns"
      :rows-per-page-options="[10, 15, 20, 50, 100, 200, 500, 1000]"
      row-key="id"
      v-model:pagination="pagination"
      :style="isFullscreen ? 'height:100vh;' : ''"
      :filter="filterQuery"
      :filterMethod="filterMethod"
      selection="multiple"
      @update:selected="selected"
      class="my-sticky-header-table"
      v-model:fullscreen="isFullscreen"
      rows-per-page-label="Events per page:"
    >
      <template v-slot:body-cell="props">
        <q-td :props="props">
          <div
            @click="
              $router.push(
                `/movement/${$route.params.movId}/event/${props.row.id}`
              )
            "
            style="cursor: pointer"
          >
            {{ props.value }}
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { LocalStorage } from "quasar";
export default {
  props: {
    // user: {}
  },
  data() {
    return {
      columns: [],
      pagination: {
        sortBy: "name",
        descending: true,
        page: 1,
        rowsPerPage: 10,
      },
      filter: "",
      isFullscreen: false,
      selected: [],
      temp: "",
    };
  },
  created: function () {
    this.columns = [
      {
        name: "name",
        align: "left",
        label: "Event",
        field: "name",
      },
      {
        name: "startDate",
        align: "left",
        label: "Start Date",
        field: "startDate",
        format: (val, row) => {
          return `${val.toLocaleDateString()} ${String(val.getHours()).padStart(
            2,
            "0"
          )}:${String(val.getMinutes()).padStart(2, "0")}`;
        },
        sortable: true,
      },
      {
        name: "endDate",
        align: "center",
        label: "End Date",
        field: "endDate",
        format: (val, row) => {
          return `${val.toLocaleDateString()} ${String(val.getHours()).padStart(
            2,
            "0"
          )}:${String(val.getMinutes()).padStart(2, "0")}`;
        },
        sortable: true,
      },
      {
        name: "location",
        label: "Location",
        field: "location",
        align: "center",
        sortable: true,
      },
      {
        name: "attendees",
        label: "Number of Attendees",
        field: "attendees",
        format: (val, row) => {
          return (val && val.length) || 0;
        },
        align: "center",
        sortable: true,
      },
      {
        name: "custom",
        label: "Custom Fields",
        field: "custom",
        align: "center",
        sortable: true,
      },
      {
        name: "actions",
        label: "Actions",
        field: "actions",
        align: "right",
      },
    ];
    this.pagination = LocalStorage.has("eventsListPagination")
      ? LocalStorage.getItem("eventsListPagination")
      : {
          sortBy: "name",
          descending: true,
          page: 1,
          rowsPerPage: 10,
        };
  },
  methods: {
    // ...mapMutations(["setFilterQuery"]),
    filterMethod(rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : "";
      return rows.filter((row) => {
        if (row.id === "root" || row.id === "No Parent") return false;
        else if (row.name.toLowerCase().indexOf(lowerTerms) !== -1) {
          return true;
        } else if (
          this.roles[row.role]
            ? this.roles[row.role].label.toLowerCase().indexOf(lowerTerms) !==
              -1
            : false
        ) {
          return true;
        } else if (
          row.mods.some((style) =>
            this.mods[style]
              ? this.mods[style].label.toLowerCase().indexOf(lowerTerms) !== -1
              : false
          )
        ) {
          return true;
        } else if (
          this.parents[row.parent] && this.parents[row.parent].label
            ? this.parents[row.parent].label
                .toLowerCase()
                .indexOf(lowerTerms) !== -1
            : this.parents[row.parent] && this.parents[row.parent].name
            ? this.parents[row.parent].name
                .toLowerCase()
                .indexOf(lowerTerms) !== -1
            : false
        ) {
          return true;
        } else if (
          this.parents[row.alt] && this.parents[row.alt].label
            ? this.parents[row.alt].label.toLowerCase().indexOf(lowerTerms) !==
              -1
            : this.parents[row.alt] && this.parents[row.alt].name
            ? this.parents[row.alt].name.toLowerCase().indexOf(lowerTerms) !==
              -1
            : false
        ) {
          return true;
        }
        return false;
      });
    },
  },
  computed: {
    ...mapState("movement", ["movement"]),
    ...mapGetters("events", ["eventsList", "filterQuery"]),
  },
  watch: {
    pagination() {
      LocalStorage.set("eventsListPagination", this.pagination);
    },
    selected() {
      this.selectedFiltered = Array.from(this.selected, (x) => x.id);
    },
  },
};
</script>

<style scoped>
.btn-rounded {
  border-radius: 25px !important;
}

.btn-underline {
  text-decoration: underline !important;
}
</style>

<style lang="sass" scoped>
.my-sticky-header-table
  /* height or max-height is important */
  height: calc(100vh - 50px)

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: white

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
