const CssBoilerplate = require("@/assets/templates/CssBoilerplate.css.txt");
const VueBoilerplateHtml = require("@/assets/templates/VueBoilerplate.html.txt");
const VueBoilerplateJs = require("@/assets/templates/VueBoilerplate.js.txt");
const ThreeBoilerplateHtml = require("@/assets/templates/ThreeJsBoilerplate.html.txt");
const ThreeBoilerplateJs = require("@/assets/templates/ThreeJsBoilerplate.js.txt");
const ReactBoilerplate = require("@/assets/templates/ReactBoilerplate.html.txt");
const BootstrapBoilerplate = require("@/assets/templates/BootstrapBoilerplate.html.txt");
const MaterializeBoilerplate = require("@/assets/templates/MaterializeBoilerplate.html.txt");

export function getBoilerplates() {
  return {
    Clear: {
      css: "",
      html: "",
      javascript: ""
    },
    CssBoilerplate: {
      title: "Css @1 template",
      css: CssBoilerplate
    },
    VueBoilerplate: {
      title: "Vue template",
      html: VueBoilerplateHtml,
      javascript: VueBoilerplateJs
    },
    ReactBoilerplate: {
      title: "React template",
      html: ReactBoilerplate
    },
    BootstrapBoilerplate: {
      title: "Bootstrap + jQuery",
      html: BootstrapBoilerplate
    },
    ThreeBoilerplate: {
      title: "ThreeJs template",
      html: ThreeBoilerplateHtml,
      javascript: ThreeBoilerplateJs
    },
    MaterializeBoilerplate: {
      title: "Materialize template",
      html: MaterializeBoilerplate
    }
  };
}