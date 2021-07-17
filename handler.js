const { handleVerifyWce } = require('./handlers/verify_wce.js');
const { handleHelp } = require('./handlers/help.js');
const { handleHelpVerify } = require('./handlers/helpVerify.js');
const { handleVerifiedWce } = require('./handlers/verified_wce.js');
const { handleClear } = require('./handlers/clear.js');
const { handleVerifiedGithub } = require('./handlers/verified_github.js');
const { handleVerifyGithub } = require('./handlers/verify_github.js');
const { handleYoutube } = require('./handlers/youtube.js');
const { handleChess } = require('./handlers/chess.js');

module.exports = {
	handleVerifyWce,
	handleHelp,
	handleHelpVerify,
	handleVerifiedWce,
	handleClear,
	handleVerifiedGithub,
	handleVerifyGithub,
	handleYoutube,
	handleChess,
};