/* eslint-env node */
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// cypress/plugins/index.js

module.exports = (/*on, config*/) => {
  //
};

import * as admin from 'firebase-admin'
const cypressFirebasePlugin = require("cypress-firebase").plugin;
// const { initPlugin } = require("cypress-plugin-snapshots/plugin");

module.exports = (on, config) => {
  // initPlugin(on, config)
  const extendedConfig = cypressFirebasePlugin(on, config, admin);

  // Add other plugins/tasks such as code coverage here
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // modify browser launch arguments
  // https://on.cypress.io/browser-launch-api

  return extendedConfig;
};


