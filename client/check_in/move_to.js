
var movePeopleTo = function(people, placeId) {
  people.forEach(function(person){
    movePersonTo(person, placeId);
  });
}

var movePersonTo = function(person, placeId) {
  if (placeId == unknownPlace._id) {
    placeId = null;
  }
  Meteor.call('movePersonTo', person._id, placeId);
}


Template.moveTo.helpers({ 
  checkInButtonClass: function() {
    return hasSelection() ? "" : "disabled";
  },
  
  hasSelection: function() {
    return hasSelection();
  },

  allPlaces: function() {
    places = getAllPlaces().fetch();
    places.push(unknownPlace);
    return places;
  },
  
  checkInLabel: function() {
    var people = getSelectedPeople();
    if (people.length == 1) {
      return "Move " + people[0].name + " to:";
    } else if (people.length > 1) {
      return "Move " + people.length + " ppl to:";
    } else {
      return "Move nobody";
    }
  },
  
  icon: function() {
    
    //return this.icon ? "<img class='icon' src='icons/" + this.icon + "'>" : "";
  }
});

Template.moveTo.events({
  'click .check-in-button': function(e) {
    var placeId = $(e.target).attr("id");
    
    movePeopleTo(getSelectedPeople(), placeId);     
  },
  
  'click #reset-selection-button': function(e) {
    clearSelection();
  },
  
  
});