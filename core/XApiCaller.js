"use strict";

/* Node modules */
const fs = require("fs");
const https = require("https");
const querystring = require("querystring");

/* Classes */
const HttpxClass = require("./Httpx.js");
const LogClass = require("./Log.js");

class XApiCaller
{
  /* @-<authorize *************************************************************/
  /****************************************************************************/
  authorize(clientId, clientSecret, origin, callback)
  {
    /* Helpers */
    const Httpx = new HttpxClass();
    const requestProtocol = global.settings.environment === "production" ? "https" : "http";

    /* Settings */
    const host = global.settings.xapi.host;
    const parameters = querystring.stringify(
    {
      "client_id" : clientId,
      "client_secret" : clientSecret
    });
    const path = global.settings.xapi.authorizationPath;
    const options = 
    {
      headers: 
      {
        "Accept" : "application/json",
        "Content-Length" : Buffer.byteLength(parameters),
        "Content-Type" : "application/x-www-form-urlencoded",
        "Origin" : origin 
      },
      host: host,
      path: path,
      method: "POST"
    };

    /* POST call */
    let responseBody = "";
    let request = Httpx.request(requestProtocol, options, function(response)
    {
      response.setEncoding("utf8");

      if(response.statusCode === 200) // success
      {
        response.on("data", function(chunk)
        {
          responseBody += chunk;
        });
        
        response.on("end", function()
        {
          return callback(JSON.parse(responseBody));
        });
      }
      else // error
      {
        const Log = new LogClass();
        
        Log.error({"message" : "XApiCaller.authorize request response", "code" : response.statusCode, "responseHeaders" : response.headers, "responseBody" : responseBody});

        return callback(false);
      }
    });

    request.end(parameters);
  }

  /* @-<call ******************************************************************/
  /****************************************************************************/
  call(clientId, identifier, selector, origin, callback)
  {
    /* Helpers */
    const Httpx = new HttpxClass();
    const requestProtocol = global.settings.environment === "production" ? "https" : "http";
   
    /* Settings */
    const host = global.settings.xapi.host;
    const parameters = querystring.stringify(
    {
      "client_id" : clientId,
      "identifier" : identifier,
      "selector" : selector
    });
    const path = global.settings.xapi.path;
    const options = 
    {
      headers: 
      {
        "Accept" : "application/json",
        "Content-Length" : Buffer.byteLength(parameters),
        "Content-Type" : "application/x-www-form-urlencoded",
        "Origin" : origin 
      },
      host: host,
      path: path,
      method: "POST"
    };

    /* POST call */
    let responseBody = "";
    let request = Httpx.request(requestProtocol, options, function(response)
    {
      response.setEncoding("utf8");
      
      if(response.statusCode === 200) // success
      {
        response.on("data", function(chunk)
        {
          responseBody += chunk;
        });
        
        response.on("end", function()
        {
          return callback(JSON.parse(responseBody));
        });
      }
      else // error
      {
        const Log = new LogClass();
        
        Log.error({"message" : "XApiCaller.call request response", "code" : response.statusCode, "responseHeaders" : response.headers, "responseBody" : responseBody});
        
        return callback(false);
      }
    });

    request.end(parameters);    
  }
};

/* Export */
module.exports = XApiCaller;