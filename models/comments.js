var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
    body: {
        type: String
    }
});

var Comments = mongoose.model("Comment", CommentsSchema);

module.exports = Comments;