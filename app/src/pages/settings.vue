<template>
  <div data-cy="settings-page">
    <q-drawer
      show-if-above
      overlay
      mini
      :width="200"
      :breakpoint="1"
      bordered
      style="background-color: #c54210; color: white"
      data-cy="toolbox"
    >
      <!-- <q-scroll-area> -->
      <q-list padding>
        <q-item
          clickable
          @click="addStyle('role')"
          v-close-popup
          v-if="permissions.settings_roles_create"
          data-cy="create-role"
        >
          <q-item-section avatar>
            <q-icon name="img:icons/mdi-cards-white.svg" />
          </q-item-section>
          <q-item-section>Add Role</q-item-section>
          <q-tooltip
            class="bg-accent text-grey-10"
            anchor="center right"
            self="center left"
            >Add Role</q-tooltip
          >
        </q-item>
        <q-item
          clickable
          v-if="permissions.settings_mods_create"
          data-cy="create-mod"
        >
          <q-item-section avatar @click="addStyle('mod')" v-close-popup>
            <q-icon name="img:icons/mdi-cards-outline-white.svg" />
          </q-item-section>
          <q-item-section>Add Modifier</q-item-section>
          <q-tooltip
            class="bg-accent text-grey-10"
            anchor="center right"
            self="center left"
            >Add Modifier</q-tooltip
          >
        </q-item>
        <q-item
          clickable
          v-if="permissions.settings_complex_create"
          data-cy="create-complex"
        >
          <q-item-section avatar @click="addStyle('complex')" v-close-popup>
            <q-icon name="insights" />
          </q-item-section>
          <q-item-section>Add Complex</q-item-section>
          <q-tooltip
            class="bg-accent text-grey-10"
            anchor="center right"
            self="center left"
            >Add Complex Statistic</q-tooltip
          >
        </q-item>
        <q-item
          clickable
          v-if="permissions.settings_calc_create"
          data-cy="create-calc"
        >
          <q-item-section avatar @click="addStyle('calc')" v-close-popup>
            <q-icon name="functions" />
          </q-item-section>
          <q-item-section>Add Calculated</q-item-section>
          <q-tooltip
            class="bg-accent text-grey-10"
            anchor="center right"
            self="center left"
            >Add Calculated Statistic</q-tooltip
          >
        </q-item>
      </q-list>
    </q-drawer>
    <q-menu context-menu>
      <q-list
        dense
        style="min-width: 100px"
        v-if="permissions.settings_roles_create"
      >
        <q-item
          clickable
          @click="addStyle('role')"
          v-close-popup
          data-cy="create-role"
        >
          <q-item-section avatar>
            <q-icon name="img:icons/mdi-cards.svg" />
          </q-item-section>
          <q-item-section>Add Role</q-item-section>
        </q-item>
        <q-item
          clickable
          v-if="permissions.settings_mods_create"
          data-cy="create-mod"
          @click="addStyle('mod')"
        >
          <q-item-section avatar v-close-popup>
            <q-icon name="img:icons/mdi-cards-outline.svg" />
          </q-item-section>
          <q-item-section>Add Modifier</q-item-section>
        </q-item>
        <q-item
          clickable
          v-if="permissions.settings_complex_create"
          data-cy="create-complex"
          @click="addStyle('complex')"
        >
          <q-item-section avatar v-close-popup>
            <q-icon name="insights" />
          </q-item-section>
          <q-item-section>Add Complex</q-item-section>
        </q-item>
        <q-item
          clickable
          v-if="permissions.settings_calc_create"
          data-cy="create-calc"
          @click="addStyle('calc')"
        >
          <q-item-section avatar v-close-popup>
            <q-icon name="functions" />
          </q-item-section>
          <q-item-section>Add Calculated Statistic</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
    <div style="padding-left: 56px">
      <q-tabs
        v-model="tab"
        dense
        indicator-color="yellow"
        class="bg-primary text-white shadow-2"
        align="center"
        narrow-indicator
        style="width: 100%"
      >
        <q-tab
          name="roles"
          label="Roles"
          v-if="permissions.settings_roles_view"
          data-cy="role-tab"
        />
        <q-tab
          name="modifiers"
          label="Modifiers"
          v-if="permissions.settings_mods_view"
          data-cy="mod-tab"
        />
        <q-tab
          name="complex"
          label="Complex"
          v-if="permissions.settings_complex_view"
          data-cy="complex-tab"
        />
        <q-tab
          name="calc"
          label="Calculated"
          v-if="permissions.settings_calc_view"
          data-cy="calc-tab"
        />
      </q-tabs>

      <!-- <q-separator /> -->
      <q-scroll-area style="height: calc(100vh - 86px); max-width: 100%">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            name="roles"
            style="padding: 0px"
            data-cy="role-tab-panel"
          >
            <mt-styles-role-table />
          </q-tab-panel>

          <q-tab-panel
            name="modifiers"
            style="padding: 0px"
            data-cy="mod-tab-panel"
          >
            <mt-styles-mod-table />
          </q-tab-panel>

          <q-tab-panel
            name="complex"
            style="padding: 0px"
            data-cy="complex-tab-panel"
          >
            <mt-styles-complex-table />
          </q-tab-panel>
          <q-tab-panel
            name="calc"
            style="padding: 0px"
            data-cy="calc-tab-panel"
          >
            <mt-styles-calc-table />
          </q-tab-panel>
        </q-tab-panels>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import { getAnalytics, setCurrentScreen } from "firebase/analytics";
import { mapGetters, mapState } from "vuex";
import { addStyle } from "../scripts/styles.js";
import { defineAsyncComponent } from "vue";
import { Notify, LocalStorage } from "quasar";
export default {
  props: {},
  data() {
    return {
      tab: "roles",
    };
  },
  preFetch({ store, currentRoute }) {
    store.dispatch("movement/fetchStyles", {
      movId: currentRoute.params.movId,
    });
  },
  created: function () {
    this.tab = LocalStorage.has("movementEditTab")
      ? LocalStorage.getItem("movementEditTab")
      : "roles";
    setCurrentScreen(getAnalytics(), "Movement_Settings");
  },
  computed: {
    ...mapGetters("movement", ["roleOpts"]),
    ...mapState("movement", ["movement", "permissions"]),
  },
  methods: {
    addStyle(type) {
      // console.log(type);
      addStyle(this.$route.params.movId, type)
        .then(() => {
          Notify.create({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Style Added",
          });
          return true;
        })
        .catch((err) => {
          Notify.create({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!",
          });
        });
    },
  },
  watch: {
    tab() {
      LocalStorage.set("movementEditTab", this.tab);
    },
  },
  components: {
    "mt-styles-role-table": defineAsyncComponent(() =>
      import("../components/mt-styles-role-table.vue")
    ),
    "mt-styles-mod-table": defineAsyncComponent(() =>
      import("../components/mt-styles-mod-table.vue")
    ),
    "mt-styles-complex-table": defineAsyncComponent(() =>
      import("../components/mt-styles-complex-table.vue")
    ),
    "mt-styles-calc-table": defineAsyncComponent(() =>
      import("../components/mt-styles-calc-table.vue")
    ),
  },
};
</script>
