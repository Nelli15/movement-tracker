<template>
  <div data-cy="help-fab">
    <q-page-sticky
      position="bottom-right"
      :offset="fabPos"
      style="z-index: 100"
      class="print-hide"
    >
      <q-btn
        fab
        :icon="matHelp"
        color="info"
        aria-label="Help"
        @click="getTopics"
        :disable="draggingFab"
        v-touch-pan.prevent.mouse="moveFab"
      >
        <q-tooltip class="bg-accent text-grey-10">Help</q-tooltip>
        <q-menu
          v-close-popup
          max-height="80vh"
          max-width="300px"
          style="overflow: hidden"
        >
          <q-card style="max-width: 300px; height: 79vh; overflow: hidden">
            <q-tabs
              v-model="tab"
              inline-label
              class="bg-primary text-white shadow-2"
              style="overflow: hidden"
              align="justify"
              :breakpoint="0"
            >
              <q-tab name="answers" label="Answers" />
              <q-tab name="ask" label="Ask" />
            </q-tabs>
            <q-tab-panels v-model="tab" animated class="rounded-borders">
              <q-tab-panel
                name="ask"
                style="padding: 0px; width: 300px; overflow: hidden"
              >
                <q-card
                  style="min-width: 300px"
                  class="q-pa-md"
                  v-if="!submitSuccess"
                >
                  <q-form @submit="onSubmit" class="q-gutter-xs">
                    <q-input
                      label="Subject"
                      stack-label
                      outlined
                      v-model="message.subject"
                      :rules="[(val) => (val && val.length > 0) || 'Required!']"
                      :color="Dark.isActive ? 'blue-2' : ''"
                    />
                    <q-input
                      label="How can we help?"
                      stack-label
                      auto-grow
                      input-style
                      outlined
                      type="textarea"
                      v-model="message.body"
                      :rules="[(val) => (val && val.length > 0) || 'Required!']"
                      :color="Dark.isActive ? 'blue-2' : ''"
                    />
                    <q-btn
                      label="Send a Message"
                      :icon="matSend"
                      style="width: 95%"
                      type="submit"
                      :disabled="submitLoading"
                      aria-label="Send a Message"
                    />
                  </q-form>
                </q-card>
                <q-card
                  style="min-width: 300px; min-height: 300px"
                  class
                  v-if="submitSuccess"
                >
                  <q-card-section style="min-height: 120px"></q-card-section>
                  <q-card-section class="text-h5 text-center"
                    >Congratulations!</q-card-section
                  >
                  <q-card-section
                    >Your message was sent, we will email you
                    shortly.</q-card-section
                  >
                </q-card>
                <q-inner-loading :showing="submitLoading">
                  <q-spinner size="50px" color="primary" />
                </q-inner-loading>
              </q-tab-panel>
              <q-tab-panel
                name="answers"
                style="padding: 0px; width: 300px; overflow: hidden"
                class
              >
                <!-- <q-list style="min-width:330px;min-height:300px" separator> -->
                <!-- Movements -->
                <q-input
                  v-model="searchQuery"
                  outlined
                  class="q-pt-sm q-px-sm"
                  label="Search"
                  :color="Dark.isActive ? 'blue-2' : ''"
                >
                  <template v-slot:append>
                    <q-icon
                      v-if="searchQuery !== ''"
                      :name="matClose"
                      @click="searchQuery = ''"
                      class="cursor-pointer"
                    />
                    <q-icon :name="matSearch" />
                  </template>
                </q-input>
                <q-scroll-area style="width: 300px; height: 70vh" class="col">
                  <q-card
                    v-for="topic in topicsFiltered"
                    :key="topic.title"
                    style="border: black 1px solid"
                    class="q-ma-sm"
                  >
                    <q-card-section class="text-bold" dense>{{
                      topic.title
                    }}</q-card-section>
                    <q-separator />
                    <q-expansion-item
                      expand-separator
                      switch-toggle-side
                      :expand-icon="matArrowDropDown"
                    >
                      <q-card>
                        <q-card-section
                          v-html="para"
                          v-for="(para, index) in topic.body"
                          :key="topic.title + 'para' + index"
                        ></q-card-section>
                      </q-card>
                      <template slot="header">
                        <div class="q-gutter-xs">
                          <q-badge
                            color="positive"
                            v-for="permission in topic.permission"
                            :key="'permission-' + topic.title + permission"
                          >
                            <q-icon :name="matPeople" />
                            {{ permission }}
                          </q-badge>
                        </div>
                      </template>
                    </q-expansion-item>
                  </q-card>
                </q-scroll-area>
                <!-- </q-list> -->
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </q-menu>
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
// const { $functions, $firestore, getAnalytics() } = require("./../data/firebase.js");
import {
  matPeople,
  matSearch,
  matClose,
  matCloudDownload,
  matError,
  matSend,
  matHelp,
  matArrowDropDown,
} from "@quasar/extras/material-icons";
import { Dark, Notify } from "quasar";
export default {
  // name: 'ComponentName',
  data() {
    return {
      message: {
        subject: "",
        body: "",
      },
      submitLoading: false,
      submitSuccess: false,
      tab: "answers",
      topics: {},
      searchQuery: "",
      fabPos: [18, 18],
      draggingFab: false,
    };
  },
  created() {
    this.Dark = Dark;
    this.Notify = Notify;
    this.matPeople = matPeople;
    this.matSearch = matSearch;
    this.matSend = matSend;
    this.matClose = matClose;
    this.matCloudDownload = matCloudDownload;
    this.matError = matError;
    this.matHelp = matHelp;
    this.matArrowDropDown = matArrowDropDown;
  },
  methods: {
    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true;

      this.fabPos = [this.fabPos[0] - ev.delta.x, this.fabPos[1] - ev.delta.y];
    },
    onSubmit(event) {
      // console.log('on Submit')
      this.submitLoading = true;
      var sendEmail = httpsCallable(getFunctions(), "sendEmail");
      this.message.email = this.user.email;
      this.message.name = this.user.displayName;
      // console.log(this.message)
      sendEmail(this.message)
        .then((res) => {
          // console.log(res)
          this.message.subject = "";
          this.message.body = "";
          this.submitLoading = false;
          this.submitSuccess = true;
          this.Notify.create({
            color: "positive",
            textColor: "white",
            icon: this.matCloudDownload,
            message: "Message Sent",
          });
          return true;
        })
        .catch((err) => {
          if (process.env.DEV)
            logEvent(getAnalytics(), "exception", {
              description: err,
              fatal: false,
            });
          console.error(new Error("Oops, something went wrong: " + err));
          this.Notify.create({
            color: "negative",
            textColor: "white",
            icon: this.matError,
            message: "Oops, Something went wrong!",
          });
        });
    },
    getTopics() {
      onSnapshot(
        query(collection("help"), where("published", "==", true)),
        (snap) => {
          return snap.forEach((doc) => {
            this.$set(this.topics, doc.id, doc.data());
          });
        }
      );
    },
  },
  computed: {
    topicsFiltered() {
      const words = this.searchQuery
        .toLowerCase()
        .split(" ")
        .filter((i) => {
          return i !== "";
        });
      // console.log(words)
      if (words.length === 1 && words[0] !== "") {
        return Object.keys(this.topics)
          .map((i) => this.topics[i])
          .filter(function (topic) {
            for (const i in words) {
              const word = words[i];
              // console.log(word, JSON.stringify(topic).toLowerCase())
              if (JSON.stringify(topic).toLowerCase().indexOf(word) === -1) {
                // console.log(JSON.stringify(topic).toLowerCase().indexOf(word))
                return false;
              }
            }
            return true;
          });
      } else {
        return this.topics;
      }
    },
  },
};
</script>
