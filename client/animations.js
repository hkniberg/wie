flash = function(element) {
  //if (flashEnabled) {
    
    setTimeout(function() {
      element.addClass("animated bounce");      

      setTimeout(function() {
        element.removeClass("animated bounce");
      }, 2000);
            
    }, 200);
    
    //}
}

//TODO move this
//flashEnabled = true;

/*
setTimeout(function() {
  flashEnabled = true;
}, 5000);
*/
