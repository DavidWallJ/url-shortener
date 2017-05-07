/**
 * Created by david on 5/2/17.
 */
$(document).ready(function () {

    $('#animatedInput').on("keypress", function(e) {
        if (e.keyCode == 13) {
            event.preventDefault();

            var url = "https://url-shortener-davidjwall.herokuapp.com/new/" + $('#animatedInput').val();

            $.ajax({
                type: "GET",
                url: url,
                success: function(data) {
                    // remove input val and exit text input box
                    $("#animatedInput").val('').blur();

                    // change label for obtained URL

                    $("#animatedInputLabel").empty().append("SHORT URL:");

                    // output new shortened URL

                    $("#shortenedAddress")
                        .text(data.shortenedUrl)
                        .attr("href", "https://url-shortener-davidjwall.herokuapp.com/" + data.shortenedUrl);

                    setTimeout(function(){
                        $("#shortenedAddress, .instructions").css("visibility","visible");
                        $("#animatedInputLabel").trigger( "click" );
                    }, 700);


                    console.log(data);

                }

            });


        }
    });


    $( "#animatedInput" ).focus(function() {
        $("#shortenedAddress").empty();
        $("#animatedInputLabel").empty();
        $("#animatedInputLabel").append("SUBMIT URL");
    });

    $( "#animatedInput" ).focusout(function() {
        $('#animatedInput').val('');
        $("#animatedInputLabel").empty();
        $("#animatedInputLabel").append("ENTER URL:");
    });




});