showError = function(err) {
  if (err) {
    sweetAlert("Darn!", err.reason ? err.reason : err, "error");
    return true;
  } else {
    return false;
  }
}