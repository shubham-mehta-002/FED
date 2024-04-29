const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Please enter fist name"]
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    username : {
        type:String,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    likedSongs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Song"
    }],
    recentPlays:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Song"
    }],
    subscribedArtists:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    createdPlaylists:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Playlist"
    }],
    accountType:{
        type:String,
        enum:["Free","Premium"],
        default:"Free"
    },
    songsOwned:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Song"
    }],
    profileImage: {
        type:String,
        default : "https://res.cloudinary.com/dudcrgnld/image/upload/v1714301578/User/dcae50bc-3eeb-40f0-9a3f-389c266c95de.png"
    }
   

    
},)


const User = mongoose.model("User",userSchema)


module.exports = User