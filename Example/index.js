require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const authTestRoute = require("./routes/test-auth");
const campaignTestRoute = require("./routes/test-campaign");
const labelsTestRoute = require("./routes/test-labels");
const uploadTestRoute = require("./routes/test-upload");
const userTestRoute = require("./routes/test-user");

const app = express();
const PORT = 30000;

app.use(express.json());
app.use(morgan("dev"));

// mocks user authentication
app.use((req, res, next) => {
  req.user = { id: "123456789" };
  next();
});

app.use('/tests/oauth', authTestRoute);
app.use('/tests/campaign', campaignTestRoute);
app.use('/tests/label', labelsTestRoute);
app.use('/tests/uploader', uploadTestRoute);
app.use('/tests/user', userTestRoute);
app.use(express.static(__dirname+'/static', { extensions: ['html']}))

app.listen(PORT, () => console.log(`listening to port ${PORT}`));
