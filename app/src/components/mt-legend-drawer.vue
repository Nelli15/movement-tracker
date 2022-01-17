<template>
  <div>
    <q-drawer
      side="right"
      v-model="show.movementLegend"
      bordered
      style="width:400px;max-width:95%"
      :breakpoint="1"
      data-cy="movement-legend-comp"
    >
      <q-btn
        v-show="show.movementLegend"
        round
        color="primary"
        :icon="matKeyboardArrowRight"
        fab-mini
        class="absolute"
        style="top:50%; left:-30px; z-index:10"
        @click="showDrawer('movementLegend')"
        aria-label="Show Legend of Symbols"
      />
      <q-tabs
        v-model="tab"
        dense
        indicator-color="yellow"
        class="bg-primary text-white shadow-2"
        align="justify"
        narrow-indicator
      >
        <q-tab name="roles" label="Roles" />
        <q-tab name="mods" label="Modifiers" />
      </q-tabs>
      <q-separator />
      <!-- {{ roleOpts }}{{ modOpts }} -->
      <q-inner-loading
        :showing="
          roleOpts && roleOpts.length <= 0 && modOpts && modOpts.length <= 0
        "
      >
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
      <q-tab-panels
        v-model="tab"
        animated
        v-if="
          (roleOpts && roleOpts.length > 0) || (modOpts && modOpts.length > 0)
        "
      >
        <q-tab-panel name="roles" style="padding:0">
          <q-list v-if="movement">
            <q-item v-for="style in baseFiltered" :key="style.id">
              <q-item-section v-if="style.style">
                <q-btn
                  :key="style.value"
                  :class="
                    style.style.underline
                      ? 'text-underline'
                      : '' + style.style.shape
                      ? style.style.shape
                      : style.style.round
                      ? 'round'
                      : 'not-round'
                  "
                  :style="
                    'background-color:' +
                      style.style.background +
                      '; color:' +
                      style.style.color +
                      '; ' +
                      'border-color:' +
                      style.style.outline +
                      ' !important;'
                  "
                  style="border-width:3px; border-style: solid; width:100%; cursor: default;"
                  dense
                  no-caps
                  :ripple="false"
                >
                  {{ style.label }}
                  <!-- <q-badge floating>{{ stats[style.id].total }}</q-badge> -->
                  <!-- <q-tooltip class="bg-accent text-grey-10" anchor="center right" self="center left" v-if="style.label.length > 14">
                    {{ style.label }}
                  </q-tooltip>-->
                  <!-- </q-chip> -->
                </q-btn>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-caption">{{
                  style.desc
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
        <q-tab-panel name="mods" style="padding:0">
          <q-list v-if="movement">
            <q-item v-for="style in overrideFiltered" :key="style.id">
              <q-item-section v-if="style.style">
                <q-btn
                  :key="style.value"
                  :class="
                    (style.style.shape
                      ? style.style.shapeOverride
                        ? style.style.shape
                        : ''
                      : style.style.roundOverride
                      ? style.style.round
                        ? 'round'
                        : ''
                      : '') +
                      (style.style.underlineOverride && style.style.underline
                        ? ' text-underline'
                        : '')
                  "
                  :style="
                    'background-color:' +
                      (style.style.backgroundOverride
                        ? style.style.background
                        : 'white') +
                      '; color:' +
                      (style.style.colorOverride
                        ? style.style.color
                        : 'black') +
                      '; ' +
                      'border-color:' +
                      (style.style.outlineOverride
                        ? style.style.outline
                        : 'white') +
                      ' !important;'
                  "
                  style="border-width:3px; border-style: solid; width:100%; cursor: default;"
                  dense
                  no-caps
                  :ripple="false"
                >
                  {{
                    style.style.prepend && style.icon
                      ? "[" + style.icon + "]"
                      : ""
                  }}
                  {{ style.label }}
                  {{
                    !style.style.prepend && style.icon
                      ? "[" + style.icon + "]"
                      : ""
                  }}
                  <!-- <q-tooltip class="bg-accent text-grey-10" anchor="center right" self="center left" v-if="((style.style.prepend && style.icon ? '['+style.icon+']' : '') + (style.label ) + (!style.style.prepend && style.icon ? '['+style.icon+']' : '')).length > 14">
                    {{ style.style.prepend && style.icon ? '['+style.icon+']' : ''}} {{ style.label }} {{ !style.style.prepend && style.icon ? '['+style.icon+']' : ''}}
                  </q-tooltip>-->
                  <!-- </q-chip> -->
                </q-btn>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-caption">{{
                  style.desc
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { matKeyboardArrowRight } from "@quasar/extras/material-icons";
// import { LocalStorage } from 'quasar'
// import { mapActions } from 'vuex'

export default {
  props: {
    roleOpts: Array,
    modOpts: Array
  },
  data() {
    return {
      movId: "",
      hideNoParents: false,
      tab: "roles",
      showRefresh: true,
      edit: false,
      parentOptionsFiltered: [],
      addLoading: false,
      newMember: {
        name: "",
        role: "",
        mods: [],
        parent: "root"
      },
      dateStamp: Boolean,
      toolCabinet: true
    };
  },
  created: function() {
    this.matKeyboardArrowRight = matKeyboardArrowRight;
  },
  methods: {
    ...mapActions(["showDrawer"])
  },
  computed: {
    ...mapGetters(["show"]),
    ...mapState("movement", ["movement"]),
    baseFiltered() {
      // console.log(this.roleOpts);
      return [...this.roleOpts].sort((a, b) => {
        return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
      });
    },
    overrideFiltered() {
      // console.log(this.modOpts);
      return [...this.modOpts]
        .sort((a, b) => {
          return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
        })
        .filter(x => {
          return x !== "--No Mods--";
        });
    }
  },
  watch: {
    roleOpts: function(newVal, oldVal) {
      // console.log(newVal, oldVal);
    }
  },
  
};
</script>

<style scoped>
.not-round {
  border-radius: 3px;
}

.round {
  border-radius: 28px;
}

.round-right {
  border-radius: 3px 28px 28px 3px;
}

.round-left {
  border-radius: 28px 3px 3px 28px;
}

.round-top {
  border-radius: 28px 28px 3px 3px;
}

.round-bottom {
  border-radius: 3px 3px 28px 28px;
}
.round-diag {
  border-radius: 20px 3px 20px 3px;
}

.round-diag-2 {
  border-radius: 3px 20px 3px 20px;
}

.btn-underline {
  text-decoration: underline !important;
}
</style>
