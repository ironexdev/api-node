"use strict";

/* Node modules */
const fs = require("fs");
const http = require("http");
const ini = require("ini"); 

/* Classes */
const RouterClass = require("./core/Router.js");

/* Helpers */
global.settings = ini.parse(fs.readFileSync("./settings.ini", "utf-8"));
const Router = new RouterClass();

/* HTTP server */
http.createServer(function(request, response)
{
  Router.resolve(request, response);
}).listen(global.settings.port, global.settings.server);

if(global.settings.environment === "production")
{
  require("daemon")();
}