getGangName = function() {
  if (!Meteor.user()) {
    return "";
  } else {
    return Meteor.user().username;    
  }  
}

Template.registerHelper("gangName", function() {
  return getGangName();
});

Template.registerHelper("people", function() {
  return getPeople();
});

Template.registerHelper("places", function() {
  return getPlaces();
});