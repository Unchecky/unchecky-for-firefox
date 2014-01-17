// Import the page-mod API
var pageMod = require("sdk/page-mod");
// Import the self API
var self = require("sdk/self");
// Import locales
var _ = require("sdk/l10n").get;

// Create a page mod
// It will run a script whenever a matching URL is loaded
pageMod.PageMod({
	include: [
		/https?:\/\/get[23]?\.adobe\.com\/(.*?\/)?(reader|flashplayer)\/.*/
	],
	contentScriptFile: self.data.url("unchecky.js"),
	contentScriptOptions: {
		warning_message: _("warning")
	}
});
