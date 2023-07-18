const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/auth", require('./routes/jwtAuth'));

// dashboard
app.use("/dashboard", require("./routes/dashboard"));

app.use("/todos", require('./routes/todos'));
app.listen(5000, () =>{
    console.log("Server is running on port 5000")
});