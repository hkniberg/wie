Template.checkIn.helpers({
  allPlaces: function() {
    return Places.find({}, {sort: {name: 1}});
  }
});

Template.checkIn.events({
  'click .check-in-button': function(e) {
    var place = $(e.target).text();
    getSelectedPeople().forEach(function(person){
      People.update({_id: person._id}, {$set: {place: place}});
    });
  }
});