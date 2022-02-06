<template>
  <div>
    <q-card bordered inline class="my-card shadow-3" :style="'border-color:'+backgroundColor+';'" @click.stop="$router.push('/movement/'+movement.id)">
      <!-- {{movement}} -->
        <q-card-section :style="'background-color:'+backgroundColor+';color:'+color+';'" class="text-h6">
          {{ movement.name }}
        </q-card-section>
        <!-- <q-card-actions> -->
          <q-banner inline-actions style="width:100%">
            <q-badge class="text-subtitle2 shadow-2 q-pa-xs" style="color:#000;background-color:#FFF;">
              <q-icon name="person" /> {{ movement.role }}
              <q-tooltip content-class="bg-accent text-grey-10">
                Your Permission Level
              </q-tooltip>
            </q-badge>
            <template v-slot:action>
              <!-- Last Updated: {{ last_modified }} -->
              <q-btn :to="'/movement/'+movement.id" icon="mdi-file-tree" dense>
                <q-tooltip content-class="bg-accent text-grey-10">
                  View Movement
                </q-tooltip>
              </q-btn>
              <!-- <q-btn @click="loading = true;duplicateMovement(movement.id)" title="Make a copy (excludes tree members)" icon="content_copy" :loading="loading" :disable="loading">
                <q-tooltip content-class="bg-accent text-grey-10">
                  Make a Copy
                </q-tooltip>
              </q-btn> -->
              <q-btn icon="settings" :to="'/movement/'+movement.id+'/settings'" v-if="['owner', 'super editor'].indexOf(movement.role) !== -1" dense>
                <q-tooltip content-class="bg-accent text-grey-10">
                  View Movement Settings
                </q-tooltip>
              </q-btn>
              <q-btn icon="people" :to="'/movement/'+movement.id+'/access'" v-if="['owner', 'super editor'].indexOf(movement.role) !== -1" dense >
                <!-- <q-badge color="red" floating>New</q-badge> -->
                <q-tooltip content-class="bg-accent text-grey-10">
                  Who can see this?
                </q-tooltip>
              </q-btn>
            </template>
          </q-banner>
        <!-- </q-card-actions> -->
        <q-inner-loading :showing="copyLoading || carbonCopyLoading || removeLoading">
            <q-spinner size="50px" color="primary" />
          </q-inner-loading>
        <q-menu
            touch-position
            context-menu
            @before-show.stop=""
          >
          <q-list dense style="min-width: 120px">
            <q-item clickable v-close-popup @click="$router.push('/movement/'+movement.id)">
              <q-item-section avatar><q-icon name="mdi-file-tree" /></q-item-section>
              <q-item-section>Open</q-item-section>
            </q-item>
            <q-separator/>
            <q-item clickable v-close-popup @click="createMovement">
              <q-item-section avatar><q-icon name="add" /></q-item-section>
              <q-item-section>New</q-item-section>
            </q-item>
            <q-separator/>
            <q-item clickable v-if="['owner', 'super editor'].indexOf(movement.role) !== -1">
              <q-item-section avatar><q-icon name="edit" /></q-item-section>
              <q-item-section>Rename</q-item-section>
              <q-item-section side>
                <q-icon name="keyboard_arrow_right" />
              </q-item-section>
              <q-menu anchor="top right" self="top left">
                <q-list dense style="min-width:100px;">
                  <q-item>
                    <q-input label="Movement Name" label-stacked v-model="movement.name" @input="renameMovement($event)" />
                  </q-item>
                </q-list>
              </q-menu>
            </q-item>
            <q-item clickable v-if="['owner', 'super editor'].indexOf(movement.role) !== -1">
              <q-item-section avatar><q-icon name="color_lens" /></q-item-section>
              <q-item-section>Change Color</q-item-section>
              <q-item-section side>
                <q-icon name="keyboard_arrow_right" />
              </q-item-section>
              <q-menu anchor="top right" self="top left">
                <q-list dense style="min-width:100px;">
                  <q-item>
                    <q-color label="Movement Color" label-stacked v-model="movement.style.backgroundColor" @change="changeMovementColor($event)" />
                  </q-item>
                </q-list>
              </q-menu>
            </q-item>
            <q-item clickable v-close-popup @click="copyMovement()">
              <q-item-section avatar><q-icon name="content_copy" /></q-item-section>
              <q-item-section>Copy</q-item-section>
              <q-tooltip content-class="bg-accent text-grey-10" anchor="center right" self="center left">
                Make a copy excluding Members
              </q-tooltip>
            </q-item>
            <q-item clickable v-close-popup @click="carbonCopyMovement()" v-if="['owner', 'super editor'].indexOf(movement.role) !== -1">
              <q-item-section avatar><q-icon name="content_copy" /></q-item-section>
              <q-item-section>Carbon Copy</q-item-section>
              <q-tooltip content-class="bg-accent text-grey-10" anchor="center right" self="center left">
                Make a copy including Members
              </q-tooltip>
            </q-item>
            <q-separator/>
            <q-item clickable v-close-popup v-if="['owner', 'super editor'].indexOf(movement.role) !== -1" @click="$router.push('/movement/'+movement.id+'/settings')">
              <q-item-section avatar><q-icon name="settings" /></q-item-section>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-item clickable v-close-popup v-if="['owner'].indexOf(movement.role) !== -1" @click="deleteDialog = true">
              <q-item-section avatar><q-icon name="delete" /></q-item-section>
              <q-item-section>Delete</q-item-section>
            </q-item>
          </q-list>

        </q-menu>
      <mt-remove-dialog :name="movement.name" type="Movement" :show="deleteDialog" @confirmed="removeMovement" :loading="removeLoading" @changed="deleteDialog = $event" />
    </q-card>
  </div>
