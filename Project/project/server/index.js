// import constants from './constants';

const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());

// ROUTES

// app.use("/dashboard", require("./routes/dashboard"));

app.use("/matches", require('./routes/matches'));
app.use("/team", require('./routes/team'));
app.use("/venue", require('./routes/venue'));
app.use("/scores", require('./routes/scores'));
app.use("/wickets", require('./routes/wickets'));
app.use("/players", require('./routes/players'));
app.use("/pointstable", require('./routes/pointstable'));

app.listen(5000, () =>{
    console.log("Server is running on port 5000")
});