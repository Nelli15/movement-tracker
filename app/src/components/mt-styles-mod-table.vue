<template>
  <q-table
    :rows="modOpts"
    :columns="columns"
    :rows-per-page-options="[10, 15, 20, 50, 100]"
    row-key="name"
    v-model:pagination="pagination"
    wrap-cells
    class="my-sticky-header-table"
    :style="isFullscreen ? 'height:100vh;' : ''"
    virtual-scroll
    v-model:fullscreen="isFullscreen"
    rows-per-page-label="Modifiers per page:"
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
        data-cy="movement-banner"
      >
        <div class="col-4 q-table__title">{{ movement.name }}</div>

        <q-space />

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
    <template v-slot:header-cell="props">
      <q-th :props="props">
        {{ props.col.label }}
        <q-icon
          name="help_outline"
          size="xs"
          color="grey-7"
          v-if="props.col.help"
        >
          <q-tooltip
            class="bg-accent text-grey-10"
            anchor="center right"
            self="center left"
          >
            {{ props.col.help }}
          </q-tooltip>
        </q-icon>
      </q-th>
    </template>
    <template v-slot:body="props">
      <q-tr v-if="props.row.loading">
        <q-td key="label" :props="props" style="min-width: 200px">
          <q-skeleton type="QBtn" />
        </q-td>
        <q-td
          key="desc"
          :props="props"
          style="min-width: 300px; max-width: 20vw !important"
        >
          <q-skeleton type="text" />
        </q-td>
        <q-td key="target" :props="props" style="min-width: 100px">
          <q-skeleton type="text" />
        </q-td>
        <q-td key="background" :props="props">
          <q-skeleton type="QBtn" height="36px" width="32px" />
        </q-td>
        <q-td key="color" :props="props">
          <q-skeleton type="QBtn" height="36px" width="32px" />
        </q-td>
        <q-td key="outline" :props="props">
          <q-skeleton type="QBtn" height="36px" width="32px" />
        </q-td>
        <q-td key="underline" :props="props">
          <q-skeleton type="QBtn" height="36px" width="32px" />
        </q-td>
        <q-td key="rounded" :props="props">
          <q-skeleton type="QBtn" height="36px" width="32px" />
        </q-td>
      </q-tr>
      <q-tr
        v-else
        :props="props"
        @click.stop
        @contextmenu.stop
        @touchstart.stop
        @mousedown.stop
        data-cy="mod-item"
      >
        <mt-style-menu :current="props.row" type="mod" />
        <q-td
          key="label"
          :props="props"
          style="min-width: 200px"
          data-cy="label"
        >
          <q-btn
            :disable="!permissions.settings_mods_edit"
            :key="props.row.value"
            :class="
              (props.row.style.shape
                ? props.row.style.shapeOverride
                  ? props.row.style.shape
                  : ''
                : props.row.style.roundOverride
                ? props.row.style.round
                  ? 'round'
                  : ''
                : '') +
              (props.row.style.underlineOverride && props.row.style.underline
                ? ' text-underline'
                : '')
            "
            :style="
              'background-color:' +
              (props.row.style.backgroundOverride
                ? props.row.style.background
                : 'white') +
              '; color:' +
              (props.row.style.colorOverride
                ? props.row.style.color
                : 'black') +
              '; ' +
              'border-color:' +
              (props.row.style.outlineOverride
                ? props.row.style.outline
                : 'white') +
              ' !important;'
            "
            style="border-width: 3px; border-style: solid; width: 100%"
            dense
            no-caps
            >{{
              props.row.style.prepend && props.row.icon
                ? '[' + props.row.icon + ']'
                : ''
            }}
            {{ props.row.label }}
            {{
              !props.row.style.prepend && props.row.icon
                ? '[' + props.row.icon + ']'
                : ''
            }}</q-btn
          >
        </q-td>
        <q-td
          key="desc"
          :props="props"
          style="min-width: 300px; max-width: 20vw !important"
          data-cy="desc"
          >{{ props.row.desc }}</q-td
        >
        <q-td
          key="target"
          :props="props"
          style="min-width: 100px"
          data-cy="target"
        >
          {{ props.row.target }}
        </q-td>
        <q-td
          key="background"
          :props="props"
          style="min-width: 110px"
          data-cy="background"
        >
          <q-checkbox
            :disable="!permissions.settings_mods_edit"
            :model-value="
              props.row.style.backgroundOverride
                ? props.row.style.backgroundOverride
                : false
            "
            color="negative"
            @update:model-value="
              updateStyle(props.row.id, 'style.backgroundOverride', $event)
            "
            debounce="500"
          >
            <q-tooltip
              class="bg-accent text-grey-10"
              anchor="center right"
              self="center left"
              >Override the role's background color</q-tooltip
            >
          </q-checkbox>
          <q-btn
            :style="'background-color:' + props.row.style.background + ';'"
            :disable="
              !props.row.style.backgroundOverride ||
              !permissions.settings_mods_edit
            "
            aria-label="Change Background Color"
            data-cy="color-display"
          >
            <q-popup-edit :model-value="props.row.style.background">
              <q-color
                v-model="props.row.style.background"
                dense
                autofocus
                @change="updateStyle(props.row.id, 'style.background', $event)"
                debounce="5000"
              />
            </q-popup-edit>
          </q-btn>
        </q-td>
        <q-td
          key="color"
          :props="props"
          style="min-width: 110px"
          data-cy="color"
        >
          <q-checkbox
            :disable="!permissions.settings_mods_edit"
            :model-value="
              props.row.style.colorOverride
                ? props.row.style.colorOverride
                : false
            "
            color="negative"
            @update:model-value="
              updateStyle(props.row.id, 'style.colorOverride', $event)
            "
            debounce="500"
          >
            <q-tooltip
              class="bg-accent text-grey-10"
              anchor="center right"
              self="center left"
              >Override the role's text color</q-tooltip
            >
          </q-checkbox>
          <q-btn
            :style="'background-color:' + props.row.style.color + ';'"
            aria-label="Change Forground Colour"
            :disable="
              !props.row.style.colorOverride || !permissions.settings_mods_edit
            "
            data-cy="color-display"
          >
            <q-popup-edit :model-value="props.row.style.color">
              <q-color
                :model-value="props.row.style.color"
                dense
                autofocus
                @change="updateStyle(props.row.id, 'style.color', $event)"
                debounce="5000"
              />
            </q-popup-edit>
          </q-btn>
        </q-td>
        <q-td
          key="outline"
          :props="props"
          style="min-width: 110px"
          data-cy="outline"
        >
          <q-checkbox
            :disable="!permissions.settings_mods_edit"
            :model-value="
              props.row.style.outlineOverride
                ? props.row.style.outlineOverride
                : false
            "
            color="negative"
            @update:model-value="
              updateStyle(props.row.id, 'style.outlineOverride', $event)
            "
            debounce="500"
          >
            <q-tooltip
              class="bg-accent text-grey-10"
              anchor="center right"
              self="center left"
              >Override the role's border color</q-tooltip
            >
          </q-checkbox>
          <q-btn
            :style="'background-color:' + props.row.style.outline + ';'"
            aria-label="Change Outline Colour"
            :disable="
              !props.row.style.outlineOverride ||
              !permissions.settings_mods_edit
            "
            data-cy="color-display"
          >
            <q-popup-edit :model-value="props.row.style.outline">
              <q-color
                :model-value="props.row.style.outline"
                dense
                autofocus
                @change="updateStyle(props.row.id, 'style.outline', $event)"
                debounce="5000"
              />
            </q-popup-edit>
          </q-btn>
        </q-td>
        <q-td
          key="underline"
          :props="props"
          style="min-width: 110px"
          data-cy="underline"
        >
          <q-checkbox
            :disable="!permissions.settings_mods_edit"
            :model-value="
              props.row.style.underlineOverride
                ? props.row.style.underlineOverride
                : false
            "
            color="negative"
            dense
            @update:model-value="
              updateStyle(props.row.id, 'style.underlineOverride', $event)
            "
            debounce="500"
          >
            <q-tooltip
              class="bg-accent text-grey-10"
              anchor="center right"
              self="center left"
              >Override the role's underline</q-tooltip
            >
          </q-checkbox>
          <q-btn
            :style="
              'text-decoration: ' +
              (props.row.style.underline ? 'underline' : 'none') +
              ';'
            "
            label="U"
            @click="
              updateStyle(
                props.row.id,
                'style.underline',
                !props.row.style.underline
              )
            "
            :disable="
              !props.row.style.underlineOverride ||
              !permissions.settings_mods_edit
            "
            aria-label="Underline"
            data-cy="underline-display"
          ></q-btn>
        </q-td>
        <q-td
          key="rounded"
          :props="props"
          style="min-width: 140px"
          data-cy="shape"
        >
          <q-checkbox
            :disable="!permissions.settings_mods_edit"
            :model-value="
              props.row.style.roundOverride &&
              props.row.style.shapeOverride === 'undefined'
                ? props.row.style.roundOverride
                : false || props.row.style.shapeOverride
                ? props.row.style.shapeOverride
                : false
            "
            color="negative"
            dense
            @update:model-value="
              updateStyle(
                props.row.id,
                'style.shapeOverride',
                !props.row.style.shapeOverride
              )
            "
            debounce="500"
          >
            <q-tooltip
              class="bg-accent text-grey-10"
              anchor="center right"
              self="center left"
              >Override the role's shape</q-tooltip
            >
          </q-checkbox>
          <q-btn-dropdown
            dense
            :disable="
              (props.row.style.shapeOverride === 'undefined' &&
                !props.row.style.roundOverride) ||
              (props.row.style.shapeOverride !== 'undefined' &&
                !props.row.style.shapeOverride) ||
              !permissions.settings_mods_edit
            "
          >
            <template v-slot:label>
              <div
                data-cy="selected-shape"
                :class="
                  props.row.style.shape +
                  (Dark.isActive ? ' shape-dark' : ' shape-light')
                "
                v-if="props.row.style.shape"
              />
              <div
                :class="
                  props.row.style.round
                    ? 'round'
                    : 'not-round' +
                      (Dark.isActive ? ' shape-dark' : ' shape-light')
                "
                v-if="!props.row.style.shape"
              />
            </template>
            <q-list dense>
              <q-item
                clickable
                @click="updateStyle(props.row.id, 'style.shape', 'not-round')"
                v-close-popup
              >
                <q-item-section>
                  <div
                    class="not-round"
                    :class="Dark.isActive ? ' shape-dark' : ' shape-light'"
                  />
                </q-item-section>
              </q-item>
              <q-item
                clickable
                @click="updateStyle(props.row.id, 'style.shape', 'round')"
                v-close-popup
              >
                <q-item-section>
                  <div
                    class="round"
                    :class="Dark.isActive ? ' shape-dark' : ' shape-light'"
                  />
                </q-item-section>
              </q-item>
              <q-item
                clickable
                @click="updateStyle(props.row.id, 'style.shape', 'round-right')"
                v-close-popup
              >
                <q-item-section>
                  <div
                    class="round-right"
                    :class="Dark.isActive ? ' shape-dark' : ' shape-light'"
                  />
                </q-item-section>
              </q-item>
              <q-item
                clickable
                @click="updateStyle(props.row.id, 'style.shape', 'round-left')"
                v-close-popup
              >
                <q-item-section>
                  <div
                    class="round-left"
                    :class="Dark.isActive ? ' shape-dark' : ' shape-light'"
                  />
                </q-item-section>
              </q-item>
              <q-item
                clickable
                @click="updateStyle(props.row.id, 'style.shape', 'round-top')"
                v-close-popup
              >
                <q-item-section>
                  <div
                    class="round-top"
                    :class="Dark.isActive ? ' shape-dark' : ' shape-light'"
                  />
                </q-item-section>
              </q-item>
              <q-item
                clickable
                @click="
                  updateStyle(props.row.id, 'style.shape', 'round-bottom')
                "
                v-close-popup
              >
                <q-item-section>
                  <div
                    class="round-bottom"
                    :class="Dark.isActive ? ' shape-dark' : ' shape-light'"
                  />
                </q-item-section>
              </q-item>
              <q-item
                clickable
                @click="updateStyle(props.row.id, 'style.shape', 'round-diag')"
                v-close-popup
              >
                <q-item-section>
                  <div
                    class="round-diag"
                    :class="Dark.isActive ? ' shape-dark' : ' shape-light'"
                  />
                </q-item-section>
              </q-item>
              <q-item
                clickable
                @click="
                  updateStyle(props.row.id, 'style.shape', 'round-diag-2')
                "
                v-close-popup
              >
                <q-item-section>
                  <div
                    style
                    class="round-diag-2"
                    :class="Dark.isActive ? ' shape-dark' : ' shape-light'"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
        <q-td key="icon" :props="props" style="min-width: 80px" data-cy="icon">
          {{ props.row.icon ? '[' + props.row.icon + ']' : '' }}
          <q-popup-edit
            v-model="props.row.icon"
            :disable="!permissions.settings_mods_edit"
          >
            <q-input
              v-model="props.row.icon"
              dense
              autofocus
              @update:model-value="updateStyle(props.row.id, 'icon', $event)"
              :color="Dark.isActive ? 'blue-2' : ''"
              debounce="1000"
            />
          </q-popup-edit>
        </q-td>
        <q-td
          key="prepend"
          :props="props"
          style="min-width: 110px"
          data-cy="icon-location"
        >
          <q-btn
            :disable="!permissions.settings_mods_edit"
            :icon="props.row.style.prepend ? 'first_page' : 'last_page'"
            dense
            @click="
              updateStyle(
                props.row.id,
                'style.prepend',
                !props.row.style.prepend
              )
            "
            aria-label="Prepend Icon"
            debounce="500"
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import { debounce, LocalStorage, Notify, Dark } from 'quasar';
import { updateStyleByKey } from './../scripts/styles.js';
import { defineAsyncComponent } from 'vue';
const columns = [
  {
    name: 'label',
    align: 'center',
    label: 'Label',
    field: 'label',
    sortable: true,
    help: 'The name of this Modifier',
  },
  {
    name: 'desc',
    align: 'left',
    label: 'Description',
    field: 'desc',
    sortable: true,
    help: 'A short description of what this Modifier is',
  },
  {
    name: 'target',
    align: 'left',
    label: 'Target',
    field: 'target',
    help: 'A goal for the number of members with this Modifier',
  },
  {
    name: 'background',
    label: 'Background',
    field: 'background',
    align: 'center',
    help: 'The background color members with this Modifier will have',
  },
  {
    name: 'color',
    label: 'Text',
    field: 'color',
    align: 'center',
    help: 'The text color members with this Modifier will have',
  },
  {
    name: 'outline',
    label: 'Outline',
    field: 'outline',
    align: 'center',
    help: 'The border color members with this Modifier will have',
  },
  {
    name: 'underline',
    label: 'Underline?',
    field: 'underline',
    align: 'center',
    help: 'The underline color members with this Modifier will have',
  },
  {
    name: 'rounded',
    label: 'Shape',
    field: 'rounded',
    align: 'center',
    help: 'The shape members with this Modifier will have',
  },
  {
    name: 'icon',
    label: 'Icon',
    field: 'icon',
    align: 'center',
    sortable: true,
    help: 'The icon assigned to this Modifier',
  },
  {
    name: 'prepend',
    label: 'Icon Location',
    field: 'prepend',
    align: 'center',
    help: 'Place the icon before or after the members name',
  },
];
export default {
  // name: 'ComponentName',
  data() {
    return {
      columns,
      isFullscreen: false,
      hidebaseStyles: true,
      currentStyle: {},
      pagination: {
        sortBy: 'label',
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
    };
  },
  created() {
    this.Dark = Dark;
    this.updateStyleByKey = debounce(this.updateStyle, 3000);
    // this.updateMovement = debounce(this.updateMovement, 2000)
    this.pagination = LocalStorage.has('movementEditPagination')
      ? LocalStorage.getItem('movementEditPagination')
      : {
          sortBy: 'label',
          descending: false,
          page: 1,
          rowsPerPage: 10,
        };
  },
  methods: {
    ...mapMutations('movement', ['setStyleLoading']),
    getShape(round, shape) {
      // console.log(round, shape)
      if (shape) {
        // console.log(shape)
        return shape;
      } else if (round === true) {
        // console.log('round')
        return 'round';
      } else {
        // props.row.style.shape ? props.row.style.shape : props.row.style.round ? 'round' : 'not-round'
        // console.log('not-round')
        return 'not-round';
      }
    },
    updateStyle(id, key, val) {
      this.setStyleLoading({ id, val: true });
      return updateStyleByKey(this.$route.params.movId, id, key, val)
        .then(() => {
          this.setStyleLoading({ id, val: true });
          return Notify.create({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_download',
            message: 'Style Updated',
          });
        })
        .catch((err) => {
          this.setStyleLoading({ id, val: false });
          Notify.create({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          });
        });
    },
  },
  computed: {
    ...mapGetters('movement', ['modOpts', 'backgroundColor', 'color']),
    ...mapState('movement', ['movement', 'permissions', 'stats']),
  },
  watch: {
    pagination() {
      LocalStorage.set('movementEditPagination', this.pagination);
    },
  },
  components: {
    'mt-style-menu': defineAsyncComponent(() =>
      import('./../components/actions/mt-style-menu.vue')
    ),
  },
};
</script>

<style scoped>
.shape-light {
  border-color: black !important;
}

.shape-dark {
  border-color: white !important;
}

.not-round {
  border: black 3px solid;
  border-radius: 3px;
  padding: 8px 8px;
}

.round {
  border: black 3px solid;
  border-radius: 28px;
  padding: 8px 8px;
}

.round-right {
  border: black 3px solid;
  border-radius: 3px 28px 28px 3px;
  padding: 8px 8px;
}

.round-left {
  border: black 3px solid;
  border-radius: 28px 3px 3px 28px;
  padding: 8px 8px;
}

.round-top {
  border: black 3px solid;
  border-radius: 28px 28px 3px 3px;
  padding: 8px 8px;
}

.round-bottom {
  border: black 3px solid;
  border-radius: 3px 3px 28px 28px;
  padding: 8px 8px;
}

.round-diag {
  border: black 3px solid;
  border-radius: 20px 3px 20px 3px;
  padding: 8px 8px;
}

.round-diag-2 {
  border: black 3px solid;
  border-radius: 3px 20px 3px 20px;
  padding: 8px 8px;
}

.shadow--dark {
  box-shadow: 0 2px 4px -1px rgba(255, 255, 255, 0.2),
    0 4px 5px rgba(255, 255, 255, 0.14), 0 1px 10px rgba(255, 255, 255, 0.12);
  /*0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px rgba(0,0,0,0.14), 0 1px 10px rgba(0,0,0,0.12);*/
}

.shadow-member {
  opacity: 0.7 !important;
}
</style>
