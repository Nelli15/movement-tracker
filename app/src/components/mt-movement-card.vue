<template>
  <div data-cy="movement-card" :data-movId="movementProp.id">
    <q-card
      v-if="movementProp.id === 'tempMovement'"
      bordered
      inline
      class="shadow-3"
      :style="'border-color:' + backgroundColor + ';'"
      style="cursor: pointer"
    >
      <q-card-section
        class="text-h6 text-weight-bold"
        :style="'background-color:' + backgroundColor + ';'"
      >
        <q-skeleton type="text" style="background: rgba(255, 255, 255, 0.05)" />
      </q-card-section>
      <q-banner inline-actions style="width: 100%">
        <q-skeleton
          type="QBadge"
          class="text-subtitle2 shadow-2 q-pa-xs"
          v-if="!q.platform.is.mobile"
        />
        <template v-slot:action>
          <q-skeleton
            type="QBtn"
            :to="'/movement/' + movementProp.id + '/members'"
            dense
            aria-label="View Members"
            style="height: 32px; width: 32px"
          />
          <q-skeleton
            type="QBtn"
            icon="photo_library"
            :to="'/movement/' + movementProp.id + '/snapshots'"
            dense
            aria-label="View Snapshots"
            class="q-ml-xs"
            style="height: 32px; width: 32px"
          />
          <!-- <q-skeleton
            type="QBtn"
            icon="timeline"
            :to="'/movement/' + movementProp.id + '/trends'"
            dense
            aria-label="View Trends"
            class="q-ml-xs"
            style="height: 32px; width: 32px"
          /> -->
          <q-skeleton
            type="QBtn"
            icon="settings"
            :to="'/movement/' + movementProp.id + '/settings'"
            dense
            aria-label="View Movement Settings"
            class="q-ml-xs"
            style="height: 32px; width: 32px"
          />
          <q-skeleton
            type="QBtn"
            icon="people"
            :to="'/movement/' + movementProp.id + '/access'"
            dense
            aria-label="Sharing Settings"
            class="q-ml-xs"
            style="height: 32px; width: 32px"
          />
        </template>
      </q-banner>
      <!-- <mt-movement-context-menu :movementProp="movementProp" /> -->
    </q-card>
    <q-card
      v-else
      bordered
      inline
      class="shadow-3 movement-card"
      :style="'border-color:' + backgroundColor + ';'"
      style="cursor: pointer"
      @click.stop="$router.push('/movement/' + movementProp.id + '/members')"
    >
      <q-card-section
        :style="'background-color:' + backgroundColor + ';color:' + color + ';'"
        class="text-h6 text-weight-bold"
        >{{ movementProp.name }}</q-card-section
      >
      <q-banner inline-actions style="width: 100%">
        <q-badge
          class="text-subtitle2 shadow-2 q-pa-xs"
          style="color: #000; background-color: #fff"
          v-if="!q.platform.is.mobile && movementProp && movementProp.role"
          data-cy="user-role"
        >
          <q-icon name="person" />
          {{ movementProp.role }}
          <q-tooltip class="bg-accent text-grey-10"
            >Your Permission Level</q-tooltip
          >
        </q-badge>
        <template v-slot:action>
          <q-btn
            :to="'/movement/' + movementProp.id + '/members'"
            dense
            aria-label="View Movement"
            v-if="movementProp.permissions.members_view"
            class="pageLink"
            @click.stop
          >
            <q-icon
              :name="
                q.dark.isActive
                  ? 'img:icons/file-tree-white.svg'
                  : 'img:icons/file-tree.svg'
              "
            />
            <q-tooltip class="bg-accent text-grey-10">View Members</q-tooltip>
          </q-btn>
          <q-btn
            icon="photo_library"
            :to="'/movement/' + movementProp.id + '/snapshots'"
            dense
            aria-label="View Snapshots"
            class="q-ml-xs pageLink"
            v-if="movementProp.permissions.snapshots_view"
            @click.stop
          >
            <q-tooltip class="bg-accent text-grey-10">View Snapshots</q-tooltip>
          </q-btn>
          <!-- <q-btn
            icon="timeline"
            :to="'/movement/' + movementProp.id + '/trends'"
            dense
            aria-label="View Trends"
            class="q-ml-xs pageLink"
            v-if="movementProp.permissions.trends_view"
            @click.stop
          >
            <q-tooltip class="bg-accent text-grey-10">View Trends</q-tooltip>
          </q-btn> -->
          <q-btn
            icon="settings"
            :to="'/movement/' + movementProp.id + '/settings'"
            v-if="movementProp.permissions.settings_view"
            dense
            aria-label="View Movement Settings"
            class="q-ml-xs pageLink"
            @click.stop
          >
            <q-tooltip class="bg-accent text-grey-10"
              >View Movement Settings</q-tooltip
            >
          </q-btn>
          <q-btn
            icon="people"
            :to="'/movement/' + movementProp.id + '/access'"
            v-if="movementProp.permissions.access_view"
            dense
            aria-label="Sharing Settings"
            class="q-ml-xs pageLink"
            @click.stop
          >
            <!-- <q-badge color="red" floating>New</q-badge> -->
            <q-tooltip class="bg-accent text-grey-10"
              >Who can see this?</q-tooltip
            >
          </q-btn>
        </template>
      </q-banner>
      <mt-movement-context-menu
        :movementProp="movementProp"
        :permissions="movementProp.permissions"
      />
    </q-card>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { useQuasar } from "quasar";
export default {
  props: {
    movementProp: {},
  },
  setup(props) {
    const q = useQuasar();
    function color() {
      // return '#000'
      if (props.movementProp.style) {
        if (props.movementProp.style.backgroundColor) {
          const h = props.movementProp.style.backgroundColor;
          return (100 *
            (parseInt(h[1] + h[2], 16) / 255 +
              parseInt(h[3] + h[4], 16) / 255 +
              parseInt(h[5] + h[6], 16) / 255)) /
            3 >=
            50
            ? "black"
            : "white";
        }
      }
      return "black";
    }
    function backgroundColor() {
      if (props.movementProp.style) {
        if (props.movementProp.style.backgroundColor) {
          return props.movementProp.style.backgroundColor;
        }
      }
      return "white";
    }
    return { q, color, backgroundColor };
  },
  components: {
    "mt-movement-context-menu": defineAsyncComponent(() =>
      import("./actions/mt-movement-context-menu")
    ),
  },
};
</script>
