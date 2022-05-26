<template>
  <div>
    <q-drawer
      side="right"
      v-model="show.movementDetails"
      bordered
      :width="300"
      :breakpoint="1"
      data-cy="movement-summary-comp"
    >
      <q-btn
        v-show="show.movementDetails"
        round
        color="primary"
        icon="keyboard_arrow_right"
        fab-mini
        class="absolute"
        style="top: 50%; left: -30px; z-index: 10"
        @click="showDrawer('movementDetails')"
        aria-label="Show Movement Details"
      />
      <!-- <div class="row"> -->
      <q-scroll-area style="height: 99%; max-width: 100%">
        <q-list dense>
          <StatSummary
            :showIf="highlight.current === 'treeTotal'"
            :stat="{ ...totalStats.treeTotal, id: 'treeTotal' }"
            :treeOpt="treeOpt"
          >
            <q-item v-if="totalStats" dense>
              <q-item-section v-if="totalStats.treeTotal">
                <q-btn
                  class="shadow-2 q-pl-sm q-mt-sm"
                  :class="{
                    highlight: highlight.current === 'treeTotal',
                  }"
                  style="
                    background-color: white;
                    color: black;
                    border-style: solid;
                    width: 100%;
                  "
                  no-caps
                  dense
                  align="left"
                  @click="fetchHighlighted('treeTotal')"
                >
                  Total
                  <q-badge floating>{{ totalStats.treeTotal.total }}</q-badge>
                  <q-tooltip
                    class="bg-accent text-grey-10"
                    anchor="center right"
                    self="center left"
                    >Number of members on the Tree</q-tooltip
                  >
                </q-btn>
              </q-item-section>
            </q-item>
          </StatSummary>
          <q-item-label
            header
            v-if="movement && rolesFiltered.length > 0"
            class="text-subtitle1"
            :class="q.dark.isActive ? 'text-white' : 'text-black'"
            style="padding-bottom: 0px"
          >
            Roles
          </q-item-label>
          <div v-for="stat in rolesFiltered" :key="stat.name">
            <StatSummary
              :showIf="highlight.current === stat.id"
              :stat="stat"
              :treeOpt="treeOpt"
            >
              <q-item>
                <q-item-section v-if="stat.label">
                  <div>
                    <q-btn
                      v-if="stat.style"
                      class="shadow-2 q-pl-sm"
                      :class="{
                        'text-underline': stat.style.underline,
                        [getShape(stat.style.shape, stat.style.round)]: true,
                        highlight: highlight.current === stat.id,
                      }"
                      :style="
                        'background-color:' +
                        stat.style.background +
                        '; color:' +
                        stat.style.color +
                        '; border-color:' +
                        stat.style.outline +
                        ' !important;' +
                        (stat.style.background !== stat.style.outline
                          ? 'border-width:3px !important;'
                          : 'border-width:0px !important;')
                      "
                      style="border-style: solid; width: 100%"
                      no-caps
                      dense
                      align="left"
                      @click="fetchHighlighted(stat.id)"
                    >
                      {{ stat.label }}
                      <q-badge floating>{{
                        stat.total ? stat.total : 0
                      }}</q-badge>
                      <q-tooltip
                        class="bg-accent text-grey-10"
                        anchor="center right"
                        self="center left"
                        v-if="stat.desc > ''"
                        >{{ stat.desc }}</q-tooltip
                      >
                    </q-btn>
                    <q-btn
                      v-else-if="roles[stat.id]"
                      class="shadow-2 q-pl-sm"
                      :class="
                        roles[stat.id].style.underline
                          ? 'text-underline '
                          : '' +
                            getShape(
                              roles[stat.id].style.shape,
                              roles[stat.id].style.round
                            )
                      "
                      :style="
                        'background-color:' +
                        roles[stat.id].style.background +
                        ';color:' +
                        roles[stat.id].style.color +
                        ';border-color:' +
                        roles[stat.id].style.outline +
                        ' !important;' +
                        (roles[stat.id].style.outline !==
                        roles[stat.id].style.background
                          ? 'border-width:3px;'
                          : 'border-width:0px;')
                      "
                      style="border-style: solid; width: 100%"
                      no-caps
                      dense
                      align="left"
                      @click="fetchHighlighted(stat.id)"
                    >
                      {{ stat.label }}
                      <q-badge floating>{{
                        stat.total ? stat.total : 0
                      }}</q-badge>
                      <q-tooltip
                        class="bg-accent text-grey-10"
                        anchor="center right"
                        self="center left"
                        v-if="stat.desc > ''"
                        >{{ stat.desc }}</q-tooltip
                      >
                    </q-btn>
                  </div>
                  <!-- </q-btn> -->
                </q-item-section>
              </q-item>
            </StatSummary>
          </div>
          <q-item-label
            header
            v-if="movement && overrideFiltered.length > 0"
            class="text-subtitle1"
            :class="q.dark.isActive ? 'text-white' : 'text-black'"
            style="padding-bottom: 0px"
            >Modifiers</q-item-label
          >
          <div v-for="stat in overrideFiltered" :key="stat.name">
            <StatSummary
              :showIf="highlight.current === stat.id"
              :stat="stat"
              :treeOpt="treeOpt"
            >
              <q-item>
                <q-item-section v-if="stat.label">
                  <!-- {{stat.id}} {{ mods[stat.id] }} -->
                  <div>
                    <q-btn
                      v-if="stat.style"
                      class="shadow-2 q-pl-sm"
                      :class="{
                        'text-underline':
                          stat.style.underlineOverride && stat.style.underline,
                        [getModShape(stat.style)]: true,
                        highlight: highlight.current === stat.id,
                      }"
                      :style="
                        getModColors(stat.style) +
                        (stat.style.outlineOverride &&
                        stat.style.outline !== stat.style.background
                          ? 'border-width:3px;'
                          : 'border-width:0px;')
                      "
                      style="width: 100%; border-style: solid"
                      no-caps
                      dense
                      align="left"
                      @click="fetchHighlighted(stat.id)"
                    >
                      {{ stat.label }}
                      <q-badge floating>{{
                        stat.total ? stat.total : 0
                      }}</q-badge>
                      <q-tooltip
                        class="bg-accent text-grey-10"
                        anchor="center right"
                        self="center left"
                        v-if="stat.desc > ''"
                        >{{ stat.desc }}</q-tooltip
                      >
                    </q-btn>
                    <q-btn
                      v-else-if="mods[stat.id]"
                      class="shadow-2 q-pl-sm"
                      :class="
                        getModShape(mods[stat.id].style) +
                        (mods[stat.id].style.underlineOverride &&
                        mods[stat.id].style.underline
                          ? ' text-underline'
                          : '') +
                        (highlight.current === stat.id ? ' highlight' : '') +
                        (mods[stat.id].style.outlineOverride &&
                        mods[stat.id].style.outline !==
                          mods[stat.id].style.background
                          ? 'border-width:3px;'
                          : 'border-width:0px;')
                      "
                      :style="getModColors(mods[stat.id].style)"
                      style="
                        width: 100%;
                        border-width: 3px;
                        border-style: solid;
                      "
                      no-caps
                      dense
                      align="left"
                      @click="fetchHighlighted(stat.id)"
                    >
                      {{ stat.label }}
                      <q-badge floating>{{
                        stat.total ? stat.total : 0
                      }}</q-badge>
                      <q-tooltip
                        class="bg-accent text-grey-10"
                        anchor="center right"
                        self="center left"
                        v-if="stat.desc > ''"
                        >{{ stat.desc }}</q-tooltip
                      >
                    </q-btn>
                  </div>
                  <!-- </q-btn> -->
                </q-item-section>
              </q-item>
            </StatSummary>
          </div>
          <q-item-label
            header
            v-if="movement && calcFiltered.length > 0"
            class="text-subtitle1"
            :class="q.dark.isActive ? 'text-white' : 'text-black'"
            style="padding-bottom: 0px"
            >Complex Statistics</q-item-label
          >
          <div v-for="stat in calcFiltered" :key="stat.name">
            <StatSummary
              :showIf="highlight.current === stat.id"
              :stat="stat"
              :treeOpt="treeOpt"
            >
              <q-item>
                <q-item-section v-if="stat.label">
                  <!-- {{stat.id}} {{ mods[stat.id] }} -->
                  <!-- <div :class="highlight.current === stat.id ? ' highlight' : ''"> -->
                  <q-btn
                    class="shadow-2 q-pl-sm"
                    :class="{ highlight: highlight.current === stat.id }"
                    no-caps
                    square
                    style="width: 100%; background-color: white; color: black"
                    dense
                    align="left"
                    @click="fetchHighlighted(stat.id)"
                  >
                    <!-- @click="fetchHighlighted(stat.id)" -->
                    {{ stat.label }}
                    <q-badge floating>{{
                      stat.total ? stat.total : 0
                    }}</q-badge>
                    <q-tooltip
                      class="bg-accent text-grey-10"
                      anchor="center right"
                      self="center left"
                      v-if="stat.desc > ''"
                      >{{ stat.desc }}</q-tooltip
                    >
                  </q-btn>
                  <!-- </div> -->
                  <!-- </q-btn> -->
                </q-item-section>
              </q-item>
            </StatSummary>
          </div>
          <q-item-label
            header
            v-if="movement && calculatedFiltered.length > 0"
            class="text-subtitle1"
            :class="q.dark.isActive ? 'text-white' : 'text-black'"
            style="padding-bottom: 0px"
            >Calculated Statistics</q-item-label
          >
          <div v-for="stat in calculatedFiltered" :key="stat.name">
            <StatSummary
              :showIf="highlight.current === stat.id"
              :stat="stat"
              :treeOpt="treeOpt"
              style="width: calc(100%-36px)"
            >
              <q-item>
                <q-item-section v-if="stat.label">
                  <q-btn
                    class="shadow-2 q-pl-sm"
                    :class="{ highlight: highlight.current === stat.id }"
                    no-caps
                    square
                    style="width: 100%; background-color: white; color: black"
                    dense
                    align="left"
                    @click="fetchHighlighted(stat.id)"
                  >
                    {{ stat.label }}
                    <q-badge floating
                      >{{ (stat.total ? stat.total : 0).toFixed(2)
                      }}{{ stat.unit ? stat.unit : '' }}</q-badge
                    >
                    <q-tooltip
                      class="bg-accent text-grey-10"
                      anchor="center right"
                      self="center left"
                      v-if="stat.desc > ''"
                      >{{ stat.desc }}</q-tooltip
                    >
                  </q-btn>
                  <!-- </q-btn> -->
                </q-item-section>
              </q-item>
            </StatSummary>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';

