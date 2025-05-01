const express=require("express");
const router=express.Router();
const {createTask,readTasks,updateTask,deleteTask,deleteAllTasks, overViewTasks}=require("../controllers/taskController");
const {authenticateRoute}=require("../middleware/authenticate");

router.post('/',authenticateRoute,createTask);
router.get('/',readTasks);
router.get('/tasks-overview',authenticateRoute,overViewTasks);
router.put('/:id',authenticateRoute,updateTask);
router.delete('/:id',authenticateRoute,deleteTask);
router.delete('/delete-all',authenticateRoute,deleteAllTasks);

module.exports=router;