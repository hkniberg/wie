Meteor.publish("people", function() {
  return People.find({}, {sort: {name: 1}});
});

Meteor.publish("places", function() {
  return Places.find({}, {sort: {name: 1}});
});

Meteor.publish("messages", function() {
  var oldestTime = new Date(moment().subtract(24, 'hours'));
  return Messages.find({time: {$gt: oldestTime}}, {sort: {time: 1}});
});

