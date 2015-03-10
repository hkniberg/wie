getGangName = function() {
  if (!Meteor.user()) {
    return "";
  } else {
    return Meteor.user().username;    
  }  
}

isLoggedIn = function() {
  return Meteor.userId() != null;
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