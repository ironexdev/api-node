"use strict";

class Library
{
  /* @-<arrayRemoveIndex ******************************************************/
  /****************************************************************************/
  static arrayRemoveIndex(array, index)
  {
    let newArray = [];

    for(let i = 0; i < array.length; i++)
    {
      if(i === index)
      {
        continue;
      }

      newArray[i] = array[i];
    }

    return newArray;
  }

  /* @-<capitalize ************************************************************/
  /****************************************************************************/
  static capitalize(string)
  {
    let firstLetter = string[0];

    firstLetter = firstLetter.toUpperCase();

    return firstLetter + string.slice(1);
  }

  /* @-<capitalizeAfterArray **************************************************/
  /****************************************************************************/
  static capitalizeArray(array)
  {
    let newArray = [];

    for(let i = 0; i < array.length; i++)
    {
      newArray.push(Library.capitalize(array[i]));
    }

    return newArray;
  }

  /* @-<capitalizeAfterDash ***************************************************/
  /****************************************************************************/
  static capitalizeAfterDash(string)
  {
    let newString = "";
    let capitalize = false;
    
    for(var i = 0; i < string.length; i++)
    {
      if(string[i] === "-")
      {
        capitalize = true;
      }
      else
      {
        if(capitalize === true)
        {
          newString += string[i].toUpperCase()
          capitalize = false;
        }
        else
        {
          newString += string[i];
        }
      }
    }
    
    return newString;
  }
};

/* Export */
module.exports = Library;