/* Global equal, responseText, statement, ok, deepEqual, QUnit, module, asyncTest, Util, start */
/*jslint devel: true, browser: true, sloppy: false, maxerr: 50, indent: 4, plusplus: true */
var activityEnv = {};

module('Activities', {
	setup: function () {
		"use strict";
		Util.init(activityEnv);
	}
});

//PUT | GET | DELETE http://example.com/TCAPI/activities/<activity ID>/profile/<profile object key>
asyncTest('Profile',function () {
	"use strict";
	activityEnv.util.putGetDeleteStateTest(activityEnv, '/activities/<activity ID>/profile/');
});

//GET http://example.com/TCAPI/activities/<activity ID>
asyncTest('Definition', 3, function () {
	"use strict";
	var url = '/activities/<activity ID>/',
		env = activityEnv;

	url = url.replace('<activity ID>', encodeURIComponent(env.util.activity.id));

	env.util.request('GET', url, null, true, 200, 'OK', function (xhr) {
		var profile;
		try {
			profile = JSON.parse(xhr.responseText);
		} catch (ex) {
			profile = {};
		}
		equal(profile.id, env.util.activity.id, 'activity id');
		start();
	});
});

//GET http://example.com/TCAPI/activities/<activity ID>/profile[?since=<timestamp>]
asyncTest('Profile, multiple', function() {
	"use strict";
	activityEnv.util.getMultipleTest(activityEnv, '/activities/<activity ID>/profile');
});
