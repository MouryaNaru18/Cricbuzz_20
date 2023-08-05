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

router.get("/:id/match/:match_id", async(req, res) => {
    try{
        const {id, match_id} = req.params;
        const user = await pool.query(`
        SELECT player_match.player_id, player.player_name FROM player_match, player, (SELECT DISTINCT(team.team_id) AS tid FROM ball_by_ball, player_match, team
        WHERE player_match.player_id=ball_by_ball.striker AND  player_match.match_id=ball_by_ball.match_id AND player_match.team_id=team.team_id AND ball_by_ball.match_id=$2 AND ball_by_ball.innings_no=$1) AS t WHERE t.tid = player_match.team_id AND player_match.match_id=$2 AND player_match.player_id = player.player_id`, [id, match_id]);
        res.json(user.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})
module.exports = router;