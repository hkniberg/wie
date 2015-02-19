Template.checkIn.helpers({
  allPlaces: function() {
    return getAllPlacesAndUnknown();
  },
  
  checkInLabel: function() {
    var people = getSelectedPeople();
    if (people.length == 1) {
      return "Move " + people[0].name + " to:";
    } else if (people.length > 1) {
      return "Move these " + people.length + " people to:";
    } else {
      return "Move nobody";
    }
  },
  
  icon: function() {
    
    //return this.icon ? "<img class='icon' src='icons/" + this.icon + "'>" : "";
  }
});

Template.checkIn.events({
  'click .check-in-button': function(e) {
    var placeId = $(e.target).attr("id");
    var placeName;
    if (placeId == '-') {
      placeName = '';
    } else {
      placeName = Places.findOne({_id: placeId}).name;
    }        

    getSelectedPeople().forEach(function(person){
      People.update({_id: person._id}, {$set: {
        place: placeName,
        time: new Date()
      }});
    });
    
  },
  
  'click #reset-selection-button': function(e) {
    clearSelection();
  },
  
  
});