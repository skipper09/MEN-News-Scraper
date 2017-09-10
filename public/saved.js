$.getJSON("/saved", function(data) {
    for (var i=0; i<data.length; i++) {
        $("#saved").append("<p>" + data[i].title + "<br />" + data[i].link + "</p>")
        // $("#saved").append("<button data-id='" + data[i]._id + "' class='save-result'>Save Article</button>")
    }
});