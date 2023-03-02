import Handlebars from 'handlebars';

export default function registerHelpers() {
  Handlebars.registerHelper('gt', function (_a, _b, _options) {
    let b = _b;
    const a = _a;
    let options = _options;
    if (arguments.length === 2) {
      options = b;
      b = options.hash.compare;
    }
    return a > b;
  });

  Handlebars.registerHelper('eq', function (_a, _b, _options) {
    let b = _b;
    const a = _a;
    let options = _options;
    if (arguments.length === 2) {
      options = b;
      b = options.hash.compare;
    }
    return a === b;
  });
}
