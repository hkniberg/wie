var timeoutHours = 18;

var timeoutPeopleWhoHaventUpdatedInALongTime = function() {
  var now = new Date().getTime();
  var timeoutMs = timeoutHours * 60 * 60 * 1000;
  People.find().forEach(function(person) {
    var age = now - person.time;
    if (person.placeId != null && age >= timeoutMs) {
      console.log(person.name + " has timed out. Moving him/her to nowhere.");
      moveToNowhere(person);
    }
  });
}

var moveToNowhere = function(person) {
  People.update({_id: person._id}, {$set: {placeId: null}});
}

Meteor.setInterval(timeoutPeopleWhoHaventUpdatedInALongTime, timeoutHours * 60 * 60 * 1000);