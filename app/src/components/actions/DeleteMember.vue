<template>
  <div>
    <q-item dense clickable aria-label="Delete" @click="$refs.dialog.show()">
      <q-item-section avatar>
        <q-icon name="delete_forever" />
      </q-item-section>
      <q-item-section>Delete</q-item-section>
    </q-item>
    <teleport to="body">
      <q-dialog ref="dialog">
        <q-card>
          <q-card-section class="row items-center">
            <q-icon name="warning" size="xl" color="negative" />
            <span class="q-ml-sm"
              >Please confirm that you want to DELETE this member:<br /><br />
              <b>{{ member ? member.name : '' }}</b>
            </span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="Delete"
              color="negative"
              v-close-popup
              @click="removeMember"
            />
            <q-btn flat label="Cancel" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </teleport>
  </div>
</template>

<script>
import { remove } from './../../scripts/member.js';

export default {
  name: 'DeleteMember',
  props: ['member'],
  data() {
    return {};
  },
  methods: {
    removeMember() {
      remove(this.$route.params.movId, this.member.id, this);
      this.$refs.dialog.hide();
    },
  },
};
</script>
