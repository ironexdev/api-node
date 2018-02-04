"use strict";

/* Node modules */
const fs = require("fs");
const path = require("path");

/* Helpers */
const directory = __dirname + path.sep + ".." + path.sep + "log";

class Log
{
  /* @-<dev *******************************************************************/
  /****************************************************************************/
  dev(content)
  {
    return this.save(directory + path.sep + "log_dev.json", content);
  }

  /* @-<error *****************************************************************/
  /****************************************************************************/
  error(content)
  {
    return this.save(directory + path.sep + "log_error.json", content);
  }

  /* @-<save ******************************************************************/
  /****************************************************************************/
  save(file, content)
  {
    /* Helpers */
    let fileContent;

    if(fs.existsSync(file) === true) // check if file exists and read its content if it does
    {
      fileContent = JSON.parse(fs.readFileSync(file, "utf8"));
    }
    else
    {
      fileContent = [];
    }

    /* Helpers */
    let debugBacktrace = new Error().stack;
    let dateTime = new Date(); 
    let dateTimeUTC = dateTime.getUTCDate() + "." + dateTime.getUTCMonth() + "." + dateTime.getUTCFullYear() + " " + dateTime.getUTCHours() + ":" + dateTime.getUTCMinutes() + ":" + dateTime.getUTCSeconds(); 
    let logObject = 
    {
      "datetime_utc"    : dateTimeUTC,
      "content"         : content,
      "debug_backtrace" : debugBacktrace
    };

    fileContent.push(logObject);

    let fileContentJson = JSON.stringify(fileContent, null, 2);

    fs.writeFileSync(file, fileContentJson);
  }
};

/* Export */
module.exports = Log;