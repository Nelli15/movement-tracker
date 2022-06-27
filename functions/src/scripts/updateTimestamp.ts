import { DocumentReference, Timestamp } from "firebase-admin/firestore";

exports.updateTimestamp = function (doc: DocumentReference) {
  return doc
    .update({ last_modified: Timestamp.now().toDate() })
    .catch((err) => console.error(err));
};
