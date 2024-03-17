'use strict';

module.exports = [
  {
    type: 'input',
    name: 'sweeper.chronomancer.time',
    message: 'CRON time for Soul Sweeper',
    default: '42 2 * * *',
  },
  {
    type: 'input',
    name: 'gaston.url',
    message: 'Gaston host',
    default: 'wss://partout.cresus.ch/gaston/v1/hub/open',
  },
  {
    type: 'input',
    name: 'gaston.reconnectWait',
    message: 'Gaston wait in ms before reconnect',
    default: 5000,
  },
  {
    type: 'input',
    name: 'gaston.keepAlive',
    message: 'Gaston WebSocket keep-alive',
    default: 5000,
  },
  {
    type: 'input',
    name: 'william.url',
    message: 'URL to access the William Debtor API',
    default: 'https://partout.cresus.ch/william/v1',
  },
  {
    type: 'input',
    name: 'william.debtors.search',
    message: 'Access to the William Debtor Search API',
    default: '/debtors/search',
  },
  {
    type: 'input',
    name: 'william.debtors.debtor',
    message: 'Access to a William Debtor API',
    default: '/debtors',
  },
  {
    type: 'input',
    name: 'william.debtors.remapTo',
    message: 'Access to a William Debtor remapTo API',
    default: '/debtors/$debtorId/remap-to/$mainDebtorId',
  },
  {
    type: 'input',
    name: 'william.timeout',
    message: 'API call timeout',
    default: 60000,
  },
  {
    type: 'input',
    name: 'william.chronomancer.time',
    message: 'CRON time for fetch (used only the first time)',
    default: '0/6 * * * *',
  },
  {
    type: 'input',
    name: 'auth.url',
    message: 'URL to access the William Debtor API',
    default: 'https://partout.cresus.ch/auth/v2',
  },
  {
    type: 'input',
    name: 'auth.utilities.listAllUserids',
    message: 'Let all available user IDs',
    default: '/utilities/list-all-userids',
  },
  {
    type: 'input',
    name: 'auth.bulk.fetchUsers',
    message: 'Fetch user according to IDs',
    default: '/bulk/fetch-users',
  },
  {
    type: 'input',
    name: 'auth.timeout',
    message: 'API call timeout',
    default: 60000,
  },
  {
    type: 'input',
    name: 'auth.chronomancer.time',
    message: 'CRON time for fetch (used only the first time)',
    default: '2/6 * * * *',
  },
  {
    type: 'input',
    name: 'nautilus.rdb.host',
    message: 'RethinkDB host / IP',
    default: '127.0.0.1',
  },
  {
    type: 'input',
    name: 'nautilus.rdb.port',
    message: 'RethinkDB port',
    default: 28015,
  },
  {
    type: 'input',
    name: 'nautilus.chronomancer.time',
    message: 'CRON time for fetch (used only the first time)',
    default: '4/6 * * * *',
  },
];
