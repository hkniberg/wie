Template.registerHelper("gangName", function() {
  return Meteor.user().username;
});

Template.registerHelper("people", function() {
  return getPeople();
});

Template.registerHelper("places", function() {
  return getPlaces();
});