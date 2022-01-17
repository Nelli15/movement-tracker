<template>
  <q-card>
    <q-form @submit="createEvent" class="q-gutter-md">
      <q-list bordered dense class="q-pt-sm">
        <q-item
          v-for="(field, index) in fields"
          :key="index"
          :class="{ 'q-mb-md': !field.rules || field.rules.length <= 0 }"
        >
          <q-item-section>
            <q-input
              v-if="field.type === 'input'"
              :label="field.label"
              :model-value="field.value"
              @update:model-value="field.input"
              filled
              autofocus
              lazy-rules
              :rules="field.rules"
              :color="q.dark.isActive ? 'blue-2' : ''"
            />

            <q-input
              :label="field.label"
              stack-label
              filled
              v-if="field.type === 'date-time'"
              :model-value="`${field.value.getFullYear()}-${String(
                field.value.getMonth() + 1
              ).padStart(2, '0')}-${String(field.value.getDate()).padStart(
                2,
                '0'
              )}`"
              @update:model-value="field.dateInput"
              :rules="field.rules"
              :color="q.dark.isActive ? 'blue-2' : ''"
              type="date"
            >
              <!-- <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      :model-value="field.value"
                      @update:model-value="field.input"
                      mask="YYYY-MM-DD HH:mm"
                      :text-color="q.dark.isActive ? 'white' : ''"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          flat
                          :color="q.dark.isActive ? 'white' : ''"
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template> -->

              <template v-slot:append>
                <q-select
                  :model-value="`${String(field.value.getHours()).padStart(
                    2,
                    '0'
                  )}:${String(field.value.getMinutes()).padStart(2, '0')}`"
                  @update:model-value="field.timeInput"
                  :color="q.dark.isActive ? 'blue-2' : ''"
                  :options="timeOpts"
                  style="max-width: 80px; background-color: transparent"
                  hide-dropdown-icon
                  options-dense
                  borderless
                  dense
                  :display-value="`${
                    `${
                      field.value.getHours() < 10
                        ? '0' + field.value.getHours()
                        : field.value.getHours()
                    }:${
                      field.value.getMinutes() < 10
                        ? '0' + field.value.getMinutes()
                        : field.value.getMinutes()
                    }`
                      ? `${
                          field.value.getHours() < 10
                            ? '0' + field.value.getHours()
                            : field.value.getHours()
                        }:${
                          field.value.getMinutes() < 10
                            ? '0' + field.value.getMinutes()
                            : field.value.getMinutes()
                        }`
                      : ' --:--'
                  }`"
                >
                  <!-- <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          :model-value="field.value"
                          @update:model-value="field.input"
                          mask="YYYY-MM-DD HH:mm"
                          :minute-options="[0, 15, 30, 45]"
                          :second-options="[0]"
                          with-minutes
                          :text-color="q.dark.isActive ? 'white' : ''"
                          format24h
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              :text-color="q.dark.isActive ? 'white' : ''"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon> </template
                > -->
                </q-select>
              </template>
            </q-input>

            <!-- <q-input :label="field.label" v-if="field.type === 'date'"
                :model-value="field.value"
                @update:model-value="field.input">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date :model-value="field.value"
                @update:model-value="field.input" mask="YYYY-MM-DD HH:mm">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input :label="field.label" v-if="field.type === 'time'"
                :model-value="field.value"
                @update:model-value="field.input">

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time :model-value="field.value"
                @update:model-value="field.input" mask="YYYY-MM-DD HH:mm" :minute-options="[0, 15, 30, 45]" :second-options="[0]" with-minutes>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input> -->
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn
              label="Create"
              type="submit"
              class="q-my-sm full-width bg-positive"
              v-close-popup
              ref="submit"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-form>
  </q-card>
  <!-- </q-menu> -->
</template>

<script>
import { useQuasar } from "quasar";
export default {
  props: {},
  setup() {
    const q = useQuasar();

    return { q };
  },
  data() {
    return {
      newEvent: {
        name: "",
        startDate: new Date(),
        startTime: "00:00",
        endDate: new Date() + 360,
        endTime: "00:00",
      },
    };
  },
  created: function () {
    let d = new Date();
    this.newEvent = {
      name: "",
      startDate: new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        0,
        0,
        0,
        0
      ),
      endDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), 1, 0, 0, 0),
    };
  },
  methods: {
    // ...mapActions(['movement']),
    createEvent() {
      $firestore
        .collection(`/movements/${this.$route.params.movId}/events`)
        .add(this.newEvent)
        .then(() => {
          return true;
        })
        .catch((err) => console.error(err));
    },
  },
  computed: {
    fields() {
      let fields = [
        {
          type: "input",
          label: "Name",
          value: this.newEvent.name,
          input: (e) => {
            this.newEvent.name = e;
          },
          rules: [(val) => !!val || "Field is required"],
        },
        {
          type: "date-time",
          label: "Start Time",
          value: this.newEvent.startDate,
          dateInput: (e) => {
            // console.log(e);
            this.newEvent.startDate.setFullYear(parseInt(e.split("-")[0]));
            this.newEvent.startDate.setMonth(parseInt(e.split("-")[1]) - 1);
            this.newEvent.startDate.setDate(parseInt(e.split("-")[2]));
          },
          timeInput: (e) => {
            this.newEvent.startDate.setHours(parseInt(e.split(":")[0]));
            this.newEvent.startDate.setMinutes(parseInt(e.split(":")[1]));
          },
          rules: [(val) => !!val || "Field is required"],
        },
        {
          type: "date-time",
          label: "End Time",
          value: this.newEvent.endDate,
          dateInput: (e) => {
            this.newEvent.endDate.setFullYear(parseInt(e.split("-")[0]));
            this.newEvent.endDate.setMonth(parseInt(e.split("-")[1]) - 1);
            this.newEvent.endDate.setDate(parseInt(e.split("-")[2]));
          },
          timeInput: (e) => {
            this.newEvent.endDate.setHours(parseInt(e.split(":")[0]));
            this.newEvent.endDate.setMinutes(parseInt(e.split(":")[1]));
          },
        },
        {
          type: "input",
          label: "Location",
          value: this.newEvent.location,
          input: (e) => {
            this.newEvent.location = e;
          },
        },
      ];
      return fields;
    },
    timeOpts() {
      var quarterHours = ["00", "15", "30", "45"];
      var times = [];
      for (var i = 0; i < 24; i++) {
        for (var j = 0; j < 4; j++) {
          times.push((i < 10 ? "0" + i : i) + ":" + quarterHours[j]);
        }
      }
      return times;
    },
  },
  watch: {
    newEvent: {
      immediate: true,
      deep: true,
      handler() {
        // console.log(
        //   "dates",
        //   this.newEvent.startDate,
        //   this.newEvent.endDate,
        //   this.newEvent.endDate - this.newEvent.startDate
        // );
        if (this.newEvent.endDate - this.newEvent.startDate < 0) {
          this.newEvent.endDate = this.newEvent.endDate.setHours(
            this.newEvent.startDate.getHours() + 1
          );
        }
      },
    },
  },
};
</script>
