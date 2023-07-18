const router = require('express').Router();
const pool = require("../db");

//  Avg -- Not correct no of outs
// no of balls count could be wrong bcs of leg byes -- cant be done

router.get("/prof/:id", async(req, res) => {
    try{
        // res.json(req.user);
        // console.log(req.query);
        const { id } = req.params;
        // console.log(id);
        // let prof;
        const user = await pool.query("SELECT * FROM player WHERE player_id = $1", [id]);
        res.json(user.rows[0]);
    }catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

router.get("/bat/:id", async(req, res) => {
    try{
        // res.json(req.user);
        // console.log(req.query);
        const { id } = req.params;
        // console.log(id);
        let prof;
        const n_matches = await pool.query("SELECT COUNT(*) FROM player_match WHERE player_id = $1", [id]);
        const runs_scored = await pool.query("SELECT SUM(runs_scored) FROM ball_by_ball WHERE striker=$1", [id]);
        const runs_4 = await pool.query("SELECT SUM(runs_scored) FROM ball_by_ball WHERE striker=$1 AND runs_scored=4", [id]);
        const runs_6 = await pool.query("SELECT SUM(runs_scored) FROM ball_by_ball WHERE striker=$1 AND runs_scored=6", [id]);
        const n_fifty = await pool.query("SELECT COUNT(*) FROM (SELECT SUM(runs_scored) FROM ball_by_ball WHERE striker=$1 GROUP BY match_id HAVING SUM(runs_scored) >= 50) AS t", [id]);
        const hs = await pool.query("SELECT MAX(runs) FROM (SELECT SUM(runs_scored) AS runs FROM ball_by_ball WHERE striker=$1 GROUP BY match_id) AS t", [id]);
        const sr = await pool.query("SELECT COUNT(*), SUM(runs_scored) FROM ball_by_ball WHERE striker=$1 AND extra_runs=0", [id]);
        const n_outs = await pool.query("SELECT COUNT(DISTINCT match_id) FROM ball_by_ball WHERE striker=$1 AND out_type is NOT NULL", [id]);
        const match_stats_bat = await pool.query("SELECT match_id, SUM(runs_scored) FROM ball_by_ball WHERE striker=$1 GROUP BY match_id", [id]);
        prof = {
            "n_matches": n_matches.rows[0].count,
            "runs_scored":runs_scored.rows[0].sum,
            "runs_4":parseInt(runs_4.rows[0].sum)/4,
            "runs_6":parseInt(runs_6.rows[0].sum)/6,
            "n_fifty": n_fifty.rows[0].count,
            "hs": hs.rows[0].max,
            "strike_rate": (sr.rows[0].sum/sr.rows[0].count)*100,
            "bat_avg": (sr.rows[0].sum/n_outs.rows[0].count),
            "match_stats_bat": match_stats_bat.rows
        }
        console.log(prof);
        res.json(prof);
    }catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

router.get("/bowl/:id", async(req, res) => {
    try{
        // res.json(req.user);
        // console.log(req.query);
        const { id } = req.params;
        // console.log(id);
        let prof;
        const n_matches = await pool.query("SELECT COUNT(*) FROM player_match WHERE player_id = $1", [id]);
        const bb_runs = await pool.query("SELECT COUNT(*), SUM(runs_scored) AS run, SUM(extra_runs) AS extra FROM ball_by_ball WHERE bowler=$1", [id]);
        const overs = await pool.query("SELECT COUNT(DISTINCT (match_id,over_id)) FROM ball_by_ball WHERE bowler=$1", [id]);
        const wkts = await pool.query("SELECT COUNT(*) FROM ball_by_ball WHERE out_type IS NOT NULL AND out_type NOT ILIKE 'run out' AND bowler=$1", [id]);
        const five_wkts = await pool.query("SELECT COUNT(*) FROM ball_by_ball WHERE out_type IS NOT NULL AND out_type NOT ILIKE 'run out' AND bowler=$1 GROUP BY match_id HAVING COUNT(*) >= 5", [id]);
        const match_stats_bowl  = await pool.query("SELECT runs_subquery.match_id, runs_scored_sum, extra, outs FROM (SELECT match_id, SUM(runs_scored) AS runs_scored_sum, SUM(extra_runs) AS extra FROM ball_by_ball WHERE bowler = $1 GROUP BY match_id) AS runs_subquery LEFT JOIN (SELECT match_id, COUNT(*) AS outs FROM ball_by_ball WHERE bowler = $1 AND out_type IS NOT NULL AND out_type NOT ILIKE 'run out' GROUP BY match_id) AS out_subquery ON runs_subquery.match_id = out_subquery.match_id", [id]);
        prof = {
            "n_matches": n_matches.rows[0].count,
            "balls_bowl":bb_runs.rows[0].count,
            "runs":parseInt(bb_runs.rows[0].run) + parseInt(bb_runs.rows[0].extra),
            "overs":overs.rows[0].count,
            "wkts": wkts.rows[0].count,
            "eco": (parseInt(bb_runs.rows[0].run) + parseInt(bb_runs.rows[0].extra))/parseInt(overs.rows[0].count),
            "five_wkts": five_wkts.rowCount > 0 ? five_wkts.rows[0].count : 0,
            "match_stats_bowl": match_stats_bowl.rows
        }
        console.log(prof);
        res.json(prof);
    }catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

module.exports = router;
