"use strict";

/* Node modules */
const fs = require("fs");
const ini = require("ini"); 

/* Classes */
const XApiCallerClass = require("./../core/XApiCaller.js");

class IndexController
{
  /* @-<render ****************************************************************/
  /****************************************************************************/
  render(request, response)
  {
    /* Settings */
    const clientId = global.settings.xapi.clientId;
    const clientSecret = global.settings.xapi.clientSecret;

    /* Helpers */
    const XApiCaller = new XApiCallerClass();

    /* Authorize to API */
    XApiCaller.authorize(clientId, clientSecret, request.headers.host, function(authApiResponse)
    {
      /* Validate server response */
      if(authApiResponse === false)
      {
        response.writeHead(500, {"Content-Type" : "application/json"});
        response.end(JSON.stringify({message : "API error"}));
      }

      const identifier = authApiResponse.identifier;
      const selector = authApiResponse.selector;

      /* Call API */
      XApiCaller.call(clientId, identifier, selector, request.headers.host, function(apiResponse)
      {
        /* Validate server response */
        if(apiResponse === false)
        {
          response.writeHead(500, {"Content-Type" : "application/json"});
          response.end(JSON.stringify({message : "API error"}));
        }
        
        response.writeHead(200, {"Content-Type" : "application/json"});
        response.end(JSON.stringify(apiResponse));
      });
    });
  }
};

/* Export */
module.exports = IndexController;