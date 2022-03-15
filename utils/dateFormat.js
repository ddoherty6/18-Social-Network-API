const moment = require('moment');

module.exports = createdAtVal => moment(createdAtVal).format('LLL');