const router = require('express').Router();
const pool = require("../db");

// get All matches
router.get("/", async(req, res) => {
    try{
        // res.json(req.user);
        // console.log(req.query);
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

module.exports = router;