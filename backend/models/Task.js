const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Todo', 'In-Progress', 'Done'],
        default: 'Todo',
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    completedAt:{
        type:Date,
        default:null,
    }
});

taskSchema.pre('save',function(next){
    if(this.isModified('status')){
        if(this.status==='Done'){
            this.completed=true,
            this.completedAt=new Date();
        }else{
            this.completed=false;
            this.completedAt=null;
        }
    }
    next();
})

module.exports = model('Task', taskSchema);
