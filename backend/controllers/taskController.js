const Project = require("../models/Project");
const Task = require("../models/Task");

const createTask = async (req, res) => {
  const { title, description, projectId } = req.body;

  try {
    const task = await Task.create({ title, description, project: projectId });
    const populatedTask = await Task.findById(task._id).populate(
      "project",
      "title"
    );
    res.status(201).json(populatedTask);

    // const populatedTask = await Task.findById(task._id).populate('project', 'title');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create task." });
  }
};

const readTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).populate("project", "title");
    const todoTasks=await (await Task.find({status:"Todo"})).length
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch tasks." });
  }
};

const overViewTasks = async (req, res) => {
  try {
    const result = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Initialize counts
    let counts = { todoTasks: 0, inProgressTasks: 0, doneTasks: 0 };

    // Map results to counts
    result.forEach(({ _id, count }) => {
      if (_id === "Todo") counts.todoTasks = count;
      else if (_id === "In-Progress") counts.inProgressTasks = count;
      else if (_id === "Done") counts.doneTasks = count;
    });

    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch tasks." });
  }
};
 

const updateTask = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { title, description, status } = req.body;
  console.log(req.body);
  try {
    const task = await Task.findById(id);
    console.log(task);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();

    console.log('updated task',task);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Unable to update task." });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete task." });
  }
};

const deleteAllTasks=async(req,res)=>{
    try{
        await Task.deleteMany();
        res.status(200).json({message:"Deleted all tasks"});
    }catch(error){
        res.status(400).json({message:error});
    }
}

module.exports = { createTask, readTasks, updateTask, deleteTask ,deleteAllTasks ,overViewTasks};
