const App = require("./app")
const generateFakeData = require("./test/facker")

const server = new App().app
server.listen("3000", () => {
  console.log("server is listening")
  // generateFakeData(10, 5, 5)
})
