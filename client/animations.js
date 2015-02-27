flash = function(element) {
  if (flashEnabled) {
    element.addClass("animated bounce");
    setTimeout(function() {
      element.removeClass("animated bounce");
    }, 2000)
  }
}
flashEnabled = false;

setTimeout(function() {
  flashEnabled = true;
}, 5000);
