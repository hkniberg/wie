Template.whoIsWhere.helpers({
 
  areSomePeopleAtUnknownPlace: function() {
    return People.find({place: ''}).count() > 0;
  },
 
  places: function() {
    return Places.find({}, {sort: {name: 1}});
  }
});

Template.place.helpers({
  hasPeople: function() {
    var placeName = this.name ? this.name : '';
    
    return People.find({place: placeName}).count() > 0;          
  },
  
  hasSelection: function() {
    return hasSelection();
  },
  
  people: function() {
    return People.find();
  },
  
  peopleAt: function(place) {
    if (place) {
      return People.find({place: place.name}, {sort: ['name']});      
    } else {
      return People.find({place: ''}, {sort: ['name']});            
    }    
  },
  
  name: function() {
    return this.name ? this.name : "(dunno)";
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
    var personTime = this.time;
    var now = currentTime.get();
    var ageMs = (now.getTime()) - personTime.getTime();
    var ageSeconds = ageMs / 1000;
    var ageMinutes = Math.round(ageSeconds / 60);
    if (ageMinutes < 60) {
      if (ageMinutes < 0) {
        ageMinutes = 0;
      }
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
    var personButton = $(e.target);
  }
});



