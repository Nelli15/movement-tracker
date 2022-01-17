<template>
  <div id="home">
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
        class="toolbox"
      >
        <!-- <q-scroll-area> -->
        <q-list padding>
          <q-item clickable @click="createMovement" data-cy="create-movement">
            <q-item-section avatar>
              <q-icon name="add" />
            </q-item-section>
            <q-item-section>
              Add Movement
              <!-- <q-btn
                flat
                icon="add"
                :loading="createLoading"
                :disable="createLoading"
              >
                <q-tooltip class="bg-accent text-grey-10">
                  Create a Movement
                </q-tooltip>
              </q-btn>-->
            </q-item-section>
            <q-tooltip
              class="bg-accent text-grey-10"
              anchor="center right"
              self="center left"
              >Add Movement</q-tooltip
            >
          </q-item>
          <q-item
            clickable
            @click="showHidden = !showHidden"
            data-cy="toggle-hidden-movements"
          >
            <q-item-section avatar>
              <q-icon :name="showHidden ? 'visibility' : 'visibility_off'" />
            </q-item-section>
            <q-item-section>
              Show/Hide Hidden Movements
              <!-- <q-btn
                flat
                icon="add"
                :loading="createLoading"
                :disable="createLoading"
              >
                <q-tooltip class="bg-accent text-grey-10">
                  Create a Movement
                </q-tooltip>
              </q-btn>-->
            </q-item-section>
            <q-tooltip
              class="bg-accent text-grey-10"
              anchor="center right"
              self="center left"
              >Show/Hide Hidden Movements</q-tooltip
            >
          </q-item>
        </q-list>
      </q-drawer>
      <q-page padding style="padding-left: 66px">
        <q-table
          :grid="grid"
          :hide-header="grid"
          title="My Movements"
          :rows="movementsArray"
          :columns="columns"
          row-key="name"
          :filter="movementsFilter"
          v-model:pagination="pagination"
          flat
          class="my-sticky-header-table"
          :style="isFullscreen ? 'height:100vh;' : ''"
          virtual-scroll
          v-model:fullscreen="isFullscreen"
          rows-per-page-label="Movements per page:"
          hide-bottom
          data-cy="movements-table"
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="movementsFilter"
              label="Search"
              class="search"
              :color="q.dark.isActive ? 'white' : ''"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn
              flat
              dense
              :icon="grid ? 'view_list' : 'view_module'"
              @click="
                grid = !grid;
                q.localStorage.set('homeMode', grid);
              "
              aria-label="Grid or Row Mode"
            />
          </template>
          <template v-slot:item="props">
            <mt-movement-card
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3"
              :movementProp="props.row"
            />
          </template>

          <template v-slot:body="props">
            <mt-movement-row :props="props" :movementProp="props.row" />
          </template>
        </q-table>
      </q-page>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, computed, ref } from "vue";
import { create } from "../scripts/movement.js";
import { useQuasar } from "quasar";
import { useStore } from "vuex";

export default {
  setup() {
    const q = useQuasar();
    const store = useStore();
    const toolCabinet = ref(true);
    const columns = ref([
      {
        name: "name",
        align: "left",
        label: "Name",
        field: "name",
        sortable: true,
      },
      {
        name: "role",
        align: "left",
        label: "Permission",
        field: "role",
        sortable: true,
      },
      {
        name: "last_modified",
        label: "Last Modified",
        field: "last_modified",
        sortable: true,
      },
    ]);

    const showHidden = ref(false);
    const isFullscreen = ref(false);
    const pagination = computed({
      get() {
        return q.localStorage.has("homePagination")
          ? q.localStorage.getItem("homePagination")
          : {
              sortBy: "name",
              descending: false,
              page: 1,
              rowsPerPage: 0,
              // rowsNumber: xx if getting data from a server
            };
      },
      set(value) {
        q.localStorage.set("homePagination", value);
      },
    });
    const grid = ref(
      q.localStorage.has("homeMode") ? q.localStorage.getItem("homeMode") : true
    );
    const movementsFilter = ref("");
    const movements = computed(() => store.state.movements.movements);

    function createMovement() {
      // console.log("createMovement");
      store.commit("movements/addMovement", {
        id: "tempMovement",
        name: "Untitled Movement",
        style: { backgroundColor: "#ffffff" },
        last_modified: new Date(),
      });
      create()
        .then((res) => {
          store.commit("movements/removeMovement", "tempMovement");
          if (res) {
            q.notify({
              color: "positive",
              textColor: "white",
              icon: "cloud_download",
              message: "Movement Created",
            });
            return true;
          } else {
            q.notify({
              color: "negative",
              textColor: "white",
              icon: "error",
              message: "Oops, Something went wrong!",
            });
            return false;
          }
        })
        .catch((err) => {
          console.error(err);
          store.commit("movements/removeMovement", "tempMovement");
          q.notify({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!",
          });
          return false;
        });
    }
    const movementsArray = computed(() => {
      if (!movements.value) return [];
      var tempArray = Object.keys(movements.value).map(
        (i) => movements.value[i]
      );
      if (!showHidden.value) {
        tempArray = tempArray.filter((val) => {
          return !val.hide;
        });
      }
      return tempArray;
    });

    return {
      q,
      pagination,
      grid,
      isFullscreen,
      movements,
      movementsArray,
      movementsFilter,
      columns,
      showHidden,
      createMovement,
      toolCabinet,
    };
  },
  components: {
    "mt-movement-card": defineAsyncComponent(() =>
      import("../components/mt-movement-card.vue")
    ),
    "mt-movement-row": defineAsyncComponent(() =>
      import("../components/mt-movement-row.vue")
    ),
  },
};
</script>

<style lang="sass" scoped>
.my-sticky-header-table
  /* height or max-height is important */
  // height: calc(100vh - 86px)

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
