const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { connect } = require("./utils/connectdb");

//global middleware
app.use(cors());
app.use(express.json());

connect();

//routes
const paintingRoutes = require("./routes/printings.route");
app.use("/paintings", paintingRoutes);

app.get("/", (req, res) => {
  res.send({ data: "server is running", status: 200 });
});

app.listen(port, () => {
  console.log("server listening on port " + port);
});
