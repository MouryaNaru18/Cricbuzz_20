const router = require('express').Router();
const pool = require("../db");

router.get("/", async(req, res) => {
    try{
        const user = await pool.query("SELECT * FROM team");
        res.json(user.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})
module.exports = router;