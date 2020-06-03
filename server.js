var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

var controller = require("./controller");
var routes = require("./routes");

var app = express();
const Port = process.env.PORT || 5000;

// MIDDLEWARES
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
// personalised logger middleware (optional)
const LoggerMiddleware = (req, res, next) => {
  console.log(`Logged ${req.url} - ${req.method} --- ${new Date()}`);
  next();
};
app.use(LoggerMiddleware);

// DB CONNECTION
mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log("err");
  } else {
    console.log("connected to DB");
  }
});
mongoose.set("useCreateIndex", true);
mongoose.set("debug", true);

// ROUTE
app.get("/", function (req, res) {
  res.send("/ check");
});
app.get("/user", controller.auth.user.check);
app.get("/basic", controller.basic);
app.use("/api", routes);

// CONNECTION
app.listen(Port, "0.0.0.0");
console.log("server running on port: http://localhost:" + Port);
