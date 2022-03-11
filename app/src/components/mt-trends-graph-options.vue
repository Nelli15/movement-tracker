<template>
  <q-drawer :model-value="drawerVisible" side="right" :width="300" elevated>
    <q-btn
      round
      color="primary"
      icon="chevron_right"
      fab-mini
      class="absolute"
      style="top: 50%; left: -30px; z-index: 10"
      @click="toggle()"
      aria-label="Hide Options"
    />
    <q-scroll-area style="height: 99%; max-width: 100%">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        align="justify"
        narrow-indicator
        :active-color="q.dark.isActive ? 'blue-2' : 'primary'"
        :indicator-color="q.dark.isActive ? 'blue-2' : 'primary'"
      >
        <q-tab name="data" label="Data" />
        <q-tab name="style" label="Style" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="data">
          <q-list>
            <q-item v-if="false">
              <q-select
                outlined
                v-model="l_options.chartType"
                :options="typeOpts"
                label="Graph Type"
                options-selected-class="text-positive"
                style="width: 100%"
                :color="q.dark.isActive ? 'blue-2' : ''"
              />
            </q-item>
            <div class="q-px-md">Dates</div>
            <q-item class="q-gutter-xs">
              <q-input v-model="startDate" outlined label="Start Date">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="startDate" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input v-model="endDate" outlined label="End Date">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="endDate" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <!-- </div> -->
            </q-item>
            <q-item>
              <q-select
                :disable="!(l_data.startDate > '' && l_data.endDate > '')"
                outlined
                v-model="l_data.trees"
                :options="treeOptsFiltered"
                options-value="id"
                options-label="label"
                multiple
                label="Trees"
                options-selected-class="text-positive"
                style="width: 100%"
                use-input
                input-debounce="0"
                @filter="treesFilterFn"
                use-chips
                :color="q.dark.isActive ? 'blue-2' : ''"
                hide-dropdown-icon
              >
                <template v-slot:selected>
                  <q-scroll-area style="height: 50px; width: 100%">
                    <q-chip
                      removable
                      dense
                      @remove="l_data.trees.splice(index, 1)"
                      color="positive"
                      class="q-ma-xs"
                      v-for="(val, index) in l_data.trees"
                      :key="index"
                      >{{ val.label }}
                    </q-chip>
                  </q-scroll-area>
                </template>
                <template v-slot:append>
                  <q-icon
                    name="cancel"
                    @click.stop="l_data.trees = []"
                    class="cursor-pointer"
                    v-if="l_data.trees && l_data.trees.length > 0"
                    style="font-size: 0.75em"
                  />
                  <q-icon
                    name="select_all"
                    @click.stop="l_data.trees = [...treeOptsFiltered]"
                    class="cursor-pointer"
                    v-if="l_data.trees && l_data.trees.length <= 0"
                  />
                </template>
              </q-select>
            </q-item>

            <q-item>
              <q-select
                :disable="!(l_data.startDate > '' && l_data.endDate > '')"
                outlined
                v-model="l_data.stats"
                :options="statsOptsFiltered"
                options-value="id"
                options-label="label"
                multiple
                label="Statistics"
                options-selected-class="text-positive"
                style="width: 100%"
                use-input
                input-debounce="0"
                @filter="statsFilterFn"
                use-chips
                :color="q.dark.isActive ? 'blue-2' : ''"
                hide-dropdown-icon
              >
                <template v-slot:selected>
                  <q-scroll-area style="height: 100px; width: 100%">
                    <q-chip
                      removable
                      dense
                      @remove="l_data.stats.splice(index, 1)"
                      color="positive"
                      class="q-ma-xs"
                      v-for="(val, index) in l_data.stats"
                      :key="index"
                      >{{ val.label }}
                    </q-chip>
                  </q-scroll-area>
                </template>
                <template v-slot:append>
                  <q-icon
                    name="cancel"
                    @click.stop="l_data.stats = []"
                    class="cursor-pointer"
                    v-if="l_data.stats && l_data.stats.length > 0"
                    style="font-size: 0.75em"
                  />
                  <q-icon
                    name="select_all"
                    @click.stop="l_data.stats = [...statsOptsFiltered]"
                    class="cursor-pointer"
                    v-if="l_data.stats && l_data.stats.length <= 0"
                  />
                </template>
              </q-select>
            </q-item>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="style">
          <q-list class="q-mt-md">
            <q-expansion-item expand-separator label="Chart">
              <q-card>
                <q-card-section>
                  <q-input
                    dense
                    outlined
                    label="Title"
                    v-model="l_options.title.text"
                    style="width: 100%"
                    :color="q.dark.isActive ? 'blue-2' : ''"
                    debounce="2000"
                    class="q-mb-sm"
                  >
                    <template v-slot:prepend>
                      <div
                        :style="
                          'width: 10px;height: 10px;background-color:' +
                            l_options.title.color +
                            ';'
                        "
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        name="text_format"
                        class="cursor-pointer"
                        size="md"
                      >
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-card>
                            <q-card-section class="q-gutter-sm">
                              <q-btn outline dense>
                                <q-icon
                                  name="format_color_text"
                                  :style="
                                    'color:' + l_options.title.color + ';'
                                  "
                                />
                                <q-popup-proxy
                                  cover
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-color v-model="l_options.title.color" />
                                </q-popup-proxy>
                                <q-tooltip
                                  class="bg-accent text-grey-10"
                                  anchor="center right"
                                  self="center left"
                                  >Text Colour</q-tooltip
                                >
                              </q-btn>
                              <q-btn
                                dense
                                outline
                                icon="format_bold"
                                @click="
                                  l_options.title.font.weight === 'bold'
                                    ? (l_options.title.font.weight = 'normal')
                                    : (l_options.title.font.weight = 'bold')
                                "
                                :color="
                                  l_options.title.font.weight === 'bold'
                                    ? q.dark.isActive
                                      ? 'blue-2'
                                      : 'primary'
                                    : ''
                                "
                              >
                                <q-tooltip
                                  class="bg-accent text-grey-10"
                                  anchor="center right"
                                  self="center left"
                                  >Bold</q-tooltip
                                ></q-btn
                              >
                              <q-btn outline dense>
                                <q-icon
                                  :name="
                                    'format_align_' + l_options.title.align
                                  "
                                />
                                <q-popup-proxy>
                                  <q-item
                                    v-for="opt in ['left', 'center', 'right']"
                                    :key="opt"
                                    clickable
                                    @click="l_options.title.align = opt"
                                  >
                                    <q-item-section>
                                      <q-icon
                                        :name="'format_align_' + opt"
                                        :color="
                                          l_options.title.align === opt
                                            ? q.dark.isActive
                                              ? 'blue-2'
                                              : 'primary'
                                            : ''
                                        "
                                      />
                                    </q-item-section>
                                  </q-item>
                                </q-popup-proxy>
                                <q-tooltip
                                  class="bg-accent text-grey-10"
                                  anchor="center right"
                                  self="center left"
                                  >Horizontal Align</q-tooltip
                                >
                              </q-btn>
                              <q-btn outline dense>
                                <q-icon
                                  name="
                                    format_size
                                  "
                                />
                                <q-popup-proxy>
                                  <q-item
                                    dense
                                    v-for="opt in [
                                      8,
                                      10,
                                      12,
                                      14,
                                      16,
                                      18,
                                      20,
                                      22,
                                      24,
                                      26,
                                      28,
                                      30,
                                      32,
                                      34,
                                      36,
                                      40,
                                      44,
                                      48,
                                      52,
                                      56,
                                      60
                                    ]"
                                    :key="opt"
                                    clickable
                                    @click="l_options.title.font.size = opt"
                                  >
                                    <q-item-section
                                      :style="`font-size:${opt}px`"
                                      :class="
                                        `${
                                          l_options.title.font.size === opt
                                            ? q.dark.isActive
                                              ? 'text-blue-2'
                                              : 'text-primary'
                                            : ''
                                        }`
                                      "
                                    >
                                      {{ opt }}
                                    </q-item-section>
                                  </q-item>
                                </q-popup-proxy>
                                <q-tooltip
                                  class="bg-accent text-grey-10"
                                  anchor="center right"
                                  self="center left"
                                  >Font Size</q-tooltip
                                >
                              </q-btn>
                            </q-card-section>
                          </q-card>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input
                    style="margin-top: 0px"
                    outlined
                    dense
                    label="Background Colour"
                    :color="q.dark.isActive ? 'blue-2' : ''"
                    v-model="l_options.chartBackground"
                  >
                    <template v-slot:prepend>
                      <div
                        :style="
                          'width: 10px;height: 10px;background-color:' +
                            l_options.chartBackground +
                            ';'
                        "
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon name="colorize" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-color v-model="l_options.chartBackground" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item expand-separator label="Trends">
              <q-card>
                <q-card-section>
                  <q-select
                    class="q-mb-sm"
                    outlined
                    dense
                    v-model="selectedTrend"
                    :options="trendOpts"
                    label="Selected Trend"
                    options-selected-class="text-positive"
                    :color="q.dark.isActive ? 'blue-2' : ''"
                    map-options
                    emit-value
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-italic text-grey">
                          No Trends Selected
                          <q-item-label caption>
                            Select at least one Tree and one Statistic on the
                            Data tab
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <!-- <q-item class="q-px-none"> -->
                  <!-- <div
                      style="width: 48%; display:inline-block;"
                      class="q-mr-sm"
                    > -->
                  <q-input
                    class="q-mb-sm"
                    style="margin-top: 0px"
                    v-if="selectedTrend"
                    outlined
                    dense
                    :label="
                      l_options.chartType === 'Line'
                        ? 'Line Colour'
                        : 'Border Colour'
                    "
                    :color="q.dark.isActive ? 'blue-2' : ''"
                    v-model="l_options.trends[`${selectedTrend}_borderColor`]"
                  >
                    <template v-slot:prepend>
                      <div
                        :style="
                          'width: 10px;height: 10px;background-color:' +
                            l_options.trends[`${selectedTrend}_borderColor`] +
                            ';'
                        "
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon name="colorize" class="cursor-pointer" size="xs">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-color
                            v-model="
                              l_options.trends[`${selectedTrend}_borderColor`]
                            "
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input
                    class="q-mb-sm"
                    style="margin-top: 0px"
                    v-if="selectedTrend"
                    outlined
                    dense
                    label="Fill Colour"
                    :color="q.dark.isActive ? 'blue-2' : ''"
                    v-model="
                      l_options.trends[`${selectedTrend}_backgroundColor`]
                    "
                  >
                    <template v-slot:prepend>
                      <div
                        :style="
                          'width: 10px;height: 10px;background-color:' +
                            l_options.trends[
                              `${selectedTrend}_backgroundColor`
                            ] +
                            ';'
                        "
                      />
                    </template>
                    <template v-slot:append>
                      <q-toggle
                        v-model="l_options.trends[`${selectedTrend}_filled`]"
                        checked-icon="check"
                        unchecked-icon="clear"
                        :color="q.dark.isActive ? 'blue-2' : 'primary'"
                        :icon-color="q.dark.isActive ? 'black' : 'white'"
                        class="q-mb-sm"
                      >
                        <q-tooltip
                          class="bg-accent text-grey-10"
                          anchor="center right"
                          self="center left"
                        >
                          Display Legend
                        </q-tooltip>
                      </q-toggle>
                      <q-icon name="colorize" class="cursor-pointer" size="xs">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-color
                            v-model="
                              l_options.trends[
                                `${selectedTrend}_backgroundColor`
                              ]
                            "
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <!-- </div>
                    <div style="width: 48%; display:inline-block;"> -->
                  <q-select
                    class="q-mb-sm"
                    v-if="selectedTrend && l_options.chartType === 'Line'"
                    outlined
                    dense
                    v-model="l_options.trends[`${selectedTrend}_lineTension`]"
                    :options="[
                      0,
                      0.1,
                      0.2,
                      0.3,
                      0.4,
                      0.5,
                      0.6,
                      0.7,
                      0.8,
                      0.9,
                      1
                    ]"
                    label="Line Tension"
                    options-selected-class="text-positive"
                    :color="q.dark.isActive ? 'blue-2' : ''"
                  >
                  </q-select>
                  <!-- </div> -->
                  <!-- </q-item> -->
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <!-- <q-expansion-item expand-separator label="Axis">
              <q-card>
                <q-card-section>
                  <q-input
                    outlined
                    label="Axis Label"
                    v-model="l_options.axis"
                    :color="q.dark.isActive ? 'blue-2' : ''"
                    debounce="2000"
                  />
                </q-card-section>
              </q-card>
            </q-expansion-item> -->
            <q-expansion-item expand-separator label="Horizontal Axis">
              <q-card>
                <q-card-section>
                  <q-input
                    class="q-mb-sm"
                    dense
                    outlined
                    label="Label"
                    v-model="l_options.xAxis.text"
                    :color="q.dark.isActive ? 'blue-2' : ''"
                    debounce="2000"
                  >
                    <template v-slot:prepend>
                      <div
                        :style="
                          'width: 10px;height: 10px;background-color:' +
                            l_options.xAxis.color +
                            ';'
                        "
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        name="text_format"
                        class="cursor-pointer"
                        size="md"
                      >
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-card>
                            <q-card-section class="q-gutter-sm">
                              <q-btn outline dense>
                                <q-icon
                                  name="format_color_text"
                                  :style="
                                    'color:' + l_options.xAxis.color + ';'
                                  "
                                />
                                <q-popup-proxy
                                  cover
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-color v-model="l_options.xAxis.color" />
                                </q-popup-proxy>
                                <q-tooltip
                                  class="bg-accent text-grey-10"
                                  anchor="center right"
                                  self="center left"
                                  >Text Colour</q-tooltip
                                >
                              </q-btn>
                              <q-btn
                                dense
                                outline
                                icon="format_bold"
                                @click="
                                  l_options.xAxis.font.weight === 'bold'
                                    ? (l_options.xAxis.font.weight = 'normal')
                                    : (l_options.xAxis.font.weight = 'bold')
                                "
                                :color="
                                  l_options.xAxis.font.weight === 'bold'
                                    ? q.dark.isActive
                                      ? 'blue-2'
                                      : 'primary'
                                    : ''
                                "
                              >
                                <q-tooltip
                                  class="bg-accent text-grey-10"
                                  anchor="center right"
                                  self="center left"
                                  >Bold</q-tooltip
                                ></q-btn
                              >
                              <q-btn outline dense>
                                <q-icon
                                  :name="
                                    'format_align_' + l_options.xAxis.align
                                  "
                                />
                                <q-popup-proxy>
                                  <q-item
                                    v-for="opt in ['left', 'center', 'right']"
                                    :key="opt"
                                    clickable
                                    @click="l_options.xAxis.align = opt"
                                  >
                                    <q-item-section>
                                      <q-icon
                                        :name="'format_align_' + opt"
                                        :color="
                                          l_options.xAxis.align === opt
                                            ? q.dark.isActive
                                              ? 'blue-2'
                                              : 'primary'
                                            : ''
                                        "
                                      />
                                    </q-item-section>
                                  </q-item>
                                </q-popup-proxy>
                                <q-tooltip
                                  class="bg-accent text-grey-10"
                                  anchor="center right"
                                  self="center left"
                                  >Horizontal Align</q-tooltip
                                >
                              </q-btn>
                              <q-btn outline dense>
                                <q-icon
                                  name="
                                    format_size
                                  "
                                />
                                <q-popup-proxy>
                                  <q-item
                                    dense
                                    v-for="opt in [
                                      8,
                                      10,
                                      12,
                                      14,
                                      16,
                                      18,
                                      20,
                                      22,
                                      24,
                                      26,
                                      28,
                                      30,
                                      32,
                                      34,
                                      36,
                                      40,
                                      44,
                                      48,
                                      52,
                                      56,
                                      60
                                    ]"
                                    :key="opt"
                                    clickable
                                    @click="l_options.xAxis.font.size = opt"
                                  >
                                    <q-item-section
                                      :style="`font-size:${opt}px`"
                                      :class="
                                        `${
                                          l_options.xAxis.font.size === opt
                                            ? q.dark.isActive
                                              ? 'text-blue-2'
                                              : 'text-primary'
                                            : ''
                                        }`
                                      "
                                    >
                                      {{ opt }}
                                    </q-item-section>
                                  </q-item>
                                </q-popup-proxy>
                                <q-tooltip
                                  class="bg-accent text-grey-10"
                                  anchor="center right"
                                  self="center left"
                                  >Font Size</q-tooltip
                                >
                              </q-btn>
                            </q-card-section>
                          </q-card>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input
                    class="q-mb-sm"
                    style="margin-top: 0px"
                    outlined
                    dense
                    label="Tick Label Colour"
                    :color="q.dark.isActive ? 'blue-2' : ''"
                    v-model="l_options.xAxis.tickLabelColor"
                  >
                    <template v-slot:prepend>
                      <div
                        :style="
                          'width: 10px;height: 10px;background-color:' +
                            l_options.xAxis.tickLabelColor +
                            ';'
                        "
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon name="colorize" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-color v-model="l_options.xAxis.tickLabelColor" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input
                    class="q-mb-sm"
                    style="margin-top: 0px"
                    outlined
                    dense
                    label="Tick Colour"
                    :color="q.dark.isActive ? 'blue-2' : ''"
                    v-model="l_options.xAxis.tickColor"
                  >
                    <template v-slot:prepend>
                      <div
                        :style="
                          'width: 10px;height: 10px;background-color:' +
                            l_options.xAxis.tickColor +
                            ';'
                        "
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon name="colorize" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-color v-model="l_options.xAxis.tickColor" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input
                    class="q-mb-sm"
                    style="margin-top: 0px"
                    outlined
                    dense
                    label="Grid Colour"
                    :color="q.dark.isActive ? 'blue-2' : ''"
                    v-model="l_options.xAxis.gridColor"
                  >
                    <template v-slot:prepend>
                      <div
                        :style="
                          'width: 10px;height: 10px;background-color:' +
                            l_options.xAxis.gridColor +
                            ';'
                        "
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon name="colorize" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-color v-model="l_options.xAxis.gridColor" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input
                    class="q-mb-sm"
                    style="margin-top: 0px"
                    outlined
                    dense
                    label="Border Colour"
                    :color="q.dark.isActive ? 'blue-2' : ''"
                    v-model="l_options.xAxis.borderColor"
                  >
                    <template v-slot:prepend>
                      <div
                        :style="
                          'width: 10px;height: 10px;background-color:' +
                            l_options.xAxis.borderColor +
                            ';'
                        "
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon name="colorize" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-color v-model="l_options.xAxis.borderColor" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item expand-separator label="Vertical Axis">
              <q-card>
                <q-card-section class="q-gutter-sm">
                  <q-input
                    class="q-mb-sm"
                    dense
                    outlined
                    label="Label"
                    v-model="l_options.yAxis.text"
                    :color="q.dark.isActive ? 'blue-2' : ''"
                    debounce="2000"
                  >
                    <template v-slot:prepend>
                      <div
                        :style="
                          'width: 10px;height: 10px;background-color:' +
                            l_options.yAxis.color +
                            ';'
                        "
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        name="text_format"
                        class="cursor-pointer"
                        size="md"
                      >
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-card>
                            <q-card-section class="q-gutter-sm">
                              <q-btn outline dense>
                                <q-icon
                                  name="format_color_text"
                                  :style="
                                    'color:' + l_options.yAxis.color + ';'
                                  "
                                />
                                <q-popup-proxy
                                  cover
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-color v-model="l_options.yAxis.color" />
                                </q-popup-proxy>
                                <q-tooltip
                                  class="bg-accent text-grey-10"
                                  anchor="center right"
                                  self="center left"
                                  >Text Colour</q-tooltip
                                >
                              </q-btn>
                              <q-btn
                                dense
                                outline
                                icon="format_bold"
                                @click="
                                  l_options.yAxis.font.weight === 'bold'
                                    ? (l_options.yAxis.font.weight = 'normal')
                                    : (l_options.yAxis.font.weight = 'bold')
                                "
                                :color="
                                  l_options.yAxis.font.weight === 'bold'
                                    ? q.dark.isActive
                                      ? 'blue-2'
                                      : 'primary'
                                    : ''
                                "
                              >
                                <q-tooltip
                                  class="bg-accent text-grey-10"
                                  anchor="center right"
                                  self="center left"
                                  >Bold</q-tooltip
                                >
                              </q-btn>
                              <q-btn outline dense>
                                <q-icon
                                  :name="
                                    'format_align_' + l_options.yAxis.align
                                  "
                                />
                                <q-popup-proxy>
                                  <q-item
                                    v-for="opt in ['left', 'center', 'right']"
                                    :key="opt"
                                    clickable
                                    @click="l_options.yAxis.align = opt"
                                  >
                                    <q-item-section>
                                      <q-icon
                                        :name="'format_align_' + opt"
                                        :color="
                                          l_options.yAxis.align === opt
                                            ? q.dark.isActive
                                              ? 'blue-2'
                                              : 'primary'
                                            : ''
                                        "
                                      />
                                    </q-item-section>
                                  </q-item>
                                </q-popup-proxy>
                                <q-tooltip
                                  class="bg-accent text-grey-10"
                                  anchor="center right"
                                  self="center left"
                                  >Horizontal Align</q-tooltip
                                >
                              </q-btn>
                              <q-btn outline dense>
                                <q-icon
                                  name="
                                    format_size
                                  "
                                />
                                <q-popup-proxy>
                                  <q-item
                                    dense
                                    v-for="opt in [
                                      8,
                                      10,
                                      12,
                                      14,
                                      16,
                                      18,
                                      20,
                                      22,
                                      24,
                                      26,
                                      28,
                                      30,
                                      32,
                                      34,
                                      36,
                                      40,
                                      44,
                                      48,
                                      52,
                                      56,
                                      60
                                    ]"
                                    :key="opt"
                                    clickable
                                    @click="l_options.yAxis.font.size = opt"
                                  >
                                    <q-item-section
                                      :style="`font-size:${opt}px`"
                                      :class="
                                        `${
                                          l_options.yAxis.font.size === opt
                                            ? q.dark.isActive
                                              ? 'text-blue-2'
                                              : 'text-primary'
                                            : ''
                                        }`
                                      "
                                    >
                                      {{ opt }}
                                    </q-item-section>
                                  </q-item>
                                </q-popup-proxy>
                                <q-tooltip
                                  class="bg-accent text-grey-10"
                                  anchor="center right"
                                  self="center left"
                                  >Font Size</q-tooltip
                                >
                              </q-btn>
                            </q-card-section>
                          </q-card>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input
                    class="q-mb-sm"
                    style="margin-top: 0px"
                    outlined
                    dense
                    label="Tick Label Colour"
                    :color="q.dark.isActive ? 'blue-2' : ''"
                    v-model="l_options.yAxis.tickLabelColor"
                  >
                    <template v-slot:prepend>
                      <div
                        :style="
                          'width: 10px;height: 10px;background-color:' +
                            l_options.yAxis.tickLabelColor +
                            ';'
                        "
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon name="colorize" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-color v-model="l_options.yAxis.tickLabelColor" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input
                    class="q-mb-sm"
                    style="margin-top: 0px"
                    outlined
                    dense
                    label="Tick Colour"
                    :color="q.dark.isActive ? 'blue-2' : ''"
                    v-model="l_options.yAxis.tickColor"
                  >
                    <template v-slot:prepend>
                      <div
                        :style="
                          'width: 10px;height: 10px;background-color:' +
                            l_options.yAxis.tickColor +
                            ';'
                        "
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon name="colorize" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-color v-model="l_options.yAxis.tickColor" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input
                    class="q-mb-sm"
                    style="margin-top: 0px"
                    outlined
                    dense
                    label="Grid Colour"
                    :color="q.dark.isActive ? 'blue-2' : ''"
                    v-model="l_options.yAxis.gridColor"
                  >
                    <template v-slot:prepend>
                      <div
                        :style="
                          'width: 10px;height: 10px;background-color:' +
                            l_options.yAxis.gridColor +
                            ';'
                        "
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon name="colorize" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-color v-model="l_options.yAxis.gridColor" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input
                    class="q-mb-sm"
                    style="margin-top: 0px"
                    outlined
                    dense
                    label="Border Colour"
                    :color="q.dark.isActive ? 'blue-2' : ''"
                    v-model="l_options.yAxis.borderColor"
                  >
                    <template v-slot:prepend>
                      <div
                        :style="
                          'width: 10px;height: 10px;background-color:' +
                            l_options.yAxis.borderColor +
                            ';'
                        "
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon name="colorize" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-color v-model="l_options.yAxis.borderColor" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item expand-separator label="">
              <template v-slot:header>
                <q-item-section class="q-mr-auto">Legend</q-item-section>
                <q-toggle
                  v-model="l_options.legend.display"
                  checked-icon="check"
                  unchecked-icon="clear"
                  :color="q.dark.isActive ? 'blue-2' : 'primary'"
                  :icon-color="q.dark.isActive ? 'black' : 'white'"
                  class="q-mb-sm"
                >
                  <q-tooltip
                    class="bg-accent text-grey-10"
                    anchor="center right"
                    self="center left"
                  >
                    Display Legend
                  </q-tooltip>
                </q-toggle>
              </template>
              <q-card>
                <q-card-section>
                  Legend Position
                  <div class="row">
                    <q-btn
                      icon="north_west"
                      dense
                      @click="setLegendPos('north_west')"
                    /><q-btn
                      icon="north"
                      dense
                      @click="setLegendPos('north')"
                    /><q-btn
                      icon="north_east"
                      dense
                      @click="setLegendPos('north_east')"
                    />
                  </div>
                  <div class="row">
                    <q-btn
                      icon="west"
                      dense
                      @click="setLegendPos('west')"
                    /><q-btn disabled flat /><q-btn
                      icon="east"
                      dense
                      @click="setLegendPos('east')"
                    />
                  </div>
                  <div class="row">
                    <q-btn
                      icon="south_west"
                      dense
                      @click="setLegendPos('south_west')"
                    /><q-btn
                      icon="south"
                      dense
                      @click="setLegendPos('south')"
                    /><q-btn
                      icon="south_east"
                      dense
                      @click="setLegendPos('south_east')"
                    />
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import { ref, computed, watch, defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
import { FontSpec } from 'chart.js';
function toArray(object: any) {
  if (!object) {
    return [];
  }
  if (Object.keys(object).length <= 0) {
    return [];
  }
  return Object.keys(object).map(i => object[i]);
}
export default defineComponent({
  // name: 'ComponentName',

  props: ['options', 'data'],
  emits: ['close', 'update:options', 'update:data'],
  setup(props, { emit }) {
    const q = useQuasar();
    const store = useStore();
    const drawerVisible = ref(false);
    const selectedTrend = ref('');
    let d = new Date();
    const endDate = ref(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate() + 1
      ).padStart(2, '0')}`
    );
    d.setFullYear(d.getFullYear() - 1);
    const startDate = ref(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate() + 1
      ).padStart(2, '0')}`
    );

    const typeOpts = ref(['Line', 'Bar', 'Pie', 'Polar']);
    const l_options = ref<{
      chartType: string;
      title: {
        text: string;
        pos: string;
        align: string;
        font: Partial<FontSpec>;
        color: string;
      };
      chartBackground: string | undefined;
      trends: {
        [index: string]: string | number | boolean;
      };
      xAxis: {
        text: string;
        color: string;
        align: string;
        font: Partial<FontSpec>;
        borderColor: string;
        gridColor: string;
        tickColor: string;
        tickLabelColor: string;
      };
      yAxis: {
        text: string;
        color: string;
        align: string;
        font: Partial<FontSpec>;
        borderColor: string;
        gridColor: string;
        tickColor: string;
        tickLabelColor: string;
      };
      axis: string;
      legend: {
        pos: 'top' | 'left' | 'bottom' | 'right';
        align: 'start' | 'center' | 'end';
        display: boolean;
      };
    }>({
      chartType: 'Line',
      title: {
        text: '',
        pos: 'top',
        align: 'center',
        font: { weight: 'bold', size: 20 },
        color: q.dark.isActive ? '#FFFFFF' : '#000000'
      },
      chartBackground: '#263238',
      trends: {},
      xAxis: {
        text: 'Snapshots by Date',
        color: q.dark.isActive ? '#FFFFFF' : '#000000',
        align: 'center',
        font: { weight: 'normal', size: 14 },
        borderColor: '#969696',
        gridColor: '#969696',
        tickColor: '#969696',
        tickLabelColor: '#454545'
      },
      yAxis: {
        text: 'Number of Members',
        color: q.dark.isActive ? '#FFFFFF' : '#000000',
        align: 'center',
        font: { weight: 'normal', size: 14 },
        borderColor: '#969696',
        gridColor: '#969696',
        tickColor: '#969696',
        tickLabelColor: '#454545'
      },
      axis: 'Number of Members',
      legend: {
        display: false,
        pos: 'top',
        align: 'center'
      }
    });
    interface TrendData {
      startDate: number;
      endDate: number;
      stats: { label: string; id: string }[];
      trees: { label: string; id: string }[];
    }
    const l_data = ref<TrendData>({
      startDate: d.getTime(),
      endDate: new Date().getTime(),
      stats: [],
      trees: []
    });
    const statsOptsFiltered = ref<any[]>([]);
    const treeOptsFiltered = ref<any[]>([]);
    const tab = ref('data');

    const treeOpts = computed(() => toArray(store.state.movement.trees));
    const statsOpts = computed(() => toArray(store.state.movement.stats));
    const trendOpts = computed(() => {
      let arr = [];
      for (let tree of l_data.value.trees) {
        for (let stat of l_data.value.stats) {
          arr.push({
            label: `${tree.label} - ${stat.label}`,
            value: `${tree.id}-${stat.id}`
          });
        }
      }
      return arr;
    });

    function statsFilterFn(val: string, update: (cb: () => void) => void) {
      if (val === '') {
        update(() => {
          statsOptsFiltered.value = statsOpts.value.sort((a, b) => {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
          });

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });

        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        statsOptsFiltered.value = statsOpts.value
          .filter(v => v.label.toLowerCase().indexOf(needle) > -1)
          .sort((a, b) => {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
          });
      });
    }
    function treesFilterFn(val: string, update: (cb: () => void) => void) {
      if (val === '') {
        update(() => {
          treeOptsFiltered.value = treeOpts.value.sort((a, b) => {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
          });

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });

        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        treeOptsFiltered.value = treeOpts.value
          .filter(v => v.label.toLowerCase().indexOf(needle) > -1)
          .sort((a, b) => {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
          });
      });
    }
    function toggle() {
      drawerVisible.value = !drawerVisible.value;
    }

    const curLegendPos = ref('north');

    function setLegendPos(val: string) {
      // check if corner and same as previous
      if (val === curLegendPos.value && val.length > 5) {
        switch (val) {
          case 'north_west':
            l_options.value.legend.pos =
              l_options.value.legend.pos === 'left'
                ? 'top'
                : l_options.value.legend.pos === 'top'
                ? 'left'
                : l_options.value.legend.pos;
            break;
          case 'north_east':
            l_options.value.legend.pos =
              l_options.value.legend.pos === 'right'
                ? 'top'
                : l_options.value.legend.pos === 'top'
                ? 'right'
                : l_options.value.legend.pos;
            l_options.value.legend.align =
              l_options.value.legend.align === 'end'
                ? 'start'
                : l_options.value.legend.align === 'start'
                ? 'end'
                : l_options.value.legend.align;

            break;
          case 'south_west':
            l_options.value.legend.pos =
              l_options.value.legend.pos === 'bottom'
                ? 'left'
                : l_options.value.legend.pos === 'left'
                ? 'bottom'
                : l_options.value.legend.pos;
            l_options.value.legend.align =
              l_options.value.legend.align === 'end'
                ? 'start'
                : l_options.value.legend.align === 'start'
                ? 'end'
                : l_options.value.legend.align;
            break;
          case 'south_east':
            l_options.value.legend.pos =
              l_options.value.legend.pos === 'bottom'
                ? 'right'
                : l_options.value.legend.pos === 'right'
                ? 'bottom'
                : l_options.value.legend.pos;
            break;
        }
      } else {
        switch (val) {
          case 'north_west':
            l_options.value.legend.pos = 'top';
            l_options.value.legend.align = 'start';
            break;
          case 'north':
            l_options.value.legend.pos = 'top';
            l_options.value.legend.align = 'center';
            break;
          case 'north_east':
            l_options.value.legend.pos = 'top';
            l_options.value.legend.align = 'end';
            break;
          case 'west':
            l_options.value.legend.pos = 'left';
            l_options.value.legend.align = 'center';
            break;
          case 'east':
            l_options.value.legend.pos = 'right';
            l_options.value.legend.align = 'center';
            break;
          case 'south_west':
            l_options.value.legend.pos = 'bottom';
            l_options.value.legend.align = 'start';
            break;
          case 'south':
            l_options.value.legend.pos = 'bottom';
            l_options.value.legend.align = 'center';
            break;
          case 'south_east':
            l_options.value.legend.pos = 'bottom';
            l_options.value.legend.align = 'end';
            break;

          default:
            l_options.value.legend.pos = 'top';
            l_options.value.legend.align = 'center';
            break;
        }
      }
      curLegendPos.value = val;
    }

    watch(
      props.options,
      (newVal, oldVal) => {
        if (newVal !== oldVal) l_options.value = props.options;
      },
      { deep: true, immediate: true }
    );
    watch(
      l_options,
      () => {
        if (props.options !== l_options.value)
          emit('update:options', l_options.value);
      },
      { deep: true }
    );
    watch(
      props.data,
      (newVal, oldVal) => {
        if (newVal !== oldVal) l_data.value = props.data;
      },
      { deep: true, immediate: true }
    );
    watch(
      l_data,
      () => {
        for (let tree of l_data.value.trees) {
          for (let stat of l_data.value.stats) {
            l_options.value.trends[`${tree.id}-${stat.id}_lineTension`] =
              l_options.value.trends[`${tree.id}-${stat.id}_lineTension`] ||
              0.3;
            l_options.value.trends[`${tree.id}-${stat.id}_borderColor`] =
              l_options.value.trends[`${tree.id}-${stat.id}_borderColor`] ||
              '#' +
                Math.floor(Math.random() * 16777215)
                  .toString(16)
                  .padStart(6, '0');
            l_options.value.trends[`${tree.id}-${stat.id}_backgroundColor`] =
              l_options.value.trends[`${tree.id}-${stat.id}_backgroundColor`] ||
              l_options.value.trends[`${tree.id}-${stat.id}_borderColor`];
            l_options.value.trends[`${tree.id}-${stat.id}_filled`] =
              l_options.value.trends[`${tree.id}-${stat.id}_filled`] || false;
            l_options.value.trends[`${tree.id}-${stat.id}_stepped`] =
              l_options.value.trends[`${tree.id}-${stat.id}_stepped`] || false;
          }
        }
        if (props.data !== l_data.value) emit('update:data', l_data.value);
      },
      { deep: true }
    );
    watch(startDate, () => {
      l_data.value.startDate = new Date(startDate.value).getTime();
    });
    watch(endDate, () => {
      l_data.value.endDate = new Date(endDate.value).getTime();
    });

    return {
      q,
      drawerVisible,
      toggle,
      tab,
      typeOpts,
      l_options,
      l_data,
      statsOpts,
      statsOptsFiltered,
      statsFilterFn,
      treeOpts,
      treeOptsFiltered,
      treesFilterFn,
      startDate,
      endDate,
      trendOpts,
      selectedTrend,
      setLegendPos
    };
  }
});
</script>
