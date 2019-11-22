function PlugdoJsonReader () {
  let self = this;

  this.pipeline = function (element, message) {
      if(typeof element === "string") {
          if(element.substring(0, 5) == "json:") {
              element = element.replace("json:", "");
              element = this.read(element, message);
          }
      }

      return element;
  }

  this.read = function (str, obj) {
      if(str === undefined)
          throw new Error("The json selector string is not defined");
      if(typeof str != "string")
          throw new Error("The json selector string is not defined");
      if(str.trim() == "")
          throw new Error("The json selector string is not defined");
      if(obj === undefined)
          throw new Error("The json object is not defined");
      if(Object.keys(obj).length == 0)
          throw new Error("The json object has not properties");

      const strData = str.split(".");
      let holder = obj;
      strData.forEach((element) => {

          if(element.indexOf("[")!= -1) {
              element = element.replace("]", "");
              let elementArray = element.split("[");
              element = elementArray[0];
              let index = parseInt(elementArray[1]);

              if(holder[element] === undefined)
                  throw new Error(`The property ${element} does not exists in the json object`);
              
              if(Array.isArray(holder[element]) == false)
                  throw new Error(`The property ${element} is not an array`);

              holder = holder[element][index];
          }
          else {
              if(holder[element] === undefined)
                  throw new Error(`The property ${element} does not exists in the json object`);

              holder = holder[element];
          }
      });

      return holder;
  }
}

exports.jsonReader = function () {
  return new PlugdoJsonReader();
}