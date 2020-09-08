const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let account = new Schema(
    {
      email: {
        type: String,
        unique: true,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      user_id: {
        type: String
      }
    },
    { collection: "Accounts" }
  );

  module.exports = mongoose.model("account", account);
