var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ResultsSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    // comment: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Comment"
    // }]
});

var Results = mongoose.model("Results", ResultsSchema);

module.exports = Results;
