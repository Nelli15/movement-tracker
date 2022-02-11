<template>
  <div>
    <mt-batch
      :membersSelected="membersSelectedFiltered"
      v-if="membersSelected.length > 0 || readOnly"
      @clearMembers="membersSelected = []"
    />
    <q-table
      :rows="rows"
      :columns="columns"
      :rows-per-page-options="[10, 15, 20, 50, 100, 200, 500, 1000]"
      row-key="name"
      v-model:pagination="pagination"
      :style="isFullscreen ? 'height:100vh;' : ''"
      :filter="filterQuery"
      :filterMethod="membersFilterMethod"
      :selection="permissions.members_edit ? 'multiple' : 'none'"
      @update:selected="membersSelected"
      class="my-sticky-header-table"
      v-model:fullscreen="isFullscreen"
      rows-per-page-label="Members per page:"
      :loading="loading"
      @request="onRequest"
    >
      <template v-slot:body="props">
        <q-tr
          :props="props"
          v-if="props.row.display"
          @contextmenu.stop
          data-cy="member"
        >
          <q-tooltip
            v-if="props.row.notes > ''"
            max-width="200px"
            class="bg-blue-grey-2 text-black"
            >{{ props.row.notes }}</q-tooltip
          >
          <!-- Left Click Menu -->
          <q-menu touch-position>
            <mt-member-view-menu :localMember="props.row" />
          </q-menu>
          <!-- Right Click Menu -->
          <mt-member-context-menu
            :member="props.row"
            @selected="props.selected = !props.selected"
            :readOnly="readOnly"
          />
          <td key="selected" :props="props" v-if="permissions.members_edit">
            <q-checkbox v-model="props.selected" />
          </td>
          <q-td
            key="preview"
            :props="props"
            class="q-gutter-sm"
            data-cy="preview"
          >
            <q-btn
              dense
              round
              flat
              :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'"
              @click.stop="props.expand = !props.expand"
            />
            <q-btn
              :class="{ 'text-underline': props.row.display.underline }"
              :style="
                'background-color:' +
                props.row.display.background +
                '; color:' +
                props.row.display.color +
                '; ' +
                'font-size:' +
                size +
                '%;border-color:' +
                props.row.display.outline +
                ' !important;'
              "
              style="border-width: 3px; border-style: solid; z-index: 10"
              :rounded="props.row.display.round"
              :key="props.row.name"
              icon="person"
              :label="
                props.row.display ? props.row.display.label : props.row.name
              "
              no-caps
            />
          </q-td>
          <q-td
            key="name"
            :props="props"
            class="text-weight-bold"
            data-cy="name"
            >{{ props.row.name }}</q-td
          >
          <q-td key="role" :props="props" data-cy="role">{{
            props.row.role.label
              ? props.row.role.label
              : roles[props.row.role]
              ? roles[props.row.role].label
              : '--Missing Role--'
          }}</q-td>
          <q-td key="mods" :props="props" class="q-gutter-sm" data-cy="mods">
            <div class="text-left q-gutter-xs">
              <q-badge
                color="blue"
                v-for="overrideStyle in props.row.mods"
                :key="mods[overrideStyle].label"
                >{{ mods[overrideStyle].label }}</q-badge
              >
            </div>
          </q-td>
          <q-td
            key="actions"
            :props="props"
            class="q-gutter-sm"
            v-if="permissions.members_edit"
            data-cy="actions"
          >
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { defineAsyncComponent, ref, onMounted, computed, watch } from 'vue';
const memberJS = require('./../scripts/member.js');
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
// const promiseDebounce = require('./../scripts/promiseDebounce.js')