</template>

<script>
import { debounce } from 'quasar'
// import { mapGetters } from 'vuex'

var movementJS = require('./../scripts/movement.js')

export default {
  props: {
    movement: {}
  },
  data () {
    return {
      createLoading: false,
      removeLoading: false,
      copyLoading: false,
      carbonCopyLoading: false,
      // confirmDelete: '',
      deleteDialog: false
    }
  },
  created () {
    this.createMovement = debounce(this.createMovement, 2000)
    this.renameMovement = debounce(this.renameMovement, 2000)
    this.copyMovement = debounce(this.copyMovement, 2000)
    this.carbonCopyMovement = debounce(this.carbonCopyMovement, 2000)
    this.removeMovement = debounce(this.removeMovement, 2000)
  },
  methods: {
    createMovement () {
      movementJS.create(this)
    },
    renameMovement (newName) {
      movementJS.rename(this.movement.id, newName, this)
    },
    changeMovementColor (newColor) {
      movementJS.changeColor(this.movement.id, newColor, this)
    },
    copyMovement () {
      movementJS.copy(this.movement.id, this)
    },
    carbonCopyMovement () {
      // console.log('carbonCopy')
      movementJS.carbonCopy(this.movement.id, this)
    },
    removeMovement () {
      // console.log('removeMovement', this.movement)
      movementJS.remove(this.movement.id, this)
      this.deleteDialog = false
    }
  },
  computed: {
    // ...mapGetters(['totalStats']),
    last_modified () {
      // console.log(this.movement.last_modified)
      if (this.movement.last_modified) {
        var date = new Date(this.movement.last_modified.toDate())
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      }
      return ''
    },
    color () {
      // return '#000'
      return movementJS.color(this.movement)
    },
    backgroundColor () {
      // return '#FFF'
      // console.log(movementJS)
      return movementJS.backgroundColor(this.movement)
    }
  },
  components: {
    'mt-remove-dialog': () => import('../components/mt-remove-dialog.vue')
  }
}
</script>

<style lang="stylus" scoped>
.my-card
  /*width 100%*/
  /*max-width 31.5%*/
  cursor pointer
</style>
