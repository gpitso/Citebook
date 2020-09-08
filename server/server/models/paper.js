const mongoose = require("mongoose");
const Schema = mongoose.Schema;



let paper = new Schema(
  {
    title: {
      type: String
    },
    user_id:{
      type : [String]
    },
    citatedby:{
      type: [String]
    },
    declared_citations:{
      type: [String]
    },
    link: { 
       type: String
    },
    active:{
        type : Number
    },
    pending:{
        type : Number
    },
    citation_points:{
        type: Number
    },
    venue:{
      type:String
    },
    authors:{
      type: [String]
    },
    publish_timer:{
        type: Date
    }
  },
  { collection: "Papers" }
);

module.exports = mongoose.model("paper", paper);

