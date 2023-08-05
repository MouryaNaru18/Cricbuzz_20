const router = require('express').Router();
const pool = require("../db");

// get All matches
router.get("/", async(req, res) => {
    try{
        const user = await pool.query("SELECT * FROM match ORDER BY season_year DESC, match_id DESC OFFSET $1 LIMIT $2", [req.query.skip, req.query.limit]);
        res.json(user.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

// get info for only a match
router.get("/:id", async (req, res) =>{
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM match WHERE match_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
});

// scorecard

router.get("/:id/bowling/:innings", async(req, res) => {
    try{
        const { id, innings } = req.params;
        
        const user = await pool.query(`
        SELECT player.player_id, player.player_name as bowler,
        COUNT(DISTINCT(over_id)) as overs_bowled,COUNT(ball_by_ball.ball_id) as balls_bowled,
         SUM(ball_by_ball.runs_scored) AS runs_given,
        SUM(CASE WHEN ball_by_ball.out_type != 'run out' THEN 1 ELSE 0 END) AS wickets
        FROM player, ball_by_ball
        WHERE player.player_id=ball_by_ball.bowler AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2
        GROUP BY player.player_id`, [id, innings]);
        res.json(user.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

router.get("/:id/batting/:innings", async(req, res) => {
    try{
        const { id, innings } = req.params;
        const user = await pool.query(`
        SELECT player.player_id, player.player_name, SUM(ball_by_ball.runs_scored) AS runs, COUNT(ball_by_ball.ball_id) AS balls_faced, SUM(ball_by_ball.runs_scored) as runs, SUM(CASE WHEN ball_by_ball.runs_scored=4 THEN 1 ELSE 0 END) as fours, SUM(CASE WHEN ball_by_ball.runs_scored=6 THEN 1 ELSE 0 END) as sixes 
        FROM ball_by_ball
        INNER JOIN player ON player.player_id = ball_by_ball.striker
        WHERE ball_by_ball.match_id = $1 AND ball_by_ball.innings_no = $2
        GROUP BY player.player_id`, [id, innings]);
        res.json(user.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})
router.get("/:id/team/:innings", async(req, res) => {
    try{
        const { id, innings } = req.params;
        
        const user = await pool.query(`
        SELECT team.team_name
        FROM ball_by_ball, player_match, team
        WHERE player_match.player_id=ball_by_ball.striker AND  player_match.match_id=ball_by_ball.match_id AND player_match.team_id=team.team_id AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2
        LIMIT 1`, [id, innings]);
        const runs = await pool.query(`
        SELECT
        SUM(runs_scored) AS runs, SUM(extra_runs) AS extras,
        SUM(CASE WHEN out_type IS NOT NULL THEN 1 ELSE 0 END) AS wkts
        FROM
            ball_by_ball
        WHERE
            match_id = $1 AND innings_no = $2 LIMIT 1
        `, [id, innings])
        const fin = {...user.rows[0], ...runs.rows[0]}
        res.json(fin);
    }catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

router.get("/:id/umpires", async (req, res) => {
    try {
        const { id } = req.params;
        const allTodos = await pool.query(`SELECT umpire.umpire_name
        FROM umpire, umpire_match
        WHERE umpire.umpire_id=umpire_match.umpire_id AND umpire_match.match_id=$1`
            , [id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});


router.get("/:id/summary/:innings", async(req, res) => {
    try{
        const { id, innings } = req.params;
        const user1 = await pool.query(`
        SELECT player.player_id, player.player_name as batter, SUM(ball_by_ball.runs_scored) AS runs, COUNT(ball_by_ball.ball_id) AS balls_faced, SUM(ball_by_ball.runs_scored) as runs, SUM(CASE WHEN ball_by_ball.runs_scored=4 THEN 1 ELSE 0 END) as fours, SUM(CASE WHEN ball_by_ball.runs_scored=6 THEN 1 ELSE 0 END) as sixes 
        FROM ball_by_ball
        INNER JOIN player ON player.player_id = ball_by_ball.striker
        WHERE ball_by_ball.match_id = $1 AND ball_by_ball.innings_no = $2
        GROUP BY player.player_id ORDER BY runs DESC, balls_faced, batter  LIMIT 3`, [id, innings]);
        
        const user2 = await pool.query(`
        SELECT player.player_id, player.player_name as bowler,
        COUNT(DISTINCT(over_id)) as overs_bowled,COUNT(ball_by_ball.ball_id) as balls_bowled,
         SUM(ball_by_ball.runs_scored) AS runs_given,
        SUM(CASE WHEN ball_by_ball.out_type != 'run out' THEN 1 ELSE 0 END) AS wickets
        FROM player, ball_by_ball
        WHERE player.player_id=ball_by_ball.bowler AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2
        GROUP BY player.player_id ORDER BY wickets DESC, runs_given, bowler`, [id, innings]);
        
        res.json([user1.rows , user2.rows]);
    }catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})
router.get("/:id/runs/:innings", async(req, res) => {
    try{
        const { id, innings } = req.params;
        const user1 = await pool.query(`SELECT SUM(CASE WHEN runs_scored = 1 THEN 1 ELSE 0 END) AS ones, SUM(CASE WHEN runs_scored = 2 THEN 2 ELSE 0 END) AS twos, SUM(CASE WHEN runs_scored = 4 THEN 4 ELSE 0 END) AS fours, SUM(CASE WHEN runs_scored =  6 THEN 6 ELSE 0 END) AS sixes, SUM(extra_runs) AS extras  FROM ball_by_ball WHERE match_id = $1 AND innings_no = $2`, [id, innings]);
        res.json(user1.rows[0]);
    }catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

module.exports = router;