<template>
  <div>
    <q-page>
      <q-drawer
        show-if-above
        mini
        overlay
        :width="200"
        :breakpoint="1"
        bordered
        style="background-color: #c54210; color: white"
      >
        <q-scroll-area style="height: calc(100vh - 60px)">
          <q-list padding>
            <!-- <q-item clickable v-ripple @click="openCompareDialog">
              <q-item-section avatar>
                <q-icon name="compare_arrows" />
              </q-item-section>

              <q-item-section>Compare Snapshots</q-item-section>
              <q-tooltip
                class="bg-accent text-grey-10"
                anchor="center right"
                self="center left"
                >Compare Snapshots</q-tooltip
              >
              <mt-snap-compare ref="compare" />
              <BetaBadge />
            </q-item> -->
          </q-list>
        </q-scroll-area>
      </q-drawer>
      <q-table
        title="Snapshots"
        :rows="snapshotsArray"
        :columns="columns"
        row-key="name"
        :filter="snapshotsFilter"
        v-model:pagination="pagination"
        flat
        class="my-sticky-header-table"
        :style="isFullscreen ? 'height:100vh;' : ''"
        virtual-scroll
        v-model:fullscreen="isFullscreen"
        rows-per-page-label="Snapshots per page:"
        style="padding-left: 56px"
        data-cy="snapshots-table"
      >
        <template v-slot:top="props">
          <div
            class="row"
            :style="'background-color:' + backgroundColor + ';color: ' + color"
            style="
              width: calc(100% + 32px);
              margin-left: -16px;
              margin-right: -16px;
              margin-top: -12px;
              margin-bottom: -12px;
              padding-left: 16px;
              padding-right: 16px;
              padding-top: 12px;
              padding-bottom: 12px;
            "
          >
            <div class="col-4 q-table__title">
              {{ movement.name }} - Snapshots
            </div>

            <q-space />

            <q-input
              borderless
              dense
              debounce="300"
              v-model="snapshotsFilter"
              placeholder="Search"
              :input-style="'color:' + color"
              style="max-width: 100px"
            >
              <template v-slot:append>
                <q-icon name="search" :style="'color:' + color" />
              </template>
            </q-input>

            <q-btn
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              class="q-ml-md"
              aria-label="Toggle Fullscreen"
            />
          </div>
        </template>

        <template v-slot:body="props">
          <!-- <mt-movement-row :props="props" :movement="props.row" /> -->
          <q-tr
            :props="props"
            @click.stop="
              $router.push(
                '/movement/' + movement.id + '/snapshot/' + props.row.id
              )
            "
            @contextmenu.stop
            data-cy="snap-link"
          >
            <q-td :props="props" key="title">{{ props.row.title }}</q-td>
            <q-td :props="props" key="desc">{{ props.row.desc }}</q-td>
            <q-td key="date" :props="props">{{
              formatDate(props.row.date)
            }}</q-td>
            <q-td key="createdBy" :props="props">
              <!-- {{props.row.createdBy}} -->
              <q-avatar class size="md">
                <q-img
                  :src="
                    props.row.createdBy.photoURL
                      ? props.row.createdBy.photoURL
                      : 'https://avatars.dicebear.com/api/bottts/' +
                        props.row.createdBy.uid +
                        '.svg'
                  "
                >
                  <template v-slot:error>
                    <q-img
                      :src="
                        'https://avatars.dicebear.com/api/bottts/' +
                        props.row.createdBy.uid +
                        '.svg'
                      "
                    >
                      <template v-slot:error>
                        <div
                          class="absolute-full flex flex-center bg-negative text-white"
                        >
                          Cannot load image
                        </div>
                      </template>
                    </q-img>
                  </template>
                </q-img>
              </q-avatar>
              <span class="q-pl-sm">{{ props.row.createdBy.displayName }}</span>
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn
                icon="delete"
                v-if="permissions.snapshots_delete"
                color="negative"
                dense
                @click.stop="openDeleteDialog(props.row.id)"
              />
              <mt-remove-dialog
                :name="props.row.title"
                type="Snapshot"
                @confirmed="deleteSnapshot(props.row.id)"
                :ref="'snap-delete-diag-' + props.row.id"
              />
            </q-td>
            <q-menu touch-position context-menu @show="hideParentMenu">
              <q-list dense style="min-width: 100px">
                <q-item
                  clickable
                  v-if="permissions.snapshots_update && !Platform.is.mobile"
                >
                  <q-item-section avatar>
                    <q-icon name="edit" />
                  </q-item-section>
                  <q-item-section>Edit</q-item-section>
                  <q-item-section side>
                    <q-icon name="keyboard_arrow_right" />
                  </q-item-section>
                  <q-menu anchor="top right" self="top left">
                    <q-card>
                      <q-list bordered padding separator dense>
                        <q-item>
                          <q-item-section>
                            <q-input
                              v-model="props.row.title"
                              dense
                              autofocus
                              label="Title"
                              stack-label
                              :color="Dark.isActive ? 'blue-2' : ''"
                            />
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section>
                            <q-input
                              v-model="props.row.desc"
                              dense
                              autofocus
                              label="Description"
                              stack-label
                              type="textarea"
                              :color="Dark.isActive ? 'blue-2' : ''"
                            />
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section></q-item-section>
                          <q-item-section side>
                            <q-btn
                              @click="editSnapshot(props.row)"
                              icon="save"
                              dense
                              color="positive"
                              v-close-popup
                            />
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-card>
                  </q-menu>
                </q-item>
                <q-item
                  clickable
                  @click="openDialog('editDialog-' + props.row.id)"
                  v-if="permissions.snapshots_update && Platform.is.mobile"
                >
                  <q-item-section avatar>
                    <q-icon name="edit" />
                  </q-item-section>
                  <q-item-section>Edit</q-item-section>
                  <q-item-section side>
                    <q-icon name="keyboard_arrow_right" />
                  </q-item-section>
                  <q-dialog :ref="'editDialog-' + props.row.id">
                    <q-card>
                      <q-list bordered padding separator dense>
                        <q-item>
                          <q-item-section>
                            <q-input
                              v-model="props.row.title"
                              dense
                              autofocus
                              label="Title"
                              stack-label
                              :color="Dark.isActive ? 'blue-2' : ''"
                            />
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section>
                            <q-input
                              v-model="props.row.desc"
                              dense
                              autofocus
                              label="Description"
                              stack-label
                              :color="Dark.isActive ? 'blue-2' : ''"
                            />
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section>
                            <q-btn
                              @click="editSnapshot(props.row)"
                              icon="save"
                              dense
                              color="positive"
                              v-close-popup
                            />
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-card>
                  </q-dialog>
                </q-item>
              </q-list>
            </q-menu>
          </q-tr>
        </template>
      </q-table>
      <q-menu
        touch-position
        context-menu
        ref="parentMenu"
        transition-show="fade"
        :persistent="closeDisabled"
      >
        <q-list dense style="min-width: 100px">
          <mt-take-snapshot
            v-show="permissions.snapshots_update"
            menu
            @click="closeDisabled = !closeDisabled"
          />
        </q-list>
      </q-menu>
    </q-page>
  </div>
