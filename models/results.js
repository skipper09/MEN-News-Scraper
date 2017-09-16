var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ResultsSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
});

var Results = mongoose.model("Results", ResultsSchema);

module.exports = Results;
