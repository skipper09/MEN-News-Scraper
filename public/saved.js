$(document).on("click", ".comment", function() {
    $("#myModal").css( "display", "block" );
})

$(document).on("click", ".close", function() {
    $("#myModal").css( "display", "none" );
})

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

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





