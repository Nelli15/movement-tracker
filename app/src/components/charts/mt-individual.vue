<template>
  <div>
    <q-table
      :rows="chartData.datasets"
      :columns="chartData.labels"
      :title="chartData.member ? chartData.member.name : ''"
      v-model:pagination="pagination"
      separator="none"
      dense
      hide-bottom
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            <span class="text-bold text-subtitle2">
              {{ col.label }}
            </span>
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" :key="props.key">
          <q-td
            :props="props"
            v-for="(col, index) in props.cols"
            :key="col.name"
            style="padding: 0px"
            dense
          >
            <div v-if="col.name === 'labels'" class="q-ml-sm">
              {{ props.row.label }}
            </div>
            <!-- {{ index > 0 ? props.row.data[index - 2] : "" }}
            {{ index > 0 ? props.row.data[index - 1] : "" }} -->
            <span
              v-if="
                index > 1
                  ? props.row.data[index - 1] === 1 &&
                    props.row.data[index - 2] !== 0
                  : false
              "
              class="line-before bg-positive"
            />
            <span
              v-if="
                index < props.row.data.length
                  ? props.row.data[index - 1] === 1 &&
                    props.row.data[index] !== 0
                  : false
              "
              class="line-after bg-positive"
            />
            <span
              v-if="
                index > 1
                  ? props.row.data[index - 1] === -1 &&
                    props.row.data[index - 2] !== 0
                  : false
              "
              class="line-before bg-negative"
            />
            <span
              v-if="
                index < props.row.data.length
                  ? props.row.data[index - 1] === -1 &&
                    props.row.data[index] !== 0
                  : false
              "
              class="line-after bg-negative"
            />
            <span
              v-if="props.row.data[index - 1] === -1"
              class="dot bg-negative"
            >
              <q-tooltip
                class="bg-accent text-grey-10"
                anchor="center right"
                self="center left"
              >
                No Parent
              </q-tooltip>
            </span>
            <span
              v-if="props.row.data[index - 1] === 1"
              class="dot bg-positive"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  props: {
    chartData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pagination: {
        sortBy: "label",
        descending: false,
        page: 1,
        rowsPerPage: 0,
      },
    };
  },
};
</script>

<style scoped>
.dot {
  height: 15px;
  width: 15px;
  background-color: #bbb;
  border-radius: 50%;
  display: block;
  position: absolute;
  left: calc(50% - 12.5px);
  top: 26%;
}

.line-before {
  content: "";
  /*border-top: 2px solid #red;*/
  /*padding-top:5px;*/
  /*padding-bottom: 5px;*/
  /*margin: 40px auto 0;*/
  height: 3px;
  position: absolute;
  /*display:block;*/
  content: " ";
  display: block;
  /*position: absolute;*/
  /*height: 1px;*/
  /*background: green;*/
  width: 50%;
  left: 0%;
  /*top: 54%;*/
  /*display: inline-block;*/
}

.line-after {
  content: "";
  /*border-top: 2px solid #red;*/
  /*padding-top:5px;*/
  /*padding-bottom: 5px;*/
  /*margin: 40px auto 0;*/
  height: 3px;
  position: absolute;
  /*display:block;*/
  content: " ";
  display: block;
  /*position: absolute;*/
  /*height: 1px;*/
  /*background: green;*/
  width: 50%;
  left: 50%;
  /*top: -43%;*/
  /*display: inline-block;*/
}
</style>
