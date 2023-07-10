const router = require('express').Router();
const pool = require("../db");
const authorization = require('../middleware/authorization');
// get all Todos
router.get("/", authorization, async (req, res) =>{
    try {
        const allTodos = await pool.query("SELECT todo_id, description FROM todo WHERE todo_user = $1", [req.user]);
        res.json(allTodos.rows);
    } catch (error) {
        console.error(err.message);
    }
});
// get a todo
router.get("/:id", authorization, async (req, res) =>{
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
});
// update a todo
router.put("/:id", authorization, async (req, res) => {
    try{
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);
        res.json("Todo was Updated");
    }catch(err){
        console.error(err.message);
    }
})
// delete a todo
router.delete("/:id", authorization, async (req, res) =>{
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted");
    } catch (error) {
        console.error(err.message);
    }
});
// insert todo
router.post("/", async (req, res) => {
    try{
        const {description, user_id} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description, todo_user) VALUES ($1, $2) RETURNING *",[description, user_id]);
        res.json(newTodo.rows[0]);
    }catch(err){
        console.error(err.message);
    }
});

module.exports = router;
