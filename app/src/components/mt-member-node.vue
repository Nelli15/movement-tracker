<template>
  <div
    :data-cy="'member-' + l_member.id"
    :data-cy-parent="node.parent"
    :class="l_member.display ? l_member.display.shape : ''"
  >
    <!-- {{ l_member.display }} -->
    <q-btn
      v-if="l_member.display"
      :class="
        (l_member.display.underline ? 'text-underline ' : '') +
        l_member.display.shape +
        (q.dark.isActive && shadow ? ' dimmed ' : '') +
        (!q.dark.isActive && shadow ? ' light-dimmed ' : '') +
        (highlight.current &&
        (highlight.current === l_member.role ||
          (l_member.mods && l_member.mods.includes(highlight.current)))
          ? ' highlight'
          : '')
      "
      :style="
        'background-color:' +
        l_member.display.background +
        '; color:' +
        l_member.display.color +
        '; ' +
        'font-size:' +
        size +
        '%;border-color:' +
        l_member.display.outline +
        ' !important; border-width: ' +
        (l_member.display.background === l_member.display.outline ? '0' : '3') +
        'px;'
      "
      style="border-style: solid; z-index: 10"
      :key="node.subTree + '-' + node.parent + '-' + l_member.name"
      no-caps
      @click.stop
      @contextmenu.stop
      @touchstart.stop
      @mousedown.stop
    >
      <q-tooltip
        v-if="l_member.notes > ''"
        max-width="200px"
        class="bg-blue-grey-2 text-black"
        >{{ l_member.notes }}</q-tooltip
      >
      <!-- Left Click Menu -->
      <q-menu>
        <mt-member-view-menu :l_member="l_member" />
      </q-menu>
      <!-- Right Click Menu-->
      <mt-member-context-menu
        :member="member"
        @selected="addToSelected"
        v-if="!readOnly"
        :deleteable="deleteable"
        :treeOpt="treeOpt"
        :node="node"
        :shadow="shadow"
        @changeTree="$emit('changeTree', $event)"
      />
      <q-icon name="person" class="print-hide q-mr-sm" />
      {{ l_member.display ? l_member.display.label : l_member.name }}
    </q-btn>
    <q-skeleton type="QBtn" v-if="!l_member.display" />
    <!-- </Draggable>
  </Container> -->
  </div>
</template>

<script>
import { defineAsyncComponent, ref, computed, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';

export default {
  name: 'mt-member-node',
  props: {
    deleteable: Boolean,
    member: {},
    readOnly: Boolean,
    shadow: Boolean,
    treeOpt: {},
    node: {},
  },
  setup(props, { emit }) {
    const q = useQuasar();
    const store = useStore();
    const l_member = ref({});
    const highlight = computed(() => {
      return store.state.general.highlight;
    });
    // console.log(store.state);
    const size = computed(() => {
      // console.log(store.state);
      return store.state.general.size;
    });
    const permissions = computed(() => {
      return store.state.movement.permissions;
    });
    watch(
      () => props.member,
      (newVal, oldVal) => {
        l_member.value = { ...newVal };
      },
      { immediate: true }
    );
    watch(
      () => props.node.children,
      () => {
        emit('childrenChanged', props.node.key);
      },
      { immediate: true }
    );

    function addToSelected() {
      emit('selected', props.node.key);
    }
    return {
      q,
      l_member,
      addToSelected,
      highlight,
      size,
      permissions,
    };
  },

  components: {
    'mt-member-view-menu': defineAsyncComponent(() =>
      import('./../components/actions/mt-member-view-menu.vue')
    ),
    'mt-member-context-menu': defineAsyncComponent(() =>
      import('./../components/actions/mt-member-context-menu.vue')
    ),
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

.shadow--dark {
  box-shadow: 0 2px 4px -1px rgba(255, 255, 255, 0.2),
    0 4px 5px rgba(255, 255, 255, 0.14), 0 1px 10px rgba(255, 255, 255, 0.12);
  /*0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px rgba(0,0,0,0.14), 0 1px 10px rgba(0,0,0,0.12);*/
}

.shadow-member {
  opacity: 0.7 !important;
}
</style>
