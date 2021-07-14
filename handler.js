const { handleVerifyWce } = require('./handlers/verify_wce.js');
const { handleHelp } = require('./handlers/help.js');
const { handleHelpVerify } = require('./handlers/helpVerify.js');
const { handleVerifiedWce } = require('./handlers/verified_wce.js');
const { handleClear } = require('./handlers/clear.js');

module.exports = {
	handleVerifyWce,
	handleHelp,
	handleHelpVerify,
	handleVerifiedWce,
	handleClear
};