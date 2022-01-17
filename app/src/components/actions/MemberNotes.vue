<template>
  <q-card data-cy="edit-member-notes-comp">
    <q-list bordered padding dense>
      <q-item>
        <q-input
          type="textarea"
          :model-value="
            fieldsToUpdate.notes ? fieldsToUpdate.notes : member.notes
          "
          autofocus
          @update:model-value="
            updateFields({
              key: 'notes',
              memberId: member.id,
              value: $event,
            })
          "
          debounce="3000"
          label="Notes"
          stack-label
          :color="Dark.isActive ? 'blue-2' : ''"
        />
      </q-item>
      <q-item>
        <q-item-section>
          <q-btn
            icon="save"
            label="Save"
            @click="saveChanges()"
            v-close-popup
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import { Dark, Notify } from "quasar";
export default {
  name: "MemberNotes",
  props: ["member"],
  data() {
    return {
      fieldsToUpdate: {},
    };
  },
  created() {
    this.Dark = Dark;
  },
  methods: {
    ...mapActions("movement", ["updateMember"]),
    updateFields(payload) {
      if (payload.value === null) return false;
      // this.localMember[payload.key] = payload.value;
      this.fieldsToUpdate[payload.key] = payload.value;
    },
    async saveChanges() {
      // console.log("test");
      // console.log({
      //   memberId: this.member.id,
      //   fields: this.fieldsToUpdate,
      // });
      if (Object.keys(this.fieldsToUpdate).length > 0)
        this.updateMember({
          memberId: this.member.id,
          fields: this.fieldsToUpdate,
        }).then(() => {
          // Notify.create({
          //   color: "positive",
          //   textColor: "white",
          //   icon: "cloud_download",
          //   message: "Member Updated",
          // });
          //       this.$emit("save", {});
        });
    },
  },
};
</script>
