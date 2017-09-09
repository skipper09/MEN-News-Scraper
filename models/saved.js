var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SavedSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

var Saved = mongoose.model("Saved", SavedSchema);

module.exports = Saved;