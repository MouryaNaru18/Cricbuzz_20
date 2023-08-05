const router = require('express').Router();
const pool = require("../db");

// Try to understand this query when there is time and try to write it in own
router.get("/:year", async (req, res) => {
    try {
        const { year } = req.params;
        // ({ year } = req.params);
        // year = parseInt(year.trim());
        const pointsTable = await pool.query(`SELECT team.team_name, m3.matches, m3.win, m3.matches-m3.win as lost, ROUND((i3.run1*1.0/i3.ball1)-(i3.run2*1.0/i3.ball2),3) as nrr,  m3.win*2 as points
        FROM ( SELECT COALESCE(m1.team1,m2.team2) as team_id, COALESCE(m1.matches,0)+COALESCE(m2.matches,0) as matches, COALESCE(m1.wins,0)+COALESCE(m2.wins,0) as win
        FROM ( SELECT team1, COUNT(match_winner) AS matches, SUM(CASE WHEN team1=match_winner THEN 1 ELSE 0 END) AS wins 
        FROM match 
        WHERE match.season_year=$1
        GROUP BY team1) AS m1 FULL OUTER JOIN ( SELECT team2, COUNT(match_winner) AS matches, SUM(CASE WHEN team2=match_winner THEN 1 ELSE 0 END) AS wins 
        FROM match 
        WHERE match.season_year=$1
        GROUP BY team2 ) AS m2
        ON m1.team1=m2.team2 ) AS m3, ( SELECT i1.team_id, SUM(i1.overs) as ball1, SUM(i1.runs) as run1, SUM(i2.runs) as run2, SUM(i2.overs) as ball2
        FROM ( SELECT ball_by_ball.match_id, player_match.team_id, SUM(ball_by_ball.runs_scored+ball_by_ball.extra_runs) AS runs , COUNT(DISTINCT ball_by_ball.over_id) as overs
        FROM ball_by_ball, player_match, match
        WHERE ball_by_ball.match_id=player_match.match_id AND ball_by_ball.striker=player_match.player_id AND ball_by_ball.match_id=match.match_id AND match.season_year=$1
        GROUP BY ball_by_ball.match_id, player_match.team_id ) AS i1, ( SELECT ball_by_ball.match_id, player_match.team_id, SUM(ball_by_ball.runs_scored+ball_by_ball.extra_runs) AS runs , COUNT(DISTINCT ball_by_ball.over_id) as overs
        FROM ball_by_ball, player_match, match
        WHERE ball_by_ball.match_id=player_match.match_id AND ball_by_ball.striker=player_match.player_id AND ball_by_ball.match_id=match.match_id AND match.season_year=$1
        GROUP BY ball_by_ball.match_id, player_match.team_id ) AS i2
        WHERE i1.match_id=i2.match_id AND i1.team_id<>i2.team_id
        GROUP BY i1.team_id ) AS i3, team
        WHERE m3.team_id=i3.team_id AND m3.team_id=team.team_id
        ORDER BY m3.win DESC, (i3.run1*1.0/i3.ball1)-(i3.run2*1.0/i3.ball2) DESC`
            , [year]);
        res.json(pointsTable.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
