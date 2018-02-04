"use strict";

/* Classes */
let Library = require("./Library.js");

class Router
{
  /* @-<resolve ***************************************************************/
  /****************************************************************************/
  resolve(request, response)
  {
    /* Helpers */
    let requestUri = this.sanitizeRequestUri(request.url);

    if(requestUri === false) // error 404
    {
      const Template = new template();

      Template.compile("error", { code : 404 }, function(template)
      {
        response.writeHead(404, {"Content-Type" : "text/html"});
        response.end(template);  

        return true;
      });
    }

    /* Reverse proxy server exception */
    if(requestUri === "index.html.var")
    {
      requestUri = "index";
    }

    /* Helpers */
    requestUri = Library.capitalizeAfterDash(requestUri);
    let requestUriArray = Library.capitalizeArray(requestUri.split("/"));
    let controllerClass = requestUriArray[0] + "Controller";
    let controllerMethod = "render" + Library.arrayRemoveIndex(requestUriArray, 0).join("/");
    
    try // call url controller and render method corresponding with request
    {
      const controller = require("./../controllers/" + controllerClass + ".js");
      const Controller = new controller();
      
      Controller[controllerMethod](request, response);
    }
    catch(error)  // call error controller with default render method
    {
      const errorController = require("./../controllers/ErrorController.js");
      const ErrorController = new errorController();
      
      ErrorController.render(request, response);
    }
  }

  /* @-<sanitizeRequestUri ****************************************************/
  /****************************************************************************/
  sanitizeRequestUri(requestUri)
  {
    if(requestUri === "" || requestUri === "/")
    {
      return "index";
    }

    if(requestUri[0] === "/") // remove first slash if it is at first position
    {
      requestUri = requestUri.substr(1);
    }

    if(requestUri.substr(-1) === "/") // remove last slash if it is at last position
    {
      requestUri = requestUri.slice(0, -1);
    }

    if(requestUri === "" || requestUri === "index")
    {
      return false;
    }

    return requestUri;
  }
}

/* Export */
module.exports = Router;