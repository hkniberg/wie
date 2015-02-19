Template.checkIn.helpers({
  allPlaces: function() {
    return Places.find({}, {sort: {name: 1}});
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
    console.log("this icon: " + this.icon);
    console.log(this);
    return this.icon ? this.icon : "question.png";
  }
});

Template.checkIn.events({
  'click .check-in-button': function(e) {
    var place = $(e.target).attr("id");
    if (place == '-') {
      place = '';
    }

    getSelectedPeople().forEach(function(person){
      People.update({_id: person._id}, {$set: {
        place: place,
        time: new Date()
      }});
    });
    
  },
  
  'click #reset-selection-button': function(e) {
    clearSelection();
  },
  
  
});