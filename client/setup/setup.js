Template.setup.helpers({
  'hasNothing': function() {
    return getPeople().count() == 0 && getPlaces().count() == 0;
  },
  'hasPeopleOnly': function() {
    return getPeople().count() > 0 && getPlaces().count() == 0;
  },
  'hasPlacesOnly': function() {
    return getPeople().count() == 0 && getPlaces().count() > 0;
  },
  'hasPeopleAndPlaces': function() {
    return getPeople().count() > 0 && getPlaces().count() > 0;
  }
});