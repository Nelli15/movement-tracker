<template>
  <span class="rounded-borders">
    <span
      v-if="elClass === 'expression'"
      @contextmenu.stop
      @touchstart.stop
      @mousedown.stop
    >
      (
      <span v-for="(el, index) in element.elements" :key="index">
        <q-select
          color="info"
          hide-dropdown-icon
          borderless
          dense
          v-if="index !== 0"
          :options="[
            { label: '+', value: 'plus' },
            { label: '-', value: 'minus' },
            { label: '*', value: 'multiply' },
            { label: '/', value: 'divide' },
          ]"
          :model-value="element.operator"
          @update:model-value="changeEl('operator', $event)"
          aria-label="operator"
          style="display: inline-block"
          class="q-px-xs"
          emit-value
          map-options
        >
          <template v-slot:selected-item="scope"
            ><span style="font-size: 1.5em">{{
              scope.opt.label
            }}</span></template
          >
        </q-select>
        <mt-calculated-node
          :elClass="el.class"
          :element="el"
          :styles="styles"
          :path="path + 'elements.' + index + '.'"
          @change="$emit('change', $event)"
          @add="$emit('add', $event)"
          @remove="$emit('remove', $event)"
        />
        <span>
          <!-- {{element.operator}} -->
          <!-- <q-popup-edit v-model="element.operator"> -->
          <!-- </q-popup-edit> -->
        </span>
      </span>
      <!-- <q-btn
        v-show="hover"
        icon="add"
        dense
        flat
        aria-label="add"
        round
        style="opacity: 0.5"
      > -->
      <q-menu context-menu>
        <q-list>
          <q-item
            clickable
            @click="addEl('condition')"
            aria-label="Add Condition"
          >
            <q-item-section>Add Condition</q-item-section>
          </q-item>
          <q-item
            clickable
            @click="addEl('expression')"
            aria-label="Add Expression"
          >
            <q-item-section>Add Expression</q-item-section>
          </q-item>
          <q-item clickable @click="addEl('number')" aria-label="Add Number">
            <q-item-section>Add Number</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
      <!-- </q-btn> -->
      )
    </span>
    <q-chip
      v-else-if="elClass === 'condition'"
      text-color="black"
      :color="
        q.dark.isActive
          ? element.gen === 'parent'
            ? 'blue-8'
            : element.gen === 'member'
            ? 'deep-orange-8'
            : element.gen === 'children'
            ? 'cyan-8'
            : ''
          : element.gen === 'parent'
          ? 'blue-2'
          : element.gen === 'member'
          ? 'deep-orange-2'
          : element.gen === 'children'
          ? 'cyan-2'
          : ''
      "
      class="q-pr-none"
    >
      <!-- <q-field outlined> -->
      <q-select
        color="info"
        hide-dropdown-icon
        borderless
        dense
        :options="filteredStyleOptions"
        aria-label="Style"
        :model-value="
          element.id
            ? stylesOb[element.id]
              ? stylesOb[element.id]
              : '--Style--'
            : '--Style--'
        "
        @update:model-value="changeEl('id', $event.id)"
        style="display: inline-block; min-width: 10px; width: auto"
        class="q-pl-xs"
        map-options
        use-input
        @filter="
          (val, update) => {
            inputSize = val.length;
            styleFilterFn(val, update);
          }
        "
        :input-style="
          'min-width:10px !important;width:' +
          (inputSize * 10 + 10) +
          'px !important;'
        "
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section dense>
              <q-item-label v-html="scope.opt.label" />
              <q-item-label caption>{{
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
      <q-btn
        icon="cancel"
        round
        dense
        flat
        size="md"
        class="q-ml-xs"
        style="color: inherit; opacity: 0.6"
        @click="removeEl()"
        aria-label="Remove Condition"
      />
    </q-chip>
    <q-chip
      v-else-if="elClass === 'number'"
      text-color="black"
      class="q-pr-none"
    >
      <!-- <q-field outlined> -->
      <q-input
        color="info"
        borderless
        dense
        aria-label="Style"
        :model-value="element.value"
        @update:model-value="
          inputSize = $event.length;
          changeEl('value', $event);
        "
        style="display: inline-block; min-width: 10px; width: auto"
        class="q-pl-xs"
        map-options
        use-input
        :input-style="
          'min-width:30px !important;width:' + inputSize * 8 + 'px !important;'
        "
      >
      </q-input>
      <q-btn
        icon="cancel"
        round
        dense
        flat
        size="md"
        class="q-ml-xs"
        style="color: inherit; opacity: 0.6"
        @click="removeEl()"
        aria-label="Remove Condition"
      />
    </q-chip>
  </span>
</template>

<script>
import { useQuasar } from 'quasar';
export default {
  name: 'mt-calculated-node',
  props: {
    elClass: String,
    element: Object,
    styles: Array,
    path: '',
  },
  emits: ['add', 'change', 'remove'],
  data() {
    return {
      filteredStyleOptions: [],
      hover: false,
      inputSize: 0,
    };
  },
  setup() {
    const q = useQuasar();
    return { q };
  },
  computed: {
    stylesOb() {
      const initialValue = {};
      return this.styles.reduce((obj, item) => {
        return {
          ...obj,
          [item.id]: item,
        };
      }, initialValue);
    },
  },
  methods: {
    addEl(type) {
      this.$emit('add', { el: this.element, type });
    },
    removeEl() {
      this.$emit('remove', this.path);
    },
    changeEl(key, val) {
      this.$emit('change', { el: this.element, key, val });
    },
    styleFilterFn(val, update) {
      if (val === '') {
        update(() => {
          this.filteredStyleOptions = this.styles;

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.filteredStyleOptions = this.styles.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
};
</script>

<style scoped>
.text-custom {
  color: #c54210;
}
</style>
