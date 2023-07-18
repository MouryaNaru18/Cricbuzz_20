const router = require('express').Router();
const pool = require("../db");

// get All matches
router.get("/:id", async(req, res) => {
    try{
        // res.json(req.user);
        // console.log(req.query);
        const { id } = req.params;
        const user = await pool.query("SELECT innings_no, over_id,SUM(runs_scored) AS runs, SUM(extra_runs) AS extras FROM ball_by_ball WHERE match_id = $1 GROUP BY innings_no,over_id ORDER BY innings_no, over_id", [id]);
        
        res.json(user.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

module.exports = router;
