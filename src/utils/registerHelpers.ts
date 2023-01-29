import Handlebars from "handlebars";

export function registerHelpers () {
  Handlebars.registerHelper('gt', function(a, b, options) {
    if (arguments.length === 2) {
      options = b;
      b = options.hash.compare;
    }
    return a > b
  });
  
  Handlebars.registerHelper('eq', function(a, b, options) {
    if (arguments.length === 2) {
      options = b;
      b = options.hash.compare;
    }
    return a === b
  });
}
