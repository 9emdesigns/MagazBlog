const htttp = require("http");
const app = require("./Api/app");
//const debug = require("debug");

const port = process.env.PORT || 4000;
app.set("port", port);
const server = htttp.createServer(app);
server.listen(port);

/* const normalizeport = (val) => {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
};

const bind = typeof addr === "string" ? "pipe" + addr : "port";
switch (error.code) {
  case "EACCESS":
    console.error(bind + "Requires elavated priviliges");
    process.exit(1);
    break;
  case "EADDRINUSE":
    console.error(bind + "Already in  use");
    process.emit(1);
    break;
  default:
    throw error;
}

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
  debug("listening on" + bind);
};

port = normalizeport(4000);
app.set("port", port);

const server = htttp.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
 */
