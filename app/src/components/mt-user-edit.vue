<template>
  <q-card class="q-pa-md">
    <q-list>
      <q-item> User </q-item>
      <q-item>
        <q-input
          :model-value="user.displayName"
          label="Name"
          @update:model-value="userChanged({ key: 'displayName', val: $event })"
        />
      </q-item>
      <q-item>
        <q-select
          :model-value="user.gender"
          @update:model-value="userChanged({ key: 'gender', val: $event })"
          label="Gender"
          :options="['Not Specified', 'Male', 'Female', 'Other']"
          style="width: 100%"
        />
      </q-item>
      <q-item>
        <q-input
          :model-value="user.dob"
          @update:model-value="userChanged({ key: 'dob', val: $event })"
          label="Date of Birth"
        />
      </q-item>
      <q-item>
        <q-input
          :model-value="user.age"
          @update:model-value="userChanged({ key: 'age', val: $event })"
          label="Age"
        />
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { debounce } from "quasar";

export default {
  name: "mt-user-edit",
  data() {
    return {};
  },
  created() {
    this.updateUser = debounce(this.updateUser, 2000);
  },
  computed: {
    ...mapGetters("auth", ["user"]),
  },
  methods: {
    ...mapActions("auth", ["updateUser"]),
    userChanged(payload) {
      // console.log('dob changed')
      const date = new Date();
      const dob = new Date(this.user.dob);

      this.user.age = date.getFullYear() - dob.getFullYear();
    },
  },
  watch: {},
};
</script>
