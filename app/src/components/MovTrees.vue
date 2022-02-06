<template>
  <div>
    <mt-batch
      :membersSelected="membersSelected"
      v-if="membersSelected.length > 0"
      @clearMembers="membersSelected = []"
      class="print-hide"
      :treeOpt="treeOpt"
    />
    <div class="row">
      <q-tree
        v-for="member in tree"
        :key="member.subTree + '-' + member.parent + '-' + member.id"
        :ref="
          (el) => {
            if (el)
              memberNodes[
                member.subTree + '-' + member.parent + '-' + member.id
              ] = el;
          }
        "
        :nodes="[member]"
        node-key="key"
        label-key="display.label"
        default-expand-all
        :tick-strategy="
          permissions.members_edit && membersSelected.length > 0
            ? 'strict'
            : 'none'
        "
        v-model:ticked="membersSelected"
        :filter="filterQuery"
        :filter-method="treeFilterMethod"
        no-results-label=" "
        icon="play_arrow"
      >
        <template v-slot:default-header="prop">
          <mt-member-node
            :member="members[prop.node.id]"
            :deleteable="prop.node.children.length <= 0"
            :shadow="prop.node.type === 'shadow'"
            @selected="addToSelected"
            class="draggable-item"
            @contextmenu.stop
            :treeOpt="treeOpt"
            :node="prop.node"
            @changeTree="$emit('changeTree', $event)"
            :readOnly="readOnly"
            @childrenChanged="
              expandNode(
                member.subTree + '-' + member.parent + '-' + member.id,
                $event
              )
            "
          />
        </template>
      </q-tree>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { defineAsyncComponent, ref, computed, onBeforeUpdate } from 'vue';
export default {
  name: 'MovTrees',
  props: ['treeOpt', 'readOnly', 'members', 'tree', 'storeModule'],
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const storeModule = ref(props.storeModule ? props.storeModule : 'movement');
    const membersSelected = ref([]);
    const memberNodes = ref({});
    function expandNode(ref, e) {
      if (memberNodes.value[ref]) {
        memberNodes.value[ref].setExpanded(e, true);
      }
    }
    function addToSelected(id) {
      if (membersSelected.value.indexOf(id) === -1) {
        membersSelected.value.push(id);
      }
    }
    function treeFilterMethod(node, terms) {
      let row = props.members[node.id];
      row.id = node.id;

      const lowerTerms = terms ? terms.toLowerCase() : '';
      if (row.id === 'root') return false;
      else if (row.name.toLowerCase().indexOf(lowerTerms) !== -1) {
        return true;
      } else if (
        roles.value[row.role]
          ? roles.value[row.role].label.toLowerCase().indexOf(lowerTerms) !== -1
          : false
      ) {
        return true;
      } else if (
        row.mods.some((style) =>
          mods.value[style]
            ? mods.value[style].label.toLowerCase().indexOf(lowerTerms) !== -1
            : false
        )
      ) {
        return true;
      }
      return false;
    }
    const permissions = computed(() => store.state.movement.permissions);
    const filterQuery = computed(
      () => store.state[storeModule.value].filterQuery
    );
    const roles = computed(() =>
      route.params.snapId
        ? store.state.snapshot.roles
        : store.state.movement.roles
    );
    const mods = computed(() =>
      route.params.snapId
        ? store.state.snapshot.mods
        : store.state.movement.mods
    );
    onBeforeUpdate(() => {
      memberNodes.value = [];
    });
    return {
      membersSelected,
      permissions,
      filterQuery,
      treeFilterMethod,
      addToSelected,
      expandNode,
      memberNodes,
    };
  },
  components: {
    'mt-member-node': defineAsyncComponent(() =>
      import('./mt-member-node.vue')
    ),
    'mt-add-member': defineAsyncComponent(() =>
      import('./actions/mt-add-member.vue')
    ),
    'mt-batch': defineAsyncComponent(() => import('./mt-batch.vue')),
  },
};
</script>
