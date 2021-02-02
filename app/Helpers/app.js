const AppContainer = require("../container")

const app = (moduleName) => AppContainer.resolve(moduleName);


module.exports = app