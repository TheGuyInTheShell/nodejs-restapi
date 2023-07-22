require("dotenv").config();
const { dbConnect } = require("../db/config");
const express = require("express");
const cors = require("cors");
const paths = require("./paths");
const fileupload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.paths = paths;
    this.init();
  }
  async init() {
    await this.dbConnect();
    this.middlewares();
    this.routes();
  }
  async dbConnect() {
    await dbConnect();
  }
  middlewares() {
    this.app.use((_, res, next) => {
      res.header("Referrer-Policy", "no-referrer-when-downgrade");
      next();
    });
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(fileupload({
      createParentPath: true
    }));
  }

  routes() {
    this.paths.forEach(({ uri, filepath }) => this.app.use(uri, filepath()));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
