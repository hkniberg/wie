getGangName = function() {
  if (!Meteor.user() || !Meteor.user().profile || !Meteor.user().profile.gangName) {
    return "";
  } else {
    return Meteor.user().profile.gangName;    
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

isEmpty = function(string) {
  return !string || string.trim().length == 0;
};