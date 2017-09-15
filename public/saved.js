$.getJSON("/saved", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#saved").append("<p>" + data[i].title + "<br />" + data[i].link + "</p>")
        $("#saved").append("<button data-id='" + data[i]._id + "' class='unsave'>Unsave</button>")
        $("#saved").append("<button data-id='" + data[i]._id + "' class='comment'>View/Leave Comments</button>")
    }
});

$(document).on("click", ".unsave", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        type: 'DELETE',
        url: '/unsave/' + thisId,
        success: function (response) {
            if (response == 'error') {
                console.log('Err!');
            }
            else {
                console.log('unsaved!');
                location.reload();
            }
        }
    });
});

$(document).on("click", ".comment", function () {
    $("#modalTitle").empty();
    $("#modalComments").empty();
    $("#modalInput").empty();

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/saved/" + thisId
    })
        .done(function (data) {
            console.log(data);
            $("#modalTitle").append("<h3>Comments for " + JSON.stringify(data.title) + "</h3>");
            if (data.Comments.length > 0) {
                for (var i = 0; i < data.Comments.length; i++) {
                    $("#modalComments").append("<p>" + JSON.stringify(data.Comments[i].body) + "<p>")
                }
            } else {
                $("#modalComments").append("<p>No comments yet</p>");
            }
            $("#modalInput").append("<textarea id='bodyinput' name='body' rows='10' cols='60'></textarea>");
            $("#modalInput").append("<br><button data-id='" + data._id + "' id='leaveComment'>Add Comment</button>")
        });

    $("#myModal").css("display", "block");
})

$(document).on("click", "#leaveComment", function () {
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/saved/" + thisId,
        data: {
            body: $("#bodyinput").val()
        }
    })
        .done(function (data) {
            // Log the response
            console.log(data);
        });

    $("#myModal").css("display", "none");
})

$(document).on("click", ".close", function () {
    $("#myModal").css("display", "none");
})

window.onclick = function (event) {
    if (event.target == $("#myModal")) {
        $("#myModal").style.display = "none";
    }
}