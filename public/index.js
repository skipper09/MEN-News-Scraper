$.getJSON("/results", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#results").append("<p>" + data[i].title + "<br />" + data[i].link + "</p>")
        $("#results").append("<button data-id='" + data[i]._id + "' class='save-result'>Save Article</button>")
    }
});

$(document).on("click", "#clear-scraper", function () {
    $.ajax({
        type: 'DELETE',
        url: '/clear',
        success: function (response) {
            if (response == 'error') {
                console.log('Err!');
            }
            else {
                alert('Success');
                location.reload();
            }
        }
    });
});

$(document).on("click", ".save-result", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/save/" + thisId,
    }).done(function (data) {
            console.log(data);
    });
})

