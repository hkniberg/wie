Template.registerHelper("gangName", function() {
  return Meteor.user().username;
});

Template.registerHelper("people", function() {
  console.log("helper: people");
  return getPeople();
});