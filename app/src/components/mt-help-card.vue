<template>
  <div>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      style="z-index: 100"
      class="print-hide"
    >
      <q-btn fab icon="help" color="info" aria-label="Help" @click="getTopics">
        <q-tooltip class="bg-accent text-grey-10"> Help </q-tooltip>
        <q-menu v-close-popup>
          <q-tabs
            v-model="tab"
            inline-label
            class="bg-primary text-white shadow-2"
            style="min-width: 300px"
          >
            <q-tab name="answers" icon="answers" label="Answers">
              <!-- <q-badge color="red" floating>Coming Soon</q-badge> -->
            </q-tab>
            <q-tab name="ask" icon="ask" label="Ask" />
          </q-tabs>
          <q-tab-panels v-model="tab" animated class="shadow-2 rounded-borders">
            <q-tab-panel name="ask" style="padding: 0px">
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
                  />
                  <q-input
                    label="How can we help?"
                    stack-label
                    auto-grow
                    input-style=""
                    outlined
                    type="textarea"
                    v-model="message.body"
                    :rules="[(val) => (val && val.length > 0) || 'Required!']"
                  />
                  <q-btn
                    label="Send a Message"
                    icon="send"
                    style="width: 95%"
                    type="submit"
                    :disabled="submitLoading"
                    aria-label="Send a Message"
                  />
                </q-form>
              </q-card>
              <q-card
                style="min-width: 300px; min-height: 300px"
                class=""
                v-if="submitSuccess"
                no-scroll
              >
                <q-card-section style="min-height: 120px"> </q-card-section>
                <q-card-section class="text-h5 text-center">
                  Congratulations!
                </q-card-section>
                <q-card-section>
                  Your message was sent, we will email you shortly.
                </q-card-section>
              </q-card>
            </q-tab-panel>
            <q-tab-panel name="answers" style="padding: 0px">
              <!-- <q-list style="min-width:330px;min-height:300px" separator> -->
              <!-- Movements -->
              <q-card
                v-for="topic in topics"
                :key="topic.title"
                class="q-pa-xs"
                style="border-color: black"
              >
                <q-card-section class="bg-primary text-white">
                  <div class="text-h6">{{ topic.title }}</div>
                </q-card-section>
                <q-separator />
                <q-card-section v-html="topic.body"> </q-card-section>
              </q-card>
              <!-- </q-list> -->
            </q-tab-panel>
          </q-tab-panels>
          <q-inner-loading :showing="submitLoading">
            <q-spinner size="50px" color="primary" />
          </q-inner-loading>
        </q-menu>
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
import { Notify } from "quasar";
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
      tab: "ask",
      topics: {},
    };
  },
  created() {
    this.Notify = Notify;
  },
  methods: {
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
            icon: "cloud_download",
            message: "Message Sent",
          });
          return true;
        })
        .catch((err) => {
          console.error("Oops, something went wrong: " + err);
          this.Notify.create({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!",
          });
        });
    },
    getTopics() {
      $firestore
        .collection("help")
        .get()
        .then((snap) => {
          return snap.forEach((doc) => {
            this.topics[doc.id] = doc.data();
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
