Template.setup.helpers({
  'hasNothing': function() {
    return !hasPeople() && !hasPlaces();
  },
  'hasPeopleOnly': function() {
    return hasPeople() && !hasPlaces();
  },
  'hasPlacesOnly': function() {
    return hasPlaces() && !hasPeople();
  },
  'hasPeopleAndPlaces': function() {
    return hasPeople() && hasPlaces();
  }
});

Template.setup.events({
  'click #doneButton': function(e) {
    Router.go('/view');
  }
})