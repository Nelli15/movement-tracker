import { getFirestore } from "firebase-admin/firestore";
import { getDatabase } from 'firebase-admin/database'

module.exports = () => async (req, res) => {
  let db = getFirestore()
  let rdb = getDatabase()

  //loop through all movements
  let movements = await db.collection('movements').get()
  for (let MovementSnap of movements.docs){
  let movId = MovementSnap.id
  let movRef = db.doc(`/movements/${movId}`);
  // sync all users 
  let usersSnap = await movRef.collection('users').get()
  for(let doc of usersSnap.docs) {
    rdb.ref(`movements/${movId}/users/${doc.id}`).set(doc.data())
  }
  // sync all user role definitions
  usersSnap = await movRef.collection('user-role-definitions').get()
  for(let doc of usersSnap.docs) {
    rdb.ref(`movements/${movId}/user-role-definitions/${doc.id}`).set(doc.data())
  }
  let snapshots = await movRef.collection('snapshots').get()
  // loop through all snapshots
   for (let snapInd in snapshots.docs) {
      let snap = snapshots.docs[snapInd]
      // loop through all trees
      let trees = await snap.ref.collection('trees').get()
      for (let treeInd in trees.docs) {
        let tree = trees.docs[treeInd]
        let statsSnap = await tree.ref.collection('components').doc('stats').get()
        for(let statInd in statsSnap.data()) {
          // add each stat to the trends
          if(statInd === 'imports') continue
          console.log(snap.get('date').toDate().getTime())
          rdb.ref(`movements/${movId}/trends/${statInd}/${tree.id}/${snap.id}`).set({
            date: snap.get('date').toDate().getTime(),
            snapId: snap.id,
            styleId: statInd,
            value: statsSnap.get(`${statInd}.total`)
          })
        }
      }
   }
  }
}

