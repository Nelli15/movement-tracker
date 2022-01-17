<template>
  <q-table
    :rows="roleOpts"
    :columns="columns"
    :rows-per-page-options="[10, 15, 20, 50, 100]"
    row-key="name"
    v-model:pagination="pagination"
    style="padding: -16px"
    wrap-cells
    class="my-sticky-header-table"
    :style="isFullscreen ? 'height:100vh;' : ''"
    virtual-scroll
    v-model:fullscreen="isFullscreen"
    rows-per-page-label="Roles per page:"
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
        data-cy="role-item"
      >
        <mt-style-menu :current="props.row" type="role" />
        <q-td
          key="label"
          :props="props"
          style="min-width: 200px"
          data-cy="label"
        >
          <q-btn
            :key="props.row.value"
            :class="
              props.row.style.underline
                ? 'text-underline'
                : '' + getShape(props.row.style.round, props.row.style.shape)
            "
            :style="
              'background-color:' +
              props.row.style.background +
              '; color:' +
              props.row.style.color +
              '; ' +
              'border-color:' +
              props.row.style.outline +
              ' !important;'
            "
            style="border-width: 3px; border-style: solid; width: 100%"
            dense
            no-caps
            >{{ props.row.label }}</q-btn
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
        <q-td key="background" :props="props">
          <q-btn
            :style="'background-color:' + props.row.style.background + ';'"
            aria-label="Change Background Color"
            data-cy="background"
          >
            <q-popup-edit :model-value="props.row.style.background">
              <q-color
                :model-value="props.row.style.background"
                dense
                autofocus
                @change="updateStyle(props.row.id, 'style.background', $event)"
              />
            </q-popup-edit>
          </q-btn>
        </q-td>
        <q-td key="color" :props="props">
          <q-btn
            :style="'background-color:' + props.row.style.color + ';'"
            aria-label="Change Forground Color"
            data-cy="color"
          >
            <q-popup-edit :model-value="props.row.style.color">
              <q-color
                :model-value="props.row.style.color"
                dense
                autofocus
                @change="updateStyle(props.row.id, 'style.color', $event)"
              />
            </q-popup-edit>
          </q-btn>
        </q-td>
        <q-td key="outline" :props="props">
          <q-btn
            :style="'background-color:' + props.row.style.outline + ';'"
            aria-label="Change Outline Colour"
            data-cy="outline"
          >
            <q-popup-edit :model-value="props.row.style.outline">
              <q-color
                :model-value="props.row.style.outline"
                dense
                autofocus
                @change="updateStyle(props.row.id, 'style.outline', $event)"
              />
            </q-popup-edit>
          </q-btn>
        </q-td>
        <q-td key="underline" :props="props">
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
            aria-label="Underline"
            data-cy="underline"
          ></q-btn>
        </q-td>
        <q-td key="rounded" :props="props">
          <q-btn-dropdown dense data-cy="shape">
            <template v-slot:label>
              <div
                data-cy="selected-shape"
                class="q-pa-sm"
                :class="
                  props.row.style.shape +
                  (Dark.isActive ? ' shape-dark' : ' shape-light')
                "
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
                    :class="Dark.isActive ? 'shape-dark' : 'shape-light'"
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
                    :class="Dark.isActive ? 'shape-dark' : 'shape-light'"
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
                    :class="Dark.isActive ? 'shape-dark' : 'shape-light'"
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
                    :class="Dark.isActive ? 'shape-dark' : 'shape-light'"
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
                    :class="Dark.isActive ? 'shape-dark' : 'shape-light'"
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
                    :class="Dark.isActive ? 'shape-dark' : 'shape-light'"
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
                    :class="Dark.isActive ? 'shape-dark' : 'shape-light'"
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
                    class="round-diag-2"
                    :class="Dark.isActive ? 'shape-dark' : 'shape-light'"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { debounce, LocalStorage, Notify, Dark } from "quasar";
import { updateStyleByKey } from "./../scripts/styles.js";
import { defineAsyncComponent } from "vue";
const columns = [
  {
    name: "label",
    align: "center",
    label: "Label",
    field: "label",
    sortable: true,
    help: "The name of this Role",
  },
  {
    name: "desc",
    align: "left",
    label: "Description",
    field: "desc",
    sortable: true,
    help: "A short description of what this Role is",
  },
  {
    name: "target",
    align: "left",
    label: "Target",
    field: "target",
    help: "A goal for the number of members with this Role",
  },
  {
    name: "background",
    label: "Background",
    field: "background",
    align: "center",
    help: "The background color members with this Role will have",
  },
  {
    name: "color",
    label: "Text",
    field: "color",
    align: "center",
    help: "The text color members with this Role will have",
  },
  {
    name: "outline",
    label: "Outline",
    field: "outline",
    align: "center",
    help: "The border color members with this Role will have",
  },
  {
    name: "underline",
    label: "Underline?",
    field: "underline",
    align: "center",
    help: "The underline color members with this Role will have",
  },
  {
    name: "rounded",
    label: "Shape",
    field: "rounded",
    align: "center",
    help: "The shape members with this Role will have",
  },
];
export default {
  // name: 'ComponentName',
  data() {
    return {
      columns,
      isFullscreen: false,
      currentStyle: {},
      pagination: {
        sortBy: "label",
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
    };
  },
  created() {
    this.Dark = Dark;
    this.updateStyle = debounce(this.updateStyle, 2000);
    // this.updateMovement = debounce(this.updateMovement, 2000)
    this.pagination = LocalStorage.has("movementEditPagination")
      ? LocalStorage.getItem("movementEditPagination")
      : {
          sortBy: "label",
          descending: false,
          page: 1,
          rowsPerPage: 10,
        };
  },
  methods: {
    ...mapMutations("movement", ["setStyleLoading"]),
    getShape(round, shape) {
      // console.log(round, shape)
      if (shape) {
        // console.log(shape)
        return shape;
      } else if (round === true) {
        // console.log('round')
        return "round";
      } else {
        // props.row.style.shape ? props.row.style.shape : props.row.style.round ? 'round' : 'not-round'
        // console.log('not-round')
        return "not-round";
      }
    },
    updateStyle(id, key, val) {
      this.setStyleLoading({ id, val: true });
      return updateStyleByKey(this.$route.params.movId, id, key, val)
        .then(() => {
          this.setStyleLoading({ id, val: true });
          return Notify.create({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Style Updated",
          });
        })
        .catch((err) => {
          this.setStyleLoading({ id, val: false });
          Notify.create({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!",
          });
        });
    },
  },
  computed: {
    ...mapGetters("movements", ["movements"]),
    ...mapGetters("movement", ["roleOpts", "backgroundColor", "color"]),
    ...mapState("movement", ["movement", "permissions", "stats"]),
  },
  watch: {
    pagination() {
      LocalStorage.set("movementEditPagination", this.pagination);
    },
  },
  components: {
    "mt-style-menu": defineAsyncComponent(() =>
      import("./actions/mt-style-menu.vue")
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
