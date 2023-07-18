const router = require('express').Router();
const pool = require("../db");

router.get("/", async(req, res) => {
    try{
        const user = await pool.query("SELECT * FROM venue");
        res.json(user.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

router.get("/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM venue WHERE venue_id=$1", [id]);
        const n_matches = await pool.query("SELECT COUNT(*) FROM match WHERE venue_id=$1",[id]);
        const max_score = await pool.query("SELECT MAX(runs) FROM (SELECT SUM(runs_scored+extra_runs) AS runs FROM ball_by_ball WHERE match_id IN (SELECT match_id FROM match WHERE venue_id=$1) GROUP BY match_id,innings_no) AS tmp", [id]);
        const min_score = await pool.query("SELECT MIN(runs) FROM (SELECT SUM(runs_scored+extra_runs) AS runs FROM ball_by_ball WHERE match_id IN (SELECT match_id FROM match WHERE venue_id=$1) GROUP BY match_id,innings_no) AS tmp", [id]);
        const h_chase = await pool.query("SELECT MAX(runs) FROM (SELECT SUM(runs_scored+extra_runs) AS runs FROM ball_by_ball WHERE match_id IN (SELECT match_id FROM match WHERE venue_id=$1 AND win_type='wickets') GROUP BY match_id,innings_no) AS tmp ", [id])
        const bat_1 = await pool.query("SELECT COUNT(*) FROM match WHERE venue_id=$1 AND win_type ILIKE 'runs'", [id]);
        const bat_2 = await pool.query("SELECT COUNT(*) FROM match WHERE venue_id=$1 AND win_type ILIKE 'wickets'", [id]);
        const draw = await pool.query("SELECT COUNT(*) FROM match WHERE venue_id=$1 AND win_type ILIKE 'draw'", [id]);
        const first_avg_score = await pool.query("SELECT ROUND(AVG(tmp.runs),2) AS avg, tmp.year FROM (SELECT SUM(bb.runs_scored + bb.extra_runs) AS runs, m.season_year AS year FROM ball_by_ball AS bb JOIN match AS m ON m.match_id = bb.match_id WHERE bb.innings_no = 1 AND m.venue_id = $1 GROUP BY bb.match_id, m.season_year) AS tmp GROUP BY tmp.year", [id])
        const stat = {
            ...user.rows[0],
            "n_matches" : n_matches.rows[0].count,
            "max_score":parseInt(max_score.rows[0].max),
            "min_score":parseInt(min_score.rows[0].min),
            "highest_chase": h_chase.rows[0].max,
            "bat_1":bat_1.rows[0].count,
            "bat_2":bat_2.rows[0].count,
            "draw":draw.rows[0].count,
            "first_avg_score":first_avg_score.rows,
        };
        res.json(stat);
    }catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})
module.exports = router;