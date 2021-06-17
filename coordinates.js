const browserEnv = require('browser-env');
if ("geolocation" in browserEnv['navigator']) {
    console.log("Available");
} else {
    console.log("Not Available");
}