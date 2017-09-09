$.getJSON("/results", function(data) {
    for (var i=0; i<data.length; i++) {
        $("#results").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>")
    }
});