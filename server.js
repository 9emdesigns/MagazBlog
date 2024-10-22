const htttp = require("http");
const app = require("./Api/app");

const server = htttp.createServer(app);
server.listen(4000);