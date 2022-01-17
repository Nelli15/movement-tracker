<template>
  <q-card>
    <q-form @submit="createTree">
      <q-list dense padding bordered>
        <q-item> <q-input label="Tree Label" v-model="newTree.label" /> </q-item
      ></q-list>
    </q-form>
  </q-card>
</template>

<script>
import { mapState } from "vuex";
import { Notify } from "quasar";
import { getFirestore, addDoc, collection } from "@firebase/firestore";

export default {
  name: "CreateTree",
  data() {
    return {
      newTree: {
        label: "",
      },
    };
  },
  methods: {
    createTree(e) {
      addDoc(
        collection(getFirestore(), `/movements/${this.movement.id}/trees`),
        this.newTree
      )
        .then((res) => {
          return Notify.create({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Tree Created",
          });
        })
        .catch((err) => {
          console.error(err);
          Notify.create({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!",
          });
        });
    },
  },
  computed: {
    ...mapState("movement", ["movement"]),
  },
};
</script>
