const Project = require('../models/Project');

const createProject = async (req, res) => {
    const { title } = req.body;

    try {
        const projectCount = await Project.countDocuments({ user: req.user.id });

        if (projectCount >= 4) {
            return res.status(400).json({ message: "You can create up to 4 projects only." });
        }

        const project = await Project.create({
            title,
            user: req.user.id,
        });

        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to create project." });
    }
};

const getProjects=async(req,res)=>{
    try{
        const projects=await Project.find({}).populate('user','name');
        res.status(200).json({projects});
    }catch(error){
        res.status(500).json({message:"Internal Server error"});
    }
}

module.exports = { createProject , getProjects };
