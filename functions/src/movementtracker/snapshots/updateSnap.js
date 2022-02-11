import { saveSnapshot } from './../../scripts/saveSnapshot.js'
module.exports = ({ environment }) => async data => {
  // context.app will be undefined if the request doesn't include a valid
  // App Check token.
  // if (context.app == undefined && process.env.FUNCTIONS_EMULATOR !== "true") {
  //   console.error(
  //     "failed-precondition",
  //     "The function must be called from an App Check verified app."
  //   );
  // }

  return saveSnapshot(data, environment)
};
