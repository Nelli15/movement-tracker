<template>
  <div>
    <q-tr :props="props" v-show="!edit" data-cy="member">
      <q-td key="preview" :props="props" class="q-gutter-sm">
        <q-btn
          dense
          round
          flat
          :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'"
          @click="props.expand = !props.expand"
        />
        <q-btn
          :class="{ 'text-underline': props.row.display.underline }"
          :style="
            'background-color:' +
            props.row.display.background +
            '; color:' +
            props.row.display.color +
            '; border-color:' +
            props.row.display.outline +
            ' !important;'
          "
          style="border-width: 3px; border-style: solid; z-index: 10"
          :rounded="props.row.display.round"
          :key="props.row.name"
          icon="person"
          :label="props.row.display ? props.row.display.label : props.row.name"
          no-caps
          @click.stop
        />
      </q-td>
      <q-td key="name" :props="props" class="text-weight-bold"
        >{{ props.row.name }} {{ props.row }}</q-td
      >
      <q-td key="role" :props="props" style="cursor: pointer">
        {{ props.row }}
        {{
          props.row.role.label
            ? props.row.role.label
            : roles[props.row.role]
            ? roles[props.row.role].label
            : "--No Role--"
        }}</q-td
      >
      <q-td key="actions" :props="props" class="q-gutter-sm">
        <q-btn
          icon="delete"
          dense
          color="negative"
          @click="deleteMember(props.row.id)"
          aria-label="Delete Member"
          v-if="permissions.members_delete"
        >
          <q-tooltip
            class="bg-accent text-grey-10"
            anchor="center right"
            self="center left"
            >Delete</q-tooltip
          >
        </q-btn>
      </q-td>
    </q-tr>
    <q-tr v-show="props.expand && !edit" :props="props">
      <q-td colspan="100%">
        <div class="text-left q-gutter-xs">
          <q-badge
            color="blue"
            v-for="overrideStyle in props.row.mods"
            :key="overrideStyle"
            >{{ mods[overrideStyle] ? mods[overrideStyle].label : "" }}</q-badge
          >
        </div>
      </q-td>
    </q-tr>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { Loading } from "quasar";
// import { mapActions } from 'vuex'

const memberJS = require("./../scripts/member.js");
const promiseDebounce = require("./../scripts/promiseDebounce.js");

export default {
  props: {
    // user: {},
    props: {},
  },
  data() {
    return {
      parentOptionsFiltered: [],
      edit: false,
      columns: [
        { name: "preview", align: "left", label: "Preview", field: "preview" },
        {
          name: "name",
          align: "left",
          label: "Name",
          field: "name",
          sortable: true,
        },
        {
          name: "role",
          align: "center",
          label: "Role",
          field: "role",
          sortable: true,
        },
        {
          name: "parent",
          label: "Parent",
          field: "parent",
          align: "center",
          sortable: true,
        },
        { name: "actions", label: "Actions", field: "actions", align: "right" },
      ],
    };
  },

  created: function () {
    this.LocalStorage;
    this.updateMember = promiseDebounce.debounce(this.updateMember, 2000);
  },
  methods: {
    updateMemberFn(payload) {
      Loading.show();
      this.$refs.menu.hide();
      this.updateMember(payload).then(() => {
        Loading.hide();
        return true;
      });
    },
    removeMember(event) {
      if (this.member.children.some((a) => typeof a === "object")) {
        return;
      }
      return memberJS.remove(this.$route.params.movId, event.id, this);
    },
    copyMember() {
      return memberJS.copy(this.member, this.$route.params.movId, this);
    },
    updateParent(event, member) {
      Loading.show();
      this.updateMember({
        key: "parent",
        memberId: member.id,
        value: event.value,
      });
      Loading.hide();
    },
    filterParents(val, update) {
      if (val === "") {
        update(() => {
          this.parentOptionsFiltered = this.parentOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.parentOptionsFiltered = this.parentOptions.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
  computed: {
    ...mapGetters("movement", ["roleOpts", "modOpts", "parentOptions"]),
    ...mapState("movement", ["permissions", "roles", "mods", "parents"]),
  },
};
</script>

<style>
.btn-rounded {
  border-radius: 25px !important;
}

.btn-underline {
  text-decoration: underline !important;
}
</style>
