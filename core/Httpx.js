"use strict";

/* Node modules */
const fs = require("fs");
const http = require("http");
const https = require("https");

class Httpx
{
  /* @-<request ***************************************************************/
  /****************************************************************************/
  request(protocol, options, callback)
  {
    if(protocol === "https")
    {
        /* Helpers */
        const cert = fs.readFileSync(global.settings.ssl.cert, "utf8");
        const key = fs.readFileSync(global.settings.ssl.key, "utf8");

        /* Settings */
        options.cert = cert;
        options.key = key;
        options.port = 443;
        
        return https.request(options, callback);
    }
    else
    {
      /* Settings */
      options.port = 80;

      return http.request(options, callback);
    }
  }
};

/* Export */
module.exports = Httpx;