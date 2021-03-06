<template>
  <q-card style="width: 250px" data-cy="add-existing-member-comp">
    <q-list bordered dense padding>
      <q-item>
        <q-item-section>
          <q-select
            v-model="existing"
            label="Member"
            :options="
              memberListFiltered.sort((a, b) => {
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                if (x < y) {
                  return -1;
                }
                if (x > y) {
                  return 1;
                }
                return 0;
              })
            "
            option-label="name"
            option-value="id"
            option-dense
            emit-value
            map-options
            :color="q.dark.isActive ? 'blue-2' : ''"
            @filter="filterMembers"
            use-input
            input-debounce="0"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label> Shadow Member? </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-checkbox v-model="shadow" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-btn
            icon="add"
            dense
            @click="addExistingMember"
            color="positive"
            label="Add to Tree"
            v-close-popup
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { useQuasar } from 'quasar';
import {
  getFirestore,
  updateDoc,
  setDoc,
  doc,
  arrayUnion,
} from '@firebase/firestore';

export default {
  name: 'AddExistingMemberToTree',
  props: ['parent', 'treeId'],
  data() {
    return {
      existing: '',
      shadow: false,
      memberListFiltered: [],
    };
  },
  setup() {
    const q = useQuasar();
    return { q };
  },
  methods: {
    addExistingMember() {
      try {
        return updateDoc(
          doc(
            getFirestore(),
            `/movements/${this.movement.id}/members/${this.existing}`
          ),
          { trees: arrayUnion(this.treeId) }
        )
          .then(async (res) => {
            if (this.shadow) {
              return await setDoc(
                doc(
                  getFirestore(),
                  `/movements/${this.movement.id}/trees/${this.treeId}/components/parents`
                ),
                { [this.existing]: { shadow: arrayUnion(this.parent) } },
                { merge: true }
              );
            } else {
              return await setDoc(
                doc(
                  getFirestore(),
                  `/movements/${this.movement.id}/trees/${this.treeId}/components/parents`
                ),
                { [this.existing]: { parent: this.parent } },
                { merge: true }
              );
            }
          })
          .then(() => true)
          .catch((err) => {
            // if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
            console.error(new Error('Oops, something went wrong: ' + err));
            return false;
          });
      } catch (err) {
        // if (process.env.PROD) logEvent(getAnalytics(), 'exception', { description: err, fatal: false })
        console.error(new Error('Oops, something went wrong: ' + err));
        return false;
      }
    },
    filterMembers(val, update) {
      update(() => {
        if (val === '') {
          this.memberListFiltered = this.memberList;
        } else {
          const needle = val.toLowerCase();
          this.memberListFiltered = this.memberList.filter((v) => {
            return v.name.toLowerCase().indexOf(needle) > -1;
          });
        }
      });
    },
  },
  computed: {
    ...mapGetters('movement', ['memberList']),
    ...mapState('movement', ['movement']),
  },
};
</script>
