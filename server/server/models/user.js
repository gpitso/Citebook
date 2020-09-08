const mongoose = require("mongoose");
const Schema = mongoose.Schema;



let user = new Schema(
  {
    fname: {
      type: String
    },
    lname : {
      type: String
    },
    email:{
      type: String,
      unique: true 
    },
    password:{
      type: String
    },
    level: {
      type: Number
    },
    active_papers:{
      type: Number
    },
    papers_no:{
      type:Number
    },
    citation_points:{
      type:Number
    },
    last_citation:{
      type: Date
    },
    penalty_points:{
      type: Number
    },
    papers_to_be_confirmed:{
      type: [String]
    },
    requests:{
      type: [String]
    },
    img: { 
      type: String
    },
    friends: {
      type: [String]
    },
    papers:{
      type : [String]
    }
  },
  { collection: "Users" }
);

module.exports = mongoose.model("user", user);

