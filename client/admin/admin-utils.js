showError = function(err) {
  if (err) {
    sweetAlert("Darn!", err.reason ? err.reason : err, "error");
    return true;
  } else {
    return false;
  }
}

confirm = function(event, text) {
  sweetAlert("Done!", text, "success");
  
  /*
  confirmationLabel = $(event.target).find('.confirmation');
  confirmationLabel.text(text);
  confirmationLabel.show();
  confirmationLabel.fadeOut(5000);
  */
};