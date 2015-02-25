var peopleToShowAt = function(place) {
  return getPeopleAt(place._id).fetch();
}

Template.whoIsWhere.helpers({

 
  placesToShow: function() {
    var places = getAllPlacesAndUnknown();
    var placesToShow = _.filter(places, function(place) {
      return peopleToShowAt(place).length > 0   
    });
    return placesToShow;
  }
});

Template.place.helpers({
  hasSelection: function() {
    return hasSelection();
  },
  
  peopleAt: function(place) {
    return peopleToShowAt(place);
  },
  
  name: function() {
    return this.name ? this.name : "";
  },
  
  icon: function() {
    return this.icon ? this.icon : "question.png";
  }
})

Template.person.helpers({
  personClass: function() {
    return isSelected(this) ? 'btn-success' : '';
  },
  
  time: function() {
    if (this.placeId == null) {
      return "";
    }
    
    var personTime = this.time;
    var now = currentTime.get();
    var ageMs = (now.getTime()) - personTime.getTime();
    var ageSeconds = ageMs / 1000;
    var ageMinutes = Math.round(ageSeconds / 60);
    if (ageMinutes < 6) {
      return "(now)"
    }
    if (ageMinutes < 60) {
      return "(" + ageMinutes + "m)";      
    }
    if (ageMinutes < 75) {
      return "(1h)";
    } 
    if (ageMinutes < 115) {
      return "(1.5h)";
    }    
    var ageHours = Math.round(ageMinutes / 60);
    return "(" + ageHours + "h)";    
  }
  
});

Template.person.events({
  'click': function(e) {
    toggleSelection(this);
  }
});

Template.whoIsWhere.rendered = function() {
  getAllPeople().observe({
	
	  //AHA, a person changed. Let's see if it was the placeId.
    changed: function(newPerson, oldPerson) {
      if (newPerson.placeId != oldPerson.placeId) {
        flash($("#nav-checkin"));
        flash($("#buttonForPerson" + newPerson._id));                
      }      
    }
  })  
};



