const mongoose =require("mongoose");
mongoose.connect("mongodb://localhost/rAju",{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true},()=>{
    console.log("connected to database rAju..!")
});


// articleSchema
const passportSchema = new mongoose.Schema({
    google_id:{
        type:String},
    user:{
        type:String}
});

module.exports = mongoose.model("passportjs",passportSchema);
