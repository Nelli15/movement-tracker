<template>
  <div style="width: 100%">
    <q-bar>
      <q-btn
        :label="viewOpts.find((x) => x.value === calendarView).label"
        no-caps
        flat
      >
        <q-menu>
          <q-list>
            <q-item
              v-for="opt in viewOpts"
              :key="opt.value"
              @click="calendarView = opt.value"
              clickable
              v-close-popup
            >
              <q-item-section v-if="opt.icon" avatar
                ><q-icon :name="opt.icon"
              /></q-item-section>
              <q-item-section>{{ opt.label }}</q-item-section>
            </q-item>
          </q-list>
          <q-separator />
          <q-list>
            <q-item
              v-for="(opt, index) in viewGlobalOpts"
              :key="index"
              @click="opt.click"
              clickable
              v-close-popup
            >
              <q-item-section v-if="opt.icon" avatar :key="opt.visible"
                ><q-icon :name="opt.icon" /> </q-item-section
              ><q-item-section>{{ opt.label }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-space />
      <div>
        {{ months[new Date(selectedDate).getMonth()] }}
        {{ new Date(selectedDate).getFullYear() }}
      </div>
      <q-space />
      <q-btn icon="chevron_left" @click="calendarPrev" flat />
      <q-btn icon="chevron_right" @click="calendarNext" flat />
    </q-bar>
    <q-calendar
      ref="calendar"
      v-model="selectedDate"
      :view="calendarView"
      :locale="locale"
      style="height: 80vh"
      :dark="Dark.isActive"
      class="calendar-container"
      :weekdays="weekdays"
    >
      <template #day-body="day">
        <template v-if="calendarView.indexOf('agenda') < 0">
          <!-- Used to render events in the day and week views -->
          <template
            v-for="(event, index) in eventsMap[day.timestamp.date]"
            :key="index"
          >
            <q-badge
              v-if="event.timestamp.time"
              class="my-event justify-center ellipsis"
              :class="badgeClasses(event, 'body')"
              :style="
                badgeStyles(
                  event,
                  'body',
                  day.timeStartPos,
                  day.timeDurationHeight
                )
              "
            >
              <q-icon
                v-if="event.icon"
                :name="event.icon"
                class="q-mr-xs"
              ></q-icon
              ><span class="ellipsis">{{ event.name }}</span>
            </q-badge>
          </template>
        </template>
        <template v-else>
          <!-- Used to render events in any agenda view -->
          <template
            v-for="agenda in getEvents(day)"
            :key="day.timestamp.date + agenda.timestamp.time"
          >
            <div>
              <q-item
                :label="agenda.timestamp.time"
                class="justify-start q-ma-sm shadow-5"
                @click="editEvent(agenda)"
                style="margin-left: 40px"
                clickable
              >
                <div
                  avatar
                  v-if="agenda.avatar"
                  class="row"
                  style="margin-left: -20px; height: 100%"
                >
                  <q-avatar
                    style="
                      margin-left: -25px;
                      margin-right: 10px;
                      font-size: 60px;
                      max-width: 50px;
                    "
                  >
                    <img :src="agenda.avatar" style="border: #fff solid 5px" />
                  </q-avatar>
                </div>
                <q-item-section top>
                  <q-item-label>
                    {{ agenda.timestamp.time }}: {{ agenda.name }}
                  </q-item-label>
                  <q-item-label caption v-if="agenda.desc">
                    {{ agenda.desc }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </template>
        </template>
      </template>
      <template #day="day">
        <!-- Used to render events in the month view -->
        <template v-if="calendarView.indexOf('agenda') < 0">
          <template v-for="(event, index) in getEvents(day)" :key="index">
            <q-badge>{{ event.name }}</q-badge>
          </template>
        </template>
      </template>
    </q-calendar>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { defineAsyncComponent } from "vue";
import { Dark } from "quasar";
export default {
  props: {
    // user: {}
  },
  data() {
    return {
      columns: [],
      pagination: {
        sortBy: "name",
        descending: true,
        page: 1,
        rowsPerPage: 10,
      },
      filter: "",
      membersSelected: [],
      isFullscreen: false,
      selectedDate: "2021-04-12",
      calendarView: "week-agenda",
      viewOpts: [
        { label: "Day", value: "day" },
        { label: "Day Agenda", value: "day-agenda" },
        { label: "Week", value: "week" },
        { label: "Week Agenda", value: "week-agenda" },
        { label: "Month", value: "month" },
        { label: "Month Agenda", value: "month-agenda" },
      ],
      viewGlobalOpts: [
        {
          label: "Weekdays only",
          click: () => {
            this.weekdaysOnly = !this.weekdaysOnly;
          },
        },
      ],
      weekdaysOnly: false,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  created: function () {
    this.Dark = Dark;
  },
  methods: {
    // ...mapMutations(["setFilterQuery"]),
    membersFilterMethod(rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : "";
      return rows.filter((row) => {
        if (row.id === "root" || row.id === "No Parent") return false;
        else if (row.name.toLowerCase().indexOf(lowerTerms) !== -1) {
          return true;
        } else if (
          this.roles[row.role]
            ? this.roles[row.role].label.toLowerCase().indexOf(lowerTerms) !==
              -1
            : false
        ) {
          return true;
        } else if (
          row.mods.some((style) =>
            this.mods[style]
              ? this.mods[style].label.toLowerCase().indexOf(lowerTerms) !== -1
              : false
          )
        ) {
          return true;
        } else if (
          this.parents[row.parent] && this.parents[row.parent].label
            ? this.parents[row.parent].label
                .toLowerCase()
                .indexOf(lowerTerms) !== -1
            : this.parents[row.parent] && this.parents[row.parent].name
            ? this.parents[row.parent].name
                .toLowerCase()
                .indexOf(lowerTerms) !== -1
            : false
        ) {
          return true;
        } else if (
          this.parents[row.alt] && this.parents[row.alt].label
            ? this.parents[row.alt].label.toLowerCase().indexOf(lowerTerms) !==
              -1
            : this.parents[row.alt] && this.parents[row.alt].name
            ? this.parents[row.alt].name.toLowerCase().indexOf(lowerTerms) !==
              -1
            : false
        ) {
          return true;
        }
        return false;
      });
    },
    getEvents(day) {
      //       day = {
      //   date: '',       // YYYY-MM-DD
      //   time: '',       // HH:MM (optional)
      //   year: 0,        // YYYY
      //   month: 0,       // MM (Jan = 1, etc)
      //   day: 0,         // day of the month
      //   weekday: 0,     // week day
      //   hour: 0,        // 24-hr
      //   minute: 0,      // mm
      //   day: 0,         // day of year
      //   workweek: 0,    // workweek number
      //   hasDay: false,  // if this timestamp is supposed to have a date
      //   hasTime: false, // if this timestamp is supposed to have a time
      //   past: false,    // if timestamp is in the past (based on `now` property)
      //   current: false, // if timestamp is current date (based on `now` property)
      //   future: false,  // if timestamp is in the future (based on `now` property)
      //   disabled: false // if timestamp is disabled
      // }
      // console.log("here");
      let thisDaysEvents = [];
      for (let e of this.eventsList) {
        if (e.timestamp.date === day.timestamp.date) {
          thisDaysEvents.push(e);
        }
      }
      // console.log("retrning events ", thisDaysEvents);
      return thisDaysEvents.sort(function (a, b) {
        return a.time - b.time;
      });
    },
    calendarNext() {
      this.$refs.calendar.next();
    },
    calendarPrev() {
      this.$refs.calendar.prev();
    },
    isCssColor(color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/);
    },
    badgeClasses(event, type) {
      const cssColor = this.isCssColor(event.bgcolor);
      const isHeader = type === "header";
      return {
        [`text-white bg-${event.bgcolor}`]: !cssColor,
        "full-width": !isHeader && (!event.side || event.side === "full"),
        "left-side": !isHeader && event.side === "left",
        "right-side": !isHeader && event.side === "right",
      };
    },
    badgeStyles(event, type, timeStartPos, timeDurationHeight) {
      const s = {};
      if (this.isCssColor(event.bgcolor)) {
        s["background-color"] = event.bgcolor;
        s.color = luminosity(event.bgcolor) > 0.5 ? "black" : "white";
      }
      if (timeStartPos) {
        s.top = timeStartPos(event.timestamp.time) + "px";
      }
      if (timeDurationHeight) {
        s.height = timeDurationHeight(event.duration) + "px";
      }
      s["align-items"] = "flex-start";
      return s;
    },
    //     showOffset (days) {
    //       const padTime = (val) => {
    //   val = Math.floor(val)
    //   if (val < 10) {
    //     return '0' + val
    //   }
    //   return val + ''
    // }
    //       if (days.length === 0) return
    //       const val = padTime(new Date(this.getTimestampString(days[0])).getTimezoneOffset() / 60)
    //       if (isNaN(val)) return ''
    //       return 'GMT-' + val
    //     },
    editEvent(e) {
      // console.log(e);
    },
  },
  computed: {
    ...mapState("movement", ["movement"]),
    ...mapGetters("events", ["eventsList"]),
    weekdays() {
      return this.weekdaysOnly ? [1, 2, 3, 4, 5] : [0, 1, 2, 3, 4, 5, 6];
    },
    eventsMap() {
      const map = {};
      this.eventsList.forEach((event) => {
        return (map[event.timestamp.date] =
          map[event.timestamp.date] || []).push(event);
      });
      return map;
    },
  },
  watch: {
    pagination() {
      LocalStorage.set("memberListPagination", this.pagination);
    },
    membersSelected() {
      this.membersSelectedFiltered = Array.from(
        this.membersSelected,
        (x) => x.id
      );
    },
  },
  components: {
    // 'mt-member-node':defineAsyncComponent(() => import('./../components/mt-member-node.vue'),
    "mt-member-view-menu": defineAsyncComponent(() =>
      import("./actions/mt-member-view-menu.vue")
    ),
    "mt-member-context-menu": defineAsyncComponent(() =>
      import("./actions/mt-member-context-menu.vue")
    ),
    "mt-batch": defineAsyncComponent(() => import("./mt-batch.vue")),
  },
};
</script>
<style lang="sass">
.calendar-container
  position: relative
.my-event
  width: 100%
  position: absolute
  font-size: 12px
.full-width
  left: 0
  width: 100%
.left-side
  left: 0
  width: 49.75%
.right-side
  left: 50.25%
  width: 49.75%
</style>
