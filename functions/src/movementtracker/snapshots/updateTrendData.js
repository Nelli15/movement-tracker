import { getFirestore } from "firebase-admin/firestore";
module.exports = ({ environment }) => async (change, context) => {
  let db = getDatabase();
  let movId = context.params.movId;
  let treeId = context.params.treeId;
  let snapId = context.params.snapId;
  let after = change.after.exists ? change.after.data() : {};
  let before = change.before.exists ? change.before.data() : {};

  // const batch = db.batch();
  let promises = []
  if (change.after.exists) {
    // update all trends 
    for (let styleId in after) {
      if (styleId === "imports") continue;
      if (before && JSON.stringify(before[styleId]) === JSON.stringify(after[styleId])) continue // skip unchanged stats
      let stat = after[styleId];

      const trendRef = db.ref(`movements/${movId}/trends/${styleId}/${treeId}/${snapId}`)
      promises.push(trendRef.transaction((current_value) => {
        
        
        //generate a date from snapId
        let snapDate = snapId.split('-')
        let d = new Date()
        d.setTime(0)
        d.setFullYear(snapDate[0])
        d.setMonth(snapDate[1])

        // update the trend data at `movements/${movId}/trends/${styleId}/${treeId}/${snapId}`
        // include {
        // date
        // snapId
        // styleId
        // treeId
        // total as value
        // }
        return {
          date: d.getTime(),
          snapId: context.params.snapId,
          styleId: styleId,
          treeId: context.params.treeId,
          value: stat.total ? stat.total : 0
        };
      }))
    }
    //check for any deleted values and delete trend snap if needed
     for (let styleId in before) {
      if (styleId === "imports") continue;
      if (after[styleId]) continue
      const trendRef = db.ref(`movements/${movId}/trends/${styleId}/${treeId}/${snapId}`)
      promises.push(trendRef.transaction((current_value) => {
        return null
      }))
    }
  } else {
    // if snapshot is deleted, delete the snaps in trends
    for (let styleId in before) {
      if (styleId === "imports") continue;
      const trendRef = db.ref(`movements/${movId}/trends/${styleId}/${treeId}/${snapId}`)
      promises.push(trendRef.transaction((current_value) => {
        return null
      }))
    }
  }
  return Promise.all(promises)

  // batch.commit().catch(err => {
  //   console.error(err);
  // });
};
