const mongoose = require("mongoose");
const Schema = mongoose.Schema;



let declared_citations = new Schema(
  {
    paper_from: {
      type: String
    },
    paper_to: {
      type: String
    },
    user_id:{
      type : String
    },
    friend_id:{
      type: String
    },
    link:{
        type : String
    },
    declared_date:{
        type: Date
    },
    confirmed_Date:{
        type: Date
    },
    authors:{
      type : [String]
    }
  },
  { collection: "Declared_citations" }
);

module.exports = mongoose.model("declared_citations", declared_citations);

