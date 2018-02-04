"use strict";

/* Node modules */
const handlebars = require("handlebars"); 
const template = require("./../core/Template.js");

class ErrorController
{
  /* @-<render ****************************************************************/
  /****************************************************************************/
  render(request, response)
  {
    /* Helpers */
    let parameters = {};
    const Template = new template();

    Template.compile("error", parameters, function(template)
    {
      response.writeHead(404, {"Content-Type" : "text/html"});
      response.end(template);
    });
  }
};

/* Export */
module.exports = ErrorController;