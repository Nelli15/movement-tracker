<template>
  <q-card style="max-width: 300px" data-cy="edit-member-comp">
    <q-list bordered dense class="q-pb-sm">
      <q-item>
        <!-- <q-item-section avatar>
          Name
        </q-item-section>-->
        <q-item-section>
          <q-item-label>
            <q-input
              v-model="name"
              autofocus
              @update:model-value="
                updateFields({
                  key: 'name',
                  memberId: localMember.id,
                  value: $event,
                })
              "
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
              label="Name"
              :color="Dark.isActive ? 'blue-2' : ''"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <!-- <q-item-section avatar>
          Role
        </q-item-section>-->
        <q-item-section>
          <q-item-label>
            <!-- {{localMember.role}} -->
            <q-select
              :model-value="
                roles[localMember.role] && roles[localMember.role].label
              "
              :options="roleOptsFiltered"
              @update:model-value="
                updateFields({
                  key: 'role',
                  memberId: localMember.id,
                  value: $event,
                  localValue: $event,
                })
              "
              :rules="[(val) => !!val || 'Field is required']"
              label="Role"
              use-input
              @filter="filterBaseStyles"
              :color="Dark.isActive ? 'blue-2' : ''"
              dropdown-icon="arrow_drop_down"
              map-options
              emit-value
              option-value="id"
              :popup-content-style="
                Platform.is.desktop
                  ? 'max-width: 268px !important;width: 268px !important;'
                  : ''
              "
            >
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                  :class="{
                    'text-positive': localMember.role === scope.opt.id,
                  }"
                >
                  <q-item-section>
                    <q-item-label v-html="scope.opt.label" />
                    <q-item-label caption v-if="scope.opt.desc > ''">{{
                      typeof scope.opt.desc === 'string' && scope.opt.desc > ''
                        ? scope.opt.desc.length > 100
                          ? scope.opt.desc.substring(0, 100).concat('...')
                          : scope.opt.desc
                        : scope.opt.desc
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-select
            use-chips
            :options="modOptsFiltered"
            :model-value="[...localMember.mods]"
            input-debounce="0"
            @update:model-value="
              addOverrideStyle(
                $event[$event.length - 1] ? $event[$event.length - 1].id : null
              )
            "
            label="Modifiers"
            multiple
            use-input
            @filter="filterOverrideStyles"
            :color="Dark.isActive ? 'blue-2' : ''"
            dropdown-icon="arrow_drop_down"
            :popup-content-style="
              Platform.is.desktop
                ? 'max-width: 268px !important;width: 268px !important;'
                : ''
            "
          >
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
                :class="{
                  'text-positive': localMember.mods.includes(scope.opt.id),
                }"
              >
                <q-item-section>
                  <q-item-label v-html="scope.opt.label" />
                  <q-item-label caption v-if="scope.opt.desc > ''">{{
                    typeof scope.opt.desc === 'string' && scope.opt.desc > ''
                      ? scope.opt.desc.substring(0, 100).concat('...')
                      : scope.opt.desc
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:selected-item="scope">
              <q-chip
                v-if="scope.opt"
                :tabindex="scope.tabindex"
                color="blue"
                text-color="white"
                class="q-mx-xs q-pr-none"
              >
                <!-- {{ scope.opt }} -->
                {{
                  mods[scope.opt.id ? scope.opt.id : scope.opt] &&
                  mods[scope.opt.id ? scope.opt.id : scope.opt].label
                }}
                <q-btn
                  icon="cancel"
                  round
                  dense
                  flat
                  size="md"
                  class="q-ml-xs"
                  style="color: inherit; opacity: 0.6"
                  @click="removeOverrideStyle(scope.opt)"
                />
              </q-chip>
            </template>
          </q-select>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label> Shadow Member? </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-checkbox
            v-model="localShadow"
            @update:model-value="changeType = !changeType"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-btn
            icon="save"
            label="Save"
            @click="saveChanges"
            v-close-popup
            color="positive"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
const promiseDebounce = require('./../../scripts/promiseDebounce.js');
import {
  getFirestore,
  updateDoc,
  doc,
  arrayRemove,
  arrayUnion,
} from '@firebase/firestore';
import { Dark, Notify, Platform } from 'quasar';
// import { mapActions } from 'vuex'

export default {
  name: 'mt-edit-member',
  props: {
    // user: {}
    // contextMenu: Boolean,
    member: {},
    treeOpt: null,
    shadow: Boolean,
    node: {},
  },
  data() {
    return {
      // parentOptionsFiltered: [],
      modOptsFiltered: [],
      roleOptsFiltered: [],
      name: '',
      localMember: {},
      localShadow: false,
      changeType: false,
      fieldsToUpdate: {},
    };
  },
  created: function () {
    this.Dark = Dark;
    this.Platform = Platform;
    this.updateMember = promiseDebounce.debounce(this.updateMember, 3000);
    // let member = JSON.parse(JSON.stringify(this.member));
    // for (let key in member) {
    //   console.log("updating Key:", key, this.fieldsToUpdate[key], member[key]);
    //   if (!this.fieldsToUpdate[key]) this.localMember[key] = member[key];
    // }
    // this.name = this.localMember.name;
  },
  methods: {
    ...mapActions('movement', ['updateMember']),
    filterOverrideStyles(val, update) {
      update(() => {
        if (val === '') {
          this.modOptsFiltered = this.modOpts;
        } else {
          const needle = val.toLowerCase();
          this.modOptsFiltered = this.modOpts.filter((v) => {
            // console.log(
            //   v.label.toLowerCase(),
            //   needle,
            //   v.label.toLowerCase().indexOf(needle) > -1
            // );
            return v.label.toLowerCase().indexOf(needle) > -1;
          });
        }
      });
    },
    filterBaseStyles(val, update) {
      update(() => {
        if (val === '') {
          this.roleOptsFiltered = this.roleOpts;
        } else {
          const needle = val.toLowerCase();
          this.roleOptsFiltered = this.roleOpts.filter((v) => {
            // console.log(
            //   v.label.toLowerCase(),
            //   needle,
            //   v.label.toLowerCase().indexOf(needle) > -1
            // );
            return v.label.toLowerCase().indexOf(needle) > -1;
          });
        }
      });
    },
    addOverrideStyle(overrideStyle) {
      if (overrideStyle === null) return false;
      // console.log('done')
      // console.log(typeof this.localMember.mods)
      // console.log('add overrideStyle, ', overrideStyleText)

      if (
        this.localMember.mods.indexOf(overrideStyle) === -1 &&
        this.mods[overrideStyle]
      ) {
        this.localMember.mods.push(overrideStyle);
        var mods = this.localMember.mods;
        // console.log(mods);
        this.updateFields({
          key: 'mods',
          memberId: this.localMember.id,
          value: mods,
          // localValue: this.localMember.mods,
          local: mods,
        });
      }
    },
    removeOverrideStyle(overrideStyle) {
      // console.log("Remove Override Style");
      // var overrideStyleValIndex = this.mods.map(function (d) { return d['text'] }).indexOf(overrideStyleText)
      // console.log(this.mods)
      // console.log(overrideStyleValIndex)
      // var overrideStyleVal = this.mods[overrideStyleText].value
      // console.log(this.localMember.mods, this.mods, overrideStyleVal, overrideStyleText)
      var mods = [...this.localMember.mods];

      var index = mods.indexOf(overrideStyle);

      // console.log(index, overrideStyle, mods);
      if (index > -1) {
        mods.splice(index, 1);

        for (var ii in mods) {
          if (!mods[ii]) {
            mods.splice(ii, 1);
          }
        }
        // console.log(this.localMember.mods);
        this.updateFields({
          key: 'mods',
          memberId: this.localMember.id,
          value: mods,
        });
      }
    },
    updateFields(payload) {
      // console.log(payload);
      if (payload.value === null) return false;
      this.localMember[payload.key] = payload.value;
      this.fieldsToUpdate[payload.key] = payload.value;
    },
    async saveChanges() {
      // console.log("saving");
      let promises = [];
      if (Object.keys(this.fieldsToUpdate).length > 0)
        promises.push(
          this.updateMember({
            memberId: this.localMember.id,
            fields: this.fieldsToUpdate,
          })
        );
      if (this.changeType) promises.push(this.changeMemberType());
      Promise.all(promises)
        .then(() => {
          Notify.create({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_download',
            message: 'Member Updated',
          });
        })
        .catch((err) => {
          Notify.create({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          });
        });
    },
    changeMemberType() {
      if (this.localShadow) {
        return updateDoc(
          doc(
            getFirestore(),
            `/movements/${this.movement.id}/trees/${this.treeOpt.id}/components/parents`
          ),
          {
            [this.member.id + '.parent']: null,
            [this.member.id + '.shadow']: arrayUnion(this.node.parent),
          }
        );
      } else {
        return updateDoc(
          doc(
            getFirestore(),
            `/movements/${this.movement.id}/trees/${this.treeOpt.id}/components/parents`
          ),
          {
            [this.member.id + '.parent']: this.node.parent,
            [this.member.id + '.shadow']: arrayRemove(this.node.parent),
          }
        );
      }
    },
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('movement', ['roleOpts', 'modOpts']),
    ...mapState('movement', ['movement', 'roles', 'mods']),
  },
  watch: {
    member: {
      deep: false,
      immediate: true,
      handler() {
        // console.log(
        //   this.localMember.id,
        //   this.member.id,
        //   this.localMember.id === this.member.id
        // );
        // if (this.localMember.id === this.member.id && ) return;
        let member = JSON.parse(JSON.stringify(this.member));
        this.name = member.name;
        this.localMember = member;
        // for (let key in member) {
        //   console.log(
        //     "updating Key:",
        //     key,
        //     this.fieldsToUpdate[key],
        //     member[key]
        //   );
        //   if (!this.fieldsToUpdate[key]) this.localMember[key] = member[key];
        // }
      },
    },
    shadow: {
      deep: true,
      immediate: true,
      handler() {
        this.localShadow = this.shadow;
      },
    },
  },
};
</script>
