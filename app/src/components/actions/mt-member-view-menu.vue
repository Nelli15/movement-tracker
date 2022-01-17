<template>
  <q-card>
    <q-list bordered padding style="min-width: 100px; max-width: 300px">
      <q-item>
        <q-item-section avatar>Name</q-item-section>
        <q-item-section>
          <q-item-label>{{ localMember.name }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>Role</q-item-section>
        <q-item-section>
          <q-item-label v-if="localMember.role">
            {{
              localMember.role
                ? roles[localMember.role]
                  ? roles[localMember.role].label
                  : localMember.role.label
                  ? localMember.role.label
                  : "Missing Role"
                : "Missing Role"
            }}
            <q-tooltip
              class="bg-accent text-grey-10"
              anchor="center right"
              self="center left"
              v-if="
                localMember.role &&
                (roles[localMember.role] || localMember.role.desc > '')
              "
              >{{
                localMember.role
                  ? roles[localMember.role]
                    ? roles[localMember.role].desc
                    : localMember.role.desc
                    ? localMember.role.desc
                    : ""
                  : ""
              }}</q-tooltip
            >
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>Modifiers</q-item-section>
        <q-item-section>
          <q-item-label v-if="localMember.mods">
            <div class="q-gutter-xs">
              <q-badge
                color="blue"
                v-for="overrideStyle in localMember.mods"
                :key="overrideStyle.label"
                multi-line
              >
                {{
                  overrideStyle
                    ? mods[overrideStyle]
                      ? mods[overrideStyle].label
                      : overrideStyle.label
                      ? overrideStyle.label
                      : "Missing Modifier"
                    : "Missing Modifier"
                }}
                <q-tooltip
                  class="bg-accent text-grey-10"
                  anchor="center right"
                  self="center left"
                  v-if="
                    overrideStyle &&
                    (mods[overrideStyle] || overrideStyle.desc > '')
                  "
                  >{{
                    overrideStyle
                      ? mods[overrideStyle]
                        ? mods[overrideStyle].desc
                        : overrideStyle.desc
                        ? overrideStyle.desc
                        : ""
                      : ""
                  }}</q-tooltip
                >
              </q-badge>
            </div>
          </q-item-label>
        </q-item-section>
      </q-item>
      <!-- <q-item>
        <q-item-section avatar>Parents</q-item-section>
        <q-item-section>
          <q-item-label>{{ parents[localMember.parent].name }}</q-item-label>
          <q-item-label v-if="localMember.alt > ''">{{
            parents[localMember.alt].name
          }}</q-item-label>
        </q-item-section>
      </q-item> -->
      <q-item>
        <q-item-section avatar>Notes</q-item-section>
        <q-item-section>
          <q-item-label>{{ localMember.notes }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  // name: 'ComponentName',
  props: {
    localMember: {},
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("movement", ["roles", "mods", "parents"]),
  },
};
</script>
