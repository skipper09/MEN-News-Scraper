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

db.on("error", function (error) {
    console.log("Mongoose error:", error)
});

db.once("open", function () {
    console.log("Mongoose connection successful")
});

//ROUTES GO HERE
app.get("/scrape", function (req, res) {
    request("https://www.reddit.com/r/news/", function (error, response, html) {
        var $ = cheerio.load(html);

        $("p.title").each(function (i, element) {
            var result = {};

            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            var entry = new Results(result);

            entry.save(function (err, doc) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(doc)
                }
            })
        })
    });
    res.redirect("/");
})

app.get("/results", function (req, res) {
    Results.find({}, function (error, doc) {

        if (error) {
            console.log(error)
        } else {
            res.json(doc)
        }
    });
});

app.get("/saved", function (req, res) {
    Saved.find({}, function (error, doc) {

        if (error) {
            console.log(error)
        } else {
            res.json(doc)
        }
    });
});

app.get("/saved/:id", function (req, res) {
    Saved.findOne({ "_id": req.params.id })
        .populate("comment").exec(function (err, doc) {
            if (err) {
                console.log(error);
            } else {
                res.json(doc);
            }
        });
});

app.post("/saved/:id", function (req, res) {
    var newComment = new Comments(req.body);

    newComment.save(function (error, doc) {
        if (error) {
            console.log(error)
        } else {
            Saved.findOneAndUpdate({ "_id:": req.params.id }, { "comment": doc._id })
                .exec(function (err, doc) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // Or send the document to the browser
                        console.log(doc);
                        res.send(doc);
                    }
                })
        }

    })
})

app.post("/save/:id", function (req, res) {
    Results.findOne({ "_id": req.params.id }, function (req, res) {
        console.log(res + "kghgjhggfjgfhh");

        var result = {};
        result.title = res.title;
        result.link = res.link;

        var saveArticle = new Saved(result);

        saveArticle.save(function (err, doc) {
            if (err) {
                console.log(err)
            } else {
                console.log(doc + "lkjkjhj")
                // res.send("Saved article to database")
            }
        });
    })
});

app.delete("/clear", function (req, res) {
    Results.remove({}, function (err) {
        if (err) throw err;
    });
});

app.delete("/unsave/:id", function (req, res) {
    Saved.remove({ "_id": req.params.id }, function (err) {
        if (err) throw err;
        // removed.
    });
});

// END ROUTES

app.listen(3000, function () {
    console.log("App running on port 3000")
});