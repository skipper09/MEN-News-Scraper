var express = require("express"),
    exphbs = require("express-handlebars"),
    mongoose = require("mongoose"),
    cheerio = require("cheerio"),
    bodyParser = require("body-parser"),
    request = require("request");
    
mongoose.Promise = Promise;

var Results = require("./models/results.js"),
    Saved = require("./models/saved.js"),
    Comments = require("./models/comments.js");

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/MENnewsScraper");    
var db = mongoose.connection

db.on("error", function(error) {
     console.log("Mongoose error:", error)
});

db.once("open", function() {
    console.log("Mongoose connection successful")
});

//ROUTES GO HERE
app.get("/scrape", function(req, res) {
    request("https://www.reddit.com/r/news/", function(error, response, html) {
        var $ = cheerio.load(html);

        $("p.title").each(function(i, element) {
            var result = {};

            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            var entry = new Results(result);

            entry.save(function(err, doc) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(doc)
                }
            })
        })
    });
    res.send("Scrape Complete");
})

app.get("/results", function(req, res) {

    Results.find({}, function(error, doc) {
        
        if (error) {
            console.log(error)
        } else {
            res.json(doc)
        }
    });
});






// END ROUTES HERE



app.listen(3000, function() {
    console.log("App running on port 3000")
});



