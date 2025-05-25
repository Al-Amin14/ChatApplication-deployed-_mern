import mongoose from 'mongoose'

const singupSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    conformPassword:{
        type:String,
        required:true
    }
    },
    {
        timestamps:true,
    }
)

const users= mongoose.model('users',singupSchema)
export default users    
