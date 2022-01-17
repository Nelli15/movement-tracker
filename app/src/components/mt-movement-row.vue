<template>
  <q-tr
    :props="props"
    :style="
      'background-color: ' +
      backgroundColor +
      ';color: ' +
      color +
      ';cursor:pointer;'
    "
    @click.stop="$router.push('/movement/' + movementProp.id)"
  >
    <q-td key="name" :props="props" class="text-bold">{{
      movementProp.name
    }}</q-td>
    <q-td key="role" :props="props">{{ movementProp.role }}</q-td>
    <q-td key="last_modified" :props="props">{{
      getLastModified(movementProp.last_modified)
    }}</q-td>
    <mt-movement-context-menu
      :movementProp="movementProp"
      :permissions="movementProp.permissions"
    />
  </q-tr>
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
// import { $firestore } from "./../data/firebase.js";

import { color, backgroundColor } from "./../scripts/movement.js";
import { defineAsyncComponent } from "vue";
export default {
  props: {
    movementProp: {},
    props: {},
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    ...mapMutations("movements", ["setHidden"]),
    ...mapActions("movement", ["fetchMovement"]),
    getLastModified(timestamp) {
      var date = timestamp.toDate();
      return `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} ${date.getHours()}:${(
        "00" + date.getMinutes()
      ).slice(-2)}`;
    },
  },
  computed: {
    ...mapState("movements", ["movements"]),
    last_modified() {
      // console.log(this.movement.last_modified)
      if (this.movementProp.last_modified) {
        var date = new Date(this.movementProp.last_modified.toDate());
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      }
      return "";
    },
    color() {
      // return '#000'
      return color(this.movementProp);
    },
    backgroundColor() {
      // return '#FFF'
      // console.log(movementJS)
      return backgroundColor(this.movementProp);
    },
  },
  components: {
    "mt-movement-context-menu": defineAsyncComponent(() =>
      import("./../components/actions/mt-movement-context-menu")
    ),
  },
};
</script>
