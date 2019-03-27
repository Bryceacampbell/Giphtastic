$(document).ready(function () {

    var topics = ["Cow", "Salamander", "Dog", "Lion", "Cat", "Mouse"];

    function displayGiphs() {

        var apiKey = "&api_key=XjmOX9opgMVRT51gAK5D5hi5nSVbiEgD";
        var limit = "&limit=10"
        var animalSelection = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalSelection + apiKey + limit;
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {
            // console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    //creating div to hold all of the data 
                    var animalDiv = $("<div>");
                    animalDiv.addClass("gif-container");

                    //parsing data and storing into variables
                    var rating = results[i].rating;
                    var animatedGif = results[i].images.fixed_height.url;
                    var stillGif = results[i].images.fixed_height_still.url;

                    //creating image tag and p
                    var imageTag = $("<img>");
                    var paragraphTag = $("<p>").text("Rating: " + rating);

                    //initially set image to still
                    imageTag.attr("src", stillGif);
                    imageTag.attr("data-state", "still");
                    imageTag.attr("data-still", stillGif);

                    //add animated url
                    imageTag.attr("data-animate", animatedGif);
                    imageTag.addClass("gif-image");

                    //appending image and paragraph to div
                    animalDiv.append(paragraphTag);
                    animalDiv.append(imageTag);

                    //pushing data to HTML
                    $("#gif-display").prepend(animalDiv);
                }
            }
        })
    };


    //on click event listener to run the displaygiphs function
    $(document).on("click", ".animal-button", displayGiphs);

    //on click event listener to change img source from 
    $(document).on("click", ".gif-image", function(){

        console.log("test click");
        
        var dataState = $(this).attr("data-state");

        //if else statement to determine if gif is still or animate
        if (dataState === "still") {

            //changing img src to animate
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            console.log('animate');
            
        } 
        else {

            //changing img src to still
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });

    


    function renderButtons() {

        $("#button-display").empty();

        for (var i = 0; i < topics.length; i++) {

            var animalButton = $("<button>");
            animalButton.addClass("animal-button");
            animalButton.attr("data-name", topics[i]);
            animalButton.text(topics[i]);
            $("#button-display").append(animalButton);

        }
    };

    $("#add-button").on("click", function (event) {

        event.preventDefault();
        var newAnimal = $("#animal-input").val().trim();
        topics.push(newAnimal);
        renderButtons();

    });

    renderButtons();

});