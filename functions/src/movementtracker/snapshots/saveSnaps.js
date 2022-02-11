import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { saveSnapshot } from "../../scripts/saveSnapshot";

module.exports = ({ environment }) => async context => {
  var db = getFirestore();
  //   console.log(
  //     'This will be run every month at 00:01 AM Australian Eastern Standard Time!'
  //   )

  const nowDate = Timestamp.now().toDate();
  const pastMonth = Timestamp.now().toDate();
  pastMonth.setMonth(pastMonth.getMonth() - 1);
  // adjust from decrepancy between utc and bris time
  pastMonth.setHours(pastMonth.getHours() + 10);
  // Zero the hours
  pastMonth.setHours(0, 0, 0);
  // Zero the milliseconds
  pastMonth.setMilliseconds(0);

  const pastMonthTS = Timestamp.fromDate(pastMonth);
  // console.log(pastMonthTS)
  const movements = await db
    .collection(environment.schema.movements)
    .where("last_modified", ">=", pastMonthTS)
    .get();

  if (movements.empty) {
    console.log("No movements have been updated this month");
    return;
  } else {
    // console.log(`${movements.size} updated this month`)
  }

  const promises = [];
  movements.forEach(movement => {
    // console.log(movement.id)
    promises.push(saveSnapshot({ movId: movement.id}, environment));
  });
  return Promise.all(promises);
}