export default {
  props: ['readOnly', 'members', 'mods', 'roles'],
  setup(props) {
    const q = useQuasar();
    const store = useStore();
    const route = useRoute();
    const columns = ref([]);
    const rows = ref([]);
    const filter = ref('');
    const loading = ref(false);
    const membersSelected = ref([]);
    const isFullscreen = ref(false);
    const size = computed(() => store.state.general.size);
    const movement = computed(() => store.state.movement.movement);
    const filterQuery = computed(() => store.state.movement.filterQuery);
    const permissions = computed(() => store.state.movement.permissions);
    columns.value = permissions.members_edit
      ? [
          {
            name: 'preview',
            align: 'left',
            label: 'Preview',
            field: 'preview',
          },
          {
            name: 'name',
            align: 'left',
            label: 'Name',
            field: 'name',
            sortable: true,
          },
          {
            name: 'role',
            align: 'center',
            label: 'Role',
            field: 'role',
            sortable: true,
          },
          {
            name: 'mods',
            align: 'center',
            label: 'Modifiers',
            field: 'mods',
            sortable: true,
          },
          {
            name: 'actions',
            label: 'Actions',
            field: 'actions',
            align: 'right',
          },
        ]
      : [
          {
            name: 'preview',
            align: 'left',
            label: 'Preview',
            field: 'preview',
          },
          {
            name: 'name',
            align: 'left',
            label: 'Name',
            field: 'name',
            sortable: true,
          },
          {
            name: 'role',
            align: 'center',
            label: 'Role',
            field: 'role',
            sortable: true,
          },
          {
            name: 'mods',
            align: 'center',
            label: 'Modifiers',
            field: 'mods',
            sortable: true,
          },
        ];
    const pagination = ref({
      sortBy: 'name',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      // rowsNumber: xx if getting data from a server
    });

    pagination.value = q.localStorage.has('memberListPagination')
      ? q.localStorage.getItem('memberListPagination')
      : {
          sortBy: 'name',
          descending: false,
          page: 1,
          rowsPerPage: 10,
          // rowsNumber: xx if getting data from a server
        };
    watch(pagination, (newVal, oldVal) => {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        console.log(pagination.value);
        q.localStorage.set('memberListPagination', pagination.value);
      }
    });
    function setFilterQuery(val) {
      store.commit('movement/setFilterQuery', val);
    }

    function membersFilterMethod(rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : '';
      return rows.filter((row) => {
        if (row.id === 'root') return false;
        else if (row.name.toLowerCase().indexOf(lowerTerms) !== -1) {
          return true;
        } else if (
          props.roles[row.role]
            ? props.roles[row.role].label.toLowerCase().indexOf(lowerTerms) !==
              -1
            : false
        ) {
          return true;
        } else if (
          row.mods.some((style) =>
            props.mods[style]
              ? props.mods[style].label.toLowerCase().indexOf(lowerTerms) !== -1
              : false
          )
        ) {
          return true;
        }
        return false;
      });
    }
    watch(membersSelected, () => {
      membersSelectedFiltered.value = Array.from(
        membersSelected.value,
        (x) => x.id
      );
    });

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    function fetchFromServer(startRow, count, filter, sortBy, descending) {
      const data = filter
        ? Object.values(props.members).filter((row) =>
            row.name.includes(filter)
          )
        : Object.values(props.members).slice();
      // handle sortBy
      if (sortBy) {
        const sortFn =
          sortBy === 'name'
            ? descending
              ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
              : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            : descending
            ? (a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy])
            : (a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
        data.sort(sortFn);
      }
      return data.slice(startRow, startRow + count);
    }

    // emulate 'SELECT count(*) FROM ...WHERE...'
    function getRowsNumberCount(filter) {
      if (!filter) {
        return Object.values(props.members).length;
      }
      let count = 0;
      Object.values(props.members).forEach((treat) => {
        if (treat.name.includes(filter)) {
          ++count;
        }
      });
      return count;
    }

    function onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;

      loading.value = true;

      // update rowsCount with appropriate value
      pagination.rowsNumber = getRowsNumberCount(filter);

      // get all rows if "All" (0) is selected
      const fetchCount =
        rowsPerPage === 0 ? pagination.rowsNumber : rowsPerPage;

      // calculate starting row of data
      const startRow = (page - 1) * rowsPerPage;

      // fetch data from "server"
      const returnedData = fetchFromServer(
        startRow,
        fetchCount,
        filter.value,
        sortBy,
        descending
      );

      // clear out existing data and add new
      rows.value.splice(0, rows.value.length, ...returnedData);

      // don't forget to update local pagination object
      pagination.page = page;
      pagination.rowsPerPage = rowsPerPage;
      pagination.sortBy = sortBy;
      pagination.descending = descending;

      // ...and turn of loading indicator
      loading.value = false;
    }

    onMounted(() => {
      if (route.params.snapId) {
        store.dispatch('snapshot/fetchMembers', {
          movId: route.params.movId,
          snapId: route.params.snapId,
        });
      } else {
        store.dispatch('movement/fetchMembers', {
          movId: route.params.movId,
        });
      }
    });

    watch(props.members, () => {
      // get initial data from server (1st page)
      onRequest({
        pagination: pagination.value,
        filter: filter.value,
      });
    });

    return {
      permissions,
      filterQuery,
      filter,
      columns,
      rows,
      pagination,
      movement,
      size,
      membersFilterMethod,
      membersSelected,
      setFilterQuery,
      loading,
      isFullscreen,
      onRequest,
    };
  },
  components: {
    // 'mt-member-node':defineAsyncComponent(() => import('./../components/mt-member-node.vue'),
    'mt-member-view-menu': defineAsyncComponent(() =>
      import('./../components/actions/mt-member-view-menu.vue')
    ),
    'mt-member-context-menu': defineAsyncComponent(() =>
      import('./../components/actions/mt-member-context-menu.vue')
    ),
    'mt-batch': defineAsyncComponent(() =>
      import('./../components/mt-batch.vue')
    ),
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
  height: calc(100vh -100px)

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
