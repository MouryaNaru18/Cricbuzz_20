const router = require('express').Router();
const pool = require("../db");

// get All matches
router.get("/:id", async(req, res) => {
    try{
        // res.json(req.user);
        // console.log(req.query);
        const { id } = req.params;
        console.log(id);
        const user = await pool.query("SELECT innings_no, over_id FROM ball_by_ball WHERE match_id=$1 AND out_type is NOT NULL ORDER BY innings_no, over_id", [id]);
        
        res.json(user.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

module.exports = router;
