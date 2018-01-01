"use strict";

(function ($) {

  var quote = null;

  $(".load-quote").on("click", function (e) {
    e.preventDefault();
    loadQuote();
  });

  function loadQuote() {
    $.get("https://api.icndb.com/jokes/random", function (response) {
      quote = response.value.joke;
      $("#chuck-quote i").html(quote);
    });
  }

  $(".post-twitter").on("click", function () {
    var tweetPost = quote.substring(0, 132);window.open("https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + tweetPost, "_blank");
  });

  loadQuote();
})(jQuery);