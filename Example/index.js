require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const authTestRoute = require("./routes/test-auth");
const campaignTestRoute = require("./routes/test-campaign");
const labelsTestRoute = require("./routes/test-labels");
const uploadTestRoute = require("./routes/test-upload");
const userTestRoute = require("./routes/test-user");

const app = express();
const PORT = 5000;

app.use(morgan("dev"));

// mocks user authentication
app.use((req, res, next) => {
  req.user = { id: "123456789" };
  next();
});

app.use(authTestRoute);
app.use(campaignTestRoute);
app.use(labelsTestRoute);
app.use(uploadTestRoute);
app.use(userTestRoute);

app.get("/", (req, res) => res.sendFile(__dirname+'/views/index.html'));

app.listen(PORT, () => console.log(`listening to port ${PORT}`));
