const express = require("express");
const cors = require("cors");

const dbConnector = require("../user-permissions/database");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.connectToDB();
    this.middlewares();
    this.routes();
  }

  connectToDB() {
    dbConnector();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/v1/user", require("./routes/user.route"));
    this.app.use("/api/v1/image", require("./routes/image.route"));
    this.app.use("/api/v1/group", require("./routes/group.route"));
    this.app.use("/api/v1/role", require("./routes/role.route"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Running on port", this.port);
    });
  }
}

module.exports = Server;
