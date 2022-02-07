import * as functions from "firebase-functions";
import * as admin from 'firebase-admin'
var db = getFirestore();

exports.onCreate = functions.firestore
  .document("/organisations/{organisationId}/organisation_movements/{movId}")
  .onCreate((change, context) => {
    // populate the luts with the relevent stats info
    console.log(
      "Organisation: " +
        context.params.organisationId +
        " Movement: " +
        context.params.movId
    );
    const orgMovRef = change.ref;
    const movRef = db.doc(`/movements/${context.params.movId}`);
    // const nowRef = movRef.collection('snapshots').doc('now')
    const statsColRef = db.collection(
      `organisations/${context.params.organisationId}/organisation_stats`
    );
    const statsLUTsRef = statsColRef.doc("LUTs");
    return db
      .runTransaction(async transaction => {
        // get the current movement data
        const movDoc = await transaction.get(movRef);
        const nowDoc = await transaction.get(nowRef);
        const LUTdoc = await transaction.get(statsLUTsRef);
        const movData = movDoc.data();
        const nowData = nowDoc.data();
        const LUTs = LUTdoc.data();

        const statsToChange = [];
        const LUTsToAdd = {};

        // find all mov stats that use the same name as the org stats
        for (LUT in LUTs) {
          if (!LUTs[LUT][context.params.movId]) {
            for (stat in nowData.stats) {
              // console.log(nowData.stats[stat].label ? nowData.stats[stat].label : nowData.stats[stat].name, LUTs[LUT].label, nowData.stats[stat].label === LUTs[LUT].label || nowData.stats[stat].name === LUTs[LUT].label)
              if (
                nowData.stats[stat].label === LUTs[LUT].label ||
                nowData.stats[stat].name === LUTs[LUT].label
              ) {
                LUTsToAdd[`${LUT}.${context.params.movId}`] = stat;
                statsToChange.push({ orgStat: LUT, movStat: stat });
                break;
              }
            }
          }
        }
        // console.log(LUTsToAdd)
        // update the LUTs
        if (
          Object.keys(LUTsToAdd).length !== 0 ||
          LUTsToAdd.constructor !== Object
        ) {
          // object is not empty
          transaction.update(statsLUTsRef, LUTsToAdd);
        }

        // add all the movement stats to the org stat doc
        for (stat in statsToChange) {
          // console.log({ [context.params.movId]: statsToChange[stat] })
          const statData = { ...nowData.stats[statsToChange[stat].movStat] };
          statData.movName = movData.name;
          transaction.update(statsColRef.doc(statsToChange[stat].orgStat), {
            [context.params.movId]: statData
          });
        }

        // update the org mov doc
        return transaction.update(orgMovRef, {
          id: context.params.movId,
          name: movData.name,
          style: movData.style,
          stats: nowData.stats ? nowData.stats : {}
        });
      })
      .catch(err => {
        console.error(err);
      });
  });

exports.onChange = functions.firestore
  .document("/organisations/{organisationId}/organisation_movements/{movId}")
  .onUpdate((change, context) => {
    // populate the luts with the relevent stats info
    console.log(
      "Organisation: " +
        context.params.organisationId +
        " Movement: " +
        context.params.movId
    );
    const statsLUTsRef = db.doc(
      `organisations/${context.params.organisationId}/organisation_stats/LUTs`
    );
    const statsColRef = db.collection(
      `organisations/${context.params.organisationId}/organisation_stats`
    );
    return db
      .runTransaction(async transaction => {
        // get the LUT for the stats
        const LUTdoc = await transaction.get(statsLUTsRef);
        const LUTs = LUTdoc.data();
        const movementStats = change.after.data().stats;

        const statsToChange = [];
        // find all the org stats using this movement
        for (LUT in LUTs) {
          if (LUTs[LUT][context.params.movId] > "") {
            statsToChange.push({
              orgStat: LUT,
              movStat: LUTs[LUT][context.params.movId]
            });
          }
        }

        // add all the movement stats to the org stat doc
        for (stat in statsToChange) {
          const statData = movementStats[statsToChange[stat].movStat];
          statData.movName = change.after.get("name");
          transaction.update(statsColRef.doc(statsToChange[stat].orgStat), {
            [context.params.movId]: statData
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  });

// copies snapshot to related organisations
exports.onSnapWrite = functions.firestore
  .document("/movements/{movId}/snapshots/{snapId}")
  .onWrite((change, context) => {
    if (change.after.id === "now") return true;
    if (change.after.exists) {
      // Snap was created or updated
      const snapData = change.after.data();
      const data = {
        date: snapData.date,
        title: snapData.title,
        stats: {}
      };

      for (var ii in snapData.roleStats) {
        const stat = snapData.roleStats[ii];
        data.stats[stat.id] = {
          id: stat.id,
          desc: stat.desc,
          label: stat.label,
          total: stat.total,
          noParentTotal: stat.noParentTotal ? stat.noParentTotal : 0,
          style: stat.style ? stat.style : null,
          type: stat.type
        };
      }

      for (var ii in snapData.modStats) {
        const stat = snapData.modStats[ii];
        data.stats[stat.id] = {
          id: stat.id,
          desc: stat.desc,
          label: stat.label,
          total: stat.total,
          noParentTotal: stat.noParentTotal ? stat.noParentTotal : 0,
          style: stat.style ? stat.style : null,
          type: stat.type
        };
      }

      for (var ii in snapData.complexStats) {
        const stat = snapData.complexStats[ii];
        data.stats[stat.id] = {
          id: stat.id,
          desc: stat.desc,
          label: stat.label,
          total: stat.total,
          noParentTotal: stat.noParentTotal ? stat.noParentTotal : 0,
          style: stat.style ? stat.style : null,
          type: stat.type
        };
      }

      for (var ii in snapData.totals) {
        const stat = snapData.totals[ii];
        data.stats[stat.id] = {
          id: stat.id ? stat.id : ii,
          desc: stat.desc ? stat.desc : "",
          label: stat.label ? stat.label : stat.name,
          total: stat.total,
          type: "total"
        };
      }
      return db
        .collectionGroup("organisation_movements")
        .where("id", "==", context.params.movId)
        .get()
        .then(snap => {
          return snap.forEach(doc => {
            return doc.ref
              .collection("stats")
              .doc(change.after.id)
              .set(data);
          });
        })
        .catch(err => console.error(err));
    }
    return true;
  });
