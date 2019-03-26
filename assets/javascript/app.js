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
            console.log(response);

            var results = response.data;

          for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

              var animalDiv = $("<div>");
              animalDiv.addClass("gif-container");

              var rating = results[i].rating;
              var animatedGif = results[i].images.fixed_height.url;
              var staticGif = results[i].images.fixed_height_still.url;
              var imageTag = $("<img>");
              var paragraphTag = $("<p>").text("Rating: " + rating);

              imageTag.attr("src", staticGif);
              imageTag.attr("data-state", "still");
              imageTag.attr("data-still", staticGif);
              imageTag.attr("data-animate", animatedGif);
              animalDiv.append(paragraphTag);
              animalDiv.append(imageTag);
              $("#gif-display").prepend(animalDiv);
            }
          }
        })
    };

    $(document).on("click", ".animal-button", function () {
        displayGiphs();
    })


    function renderButtons() {

        $("#animal-display").empty();

        for (var i = 0; i < topics.length; i++) {

            var animalButton = $("<button>");
            animalButton.addClass("animal-button");
            animalButton.attr("data-name", topics[i]);
            animalButton.text(topics[i]);
            $("#animal-display").append(animalButton);

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