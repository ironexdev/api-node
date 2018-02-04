"use strict";

/* Node modules */
const fs = require("fs");
const handlebars = require("handlebars");

class Template
{
  /* @-<compile ***************************************************************/
  /****************************************************************************/
  compile(templateName, parameters, callback)
  {
    fs.readFile("./templates/" + templateName + ".hbs", function(error, data)
    {
      let source = data.toString();
      let template = handlebars.compile(source);
      template = template(parameters);
   
      callback(template);
    });
  }
}

/* Export */
module.exports = Template;