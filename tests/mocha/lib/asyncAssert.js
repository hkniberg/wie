
assertNull = function(object, done, message) {
  if (object != null) {
    if (message) {
      fail(done, message);
    } else {
      fail(done, "Expected this to be null: " + object);
    }
  }
}

assertNotNull = function(object, done, message) {
  if (object == null) {
    if (message) {
      fail(done, message);
    } else {
      fail(done, "Expected this to be non-null: " + object);
    }
  }
}

fail = function(done, message) {
  done(message);
  throw message;
}