export default {
  props: {
    roleStats: {},
    modStats: {},
    totalStats: {},
    roles: {},
    mods: {},
    complexStats: {},
    calcStats: {},
    treeOpt: {},
  },
  setup(props) {
    const q = useQuasar();
    const store = useStore();
    function fetchHighlighted(val) {
      return store.dispatch('fetchHighlighted', val);
    }
    function showDrawer(val) {
      return store.dispatch('showDrawer', val);
    }
    function getShape(shape, round) {
      if (shape) {
        return shape;
      } else if (round === true) {
        return 'round';
      } else {
        return 'not-round';
      }
    }
    function getModShape(style) {
      if (style.shape && style.shapeOverride === true) {
        return true;
      } else if (style.roundOverride === true && style.round === true) {
        return 'round';
      } else {
        return 'not-round';
      }
    }
    function getModColors(style) {
      // 'background-color:'+mods[stat.id].style.backgroundOverride ? mods[stat.id].style.background : 'white'+'; color:'+mods[stat.id].style.colorOverride ? mods[stat.id].style.color : 'black'+';border-color:'+mods[stat.id].style.outlineOverride ? mods[stat.id].style.outline : 'white'+' !important;'
      let styleText = 'background-color:';
      if (style.backgroundOverride) {
        styleText += style.background;
      } else {
        styleText += 'white';
      }
      styleText += '; color:';
      if (style.colorOverride) {
        styleText += style.color;
      } else {
        styleText += 'black';
      }
      styleText += ';border-color:';
      if (style.outlineOverride) {
        styleText += style.outline;
      } else {
        styleText += 'white';
      }
      styleText += ' !important;';
      return styleText;
    }
    const movement = computed(() => store.state.movement.movement);
    const highlight = computed(() => store.getters['highlight']);
    const show = computed(() => store.getters['show']);
    const rolesFiltered = computed(() => {
      if (!props.roleStats) return [];
      // let stats = { ...roleStats };

      return Object.keys(props.roleStats)
        .map((i) => {
          // console.log(stats[i].style);
          // if (!stats[i].style) {
          //   stats[i].style = {
          //     background: getBackground(stat),
          //     color: getColor(stat),
          //     outlined: getOutline(stat),
          //     round: getShape(stat),
          //     underline: getUnderline(stat)
          //   };
          // }
          return props.roleStats[i];
        })
        .sort((a, b) => {
          return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
        });
    });
    const overrideFiltered = computed(() => {
      if (!props.modStats) return [];
      return Object.keys(props.modStats)
        .map((i) => props.modStats[i])
        .sort((a, b) => {
          return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
        });
    });
    const calcFiltered = computed(() => {
      if (!props.complexStats) return [];
      return Object.keys(props.complexStats)
        .map((i) => props.complexStats[i])
        .sort((a, b) => {
          return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
        });
    });
    const calculatedFiltered = computed(() => {
      if (!props.calcStats) return [];
      return Object.keys(props.calcStats)
        .map((i) => props.calcStats[i])
        .sort((a, b) => {
          return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
        });
    });
    return {
      q,
      movement,
      highlight,
      showDrawer,
      fetchHighlighted,
      show,
      calculatedFiltered,
      calcFiltered,
      overrideFiltered,
      rolesFiltered,
      getShape,
      getModShape,
      getModColors,
    };
  },
  components: {
    StatSummary: defineAsyncComponent(() => import('./StatSummary.vue')),
  },
};
</script>

<style scoped>
.not-round {
  border-radius: 3px !important;
}

.round {
  border-radius: 28px !important;
}

.round-right {
  border-radius: 3px 28px 28px 3px !important;
}

.round-left {
  border-radius: 28px 3px 3px 28px !important;
}

.round-top {
  border-radius: 28px 28px 3px 3px !important;
}

.round-bottom {
  border-radius: 3px 3px 28px 28px !important;
}
.round-diag {
  border-radius: 20px 3px 20px 3px !important;
}

.round-diag-2 {
  border-radius: 3px 20px 3px 20px !important;
}

.btn-underline {
  text-decoration: underline !important;
}

.highlight::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 5px;
  background: linear-gradient(
    45deg,
    #b827fc 0%,
    #2c90fc 25%,
    #b8fd33 50%,
    #fec837 75%,
    #fd1892 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
</style>
