$.getJSON("/results", function (data) {
    console.log(data);
    if (data.length > 0) {
        $("#results").append("<div class='article-header mx-auto'><h3>Scraped Articles</h3></div>");
        for (var i = 0; i < data.length; i++) {
            $("#results").append("<div class='article-div mx-auto shadow clearfix'><p>" + data[i].title + "</p><a href='" + data[i].link + "'>" + data[i].link + "</p></a><button data-id='" + data[i]._id + "' class='btn btn-defautl btn-sm save-result button-right mr-4 rounded-0'>Save Article</button></div>")
            // $("#results").append("<button class='index-button' data-id='" + data[i]._id + "' class='save-result'>Save Article</button></div>")
        }
    } else {
        $("#results").append("<div class='article-header mx-auto'><h3>It looks like you have no scraped articles.</h3><p>Click the button above to scrape some articles from the web!</p></div>")
    }
});

// $(document).on("click", "#clear-scraper", function () {
//     $.ajax({
//         type: 'DELETE',
//         url: '/clear',
//         success: function (response) {
//             if (response == 'error') {
//                 console.log('Err!');
//             }
//             else {
//                 alert('Success');
//                 location.reload();
//             }
//         }
//     });
// });

$(document).on("click", ".save-result", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/save/" + thisId,
    }).done(function (data) {
        console.log(data);
    });
    $("#myModal").css("display", "block");
})

$(document).on("click", ".close", function () {
    $("#myModal").css("display", "none");
})

window.onclick = function (event) {
    if (event.target == $("#myModal")) {
        $("#myModal").style.display = "none";
    }
}

