import { getDatabase, ref, get, query, orderByChild, startAt, endAt } from "@firebase/database";

export function fetchTrend({commit, state}, {movId, styleId, treeId, startDate, endDate}) {
  // console.log(`/movements/${movId}/trends/${styleId}/${treeId}`, new Date(endDate), new Date(1640995200000))
  return get(query(
      ref(
        getDatabase(),
        `/movements/${movId}/trends/${styleId}/${treeId}`
      ), orderByChild('date'),startAt(startDate), endAt(endDate))).then(snapshot => {
        let trend = []
        for(let ii in snapshot.val()) {
          trend.push(snapshot.val()[ii])
        }
        // console.log(trend)
        commit('setTrend', { movId, styleId, treeId, trend: trend, computed: {mean: mean(trend), median: median(trend), mode: mode(trend), min: min(trend), max: max(trend) }})
        return { movId, styleId, treeId, trend: trend, computed: {mean: mean(trend), median: median(trend), mode: mode(trend), min: min(trend), max: max(trend) }}
      })
}

function mean(arr) {
  return sum(arr)/arr.length
}

function sum(arr) {
return arr.reduce((partial_sum, a) => partial_sum + a.value, 0)
}

function median(arr) {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a.value - b.value);
  return (arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2).value
};

const mode = a => 
  Object.values(
    a.reduce((count, val) => {
      let e = val.value
      if (!(e in count)) {
        count[e] = [0, e];
      }
      
      count[e][0]++;
      return count;
    }, {})
  ).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1]

  function min(arr) {
  return arr.reduce(function (p, v) {
    return ( p < v.value ? p : v.value );
  }).value
}

function max(arr) {
  return arr.reduce(function (p, v) {
    return ( p > v.value ? p : v.value );
  }).value
}
// export function fetchSnap({commit, state}, payload) {
//   get(
//       ref(
//         getDatabase(),
//         `/movements/${payload.movId}/trees/${payload.treeId}/${payload.styleId}`
//       ),
//       snapshot => {
//         let trend = []
//         for(let ii in snapshot) {
//           trend.push(snapshot[ii])
//         }
//         commit('setSnap', { ...payload, trend: trend.push() })
//       }
//     );
// }