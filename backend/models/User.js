const {Schema,model}=require("mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true,
        required:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required:true,
        match:[
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character'
        ]
    },
    name:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
});

module.exports=model('User',userSchema);