</template>

<script>
import {
  getFirestore,
  query,
  doc,
  collection,
  updateDoc,
  deleteDoc,
  getDoc,
} from '@firebase/firestore';
// import { debounce } from 'quasar'
import { getAnalytics, setCurrentScreen } from 'firebase/analytics';
import { mapGetters, mapActions, mapState } from 'vuex';
// import { $firestore, getAnalytics() } from "./../data/firebase.js";
import { defineAsyncComponent, computed, ref } from 'vue';
// var movementJS = require('./../scripts/movement.js')
import { LocalStorage } from 'quasar';

export default {
  props: {},
  data() {
    return {
      // createMovementLoading: false
      // createLoading: false,
      toolCabinet: true,
      columns: [
        {
          name: 'title',
          align: 'left',
          label: 'Title',
          field: 'title',
          sortable: true,
        },
        {
          name: 'desc',
          align: 'center',
          label: 'Description',
          field: 'desc',
          sortable: true,
        },
        {
          name: 'date',
          label: 'Date',
          field: 'date',
          sortable: true,
          align: 'center',
        },
        {
          name: 'createdBy',
          label: 'Created By',
          field: 'createdBy.displayName',
          sortable: true,
          align: 'center',
        },
        { name: 'actions', label: 'Actions', field: 'actions', align: 'right' },
      ],
      snapshotsFilter: '',
      isFullscreen: false,
    };
  },
  setup() {
    const closeDisabled = ref();
    const pagination = computed({
      get() {
        return LocalStorage.has('snapshotPagination')
          ? LocalStorage.getItem('snapshotPagination')
          : {
              sortBy: 'name',
              descending: false,
              page: 1,
              rowsPerPage: 10,
              // rowsNumber: xx if getting data from a server
            };
      },
      set(value) {
        LocalStorage.set('snapshotPagination', value);
      },
    });
    return { pagination, closeDisabled };
  },
  preFetch({ store, currentRoute }) {
    if (Object.keys(store.state.movement.snapshots).length <= 0) {
      store.dispatch('movement/fetchSnapshots', {
        id: currentRoute.params.movId,
      });
    }
  },
  created() {
    setCurrentScreen(getAnalytics(), 'Movement_Snapshots');
  },
  methods: {
    openCompareDialog() {
      this.$refs.compare.toggle();
    },
    hideParentMenu() {
      this.$refs.parentMenu.hide();
    },
    formatDate(timeStamp) {
      const date = timeStamp.toDate();
      return `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} ${date.getHours()}:${(
        '00' + date.getMinutes()
      ).slice(-2)}`;
    },
    openDeleteDialog(id) {
      this.$refs[`snap-delete-diag-${id}`].show();
    },
    deleteSnapshot(id) {
      // console.log('deleting')
      this.$refs[`snap-delete-diag-${id}`].showLoading();
      deleteDoc(
        doc(
          getFirestore(),
          `/movements/${this.$route.params.movId}/snapshots/${id}`
        )
      )
        .then((res) => {
          this.$refs[`snap-delete-diag-${id}`].hideLoading();
          this.$refs[`snap-delete-diag-${id}`].hide();
          this.$delete(this.snapshots, id);
          return true;
        })
        .catch((err) => {
          if (process.env.DEV)
            logEvent(getAnalytics(), 'exception', {
              description: err,
              fatal: false,
            });
          console.error(new Error('Oops, something went wrong: ' + err));
          this.$refs[`snap-delete-diag-${id}`].hideLoading();
          this.$refs[`snap-delete-diag-${id}`].hide();
        });
    },
    editSnapshot(prop) {
      // console.log(prop);
      updateDoc(
        doc(
          getFirestore(),
          `/movements/${this.$route.params.movId}/snapshots/${prop.id}`
        ),
        { title: prop.title, desc: prop.desc }
      )
        .then((res) => {
          // this.$refs[`snap-delete-diag-${id}`].hideLoading()
          // this.$refs[`snap-delete-diag-${id}`].hide()
          // this.$delete(this.snapshots, id)
          return true;
        })
        .catch((err) => {
          if (process.env.DEV)
            logEvent(getAnalytics(), 'exception', {
              description: err,
              fatal: false,
            });
          console.error(new Error('Oops, something went wrong: ' + err));
          // this.$refs[`snap-delete-diag-${id}`].hideLoading()
          // this.$refs[`snap-delete-diag-${id}`].hide()
        });
    },
    ...mapActions('movement', ['fetchSnapshots']),
  },
  computed: {
    ...mapGetters('movement', ['backgroundColor', 'color']),
    ...mapState('movement', ['movement', 'permissions', 'snapshots']),
    snapshotsArray() {
      var tempArray = Object.keys(this.snapshots).map((i) => this.snapshots[i]);
      return tempArray;
    },
  },
  components: {
    'mt-remove-dialog': defineAsyncComponent(() =>
      import('./../components/actions/mt-remove-dialog.vue')
    ),
    'mt-take-snapshot': defineAsyncComponent(() =>
      import('./../components/actions/mt-take-snapshot.vue')
    ),
    'mt-snap-compare': defineAsyncComponent(() =>
      import('./../components/actions/mt-snap-compare.vue')
    ),
    BetaBadge: defineAsyncComponent(() =>
      import('./../components/BetaBadge.vue')
    ),
  },
};
</script>

<style lang="sass" scoped>
.my-sticky-header-table
  /* height or max-height is important */
  height: calc(100vh - 86px)

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
