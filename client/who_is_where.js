Template.whoIsWhere.helpers({

 
  placesToShow: function() {
    var places = getAllPlacesAndUnknown();
    var placesToShow = _.filter(places, function(place) {
      var mongoPlaceName = getPlaceMongoName(place);
      var result = People.find({place: mongoPlaceName}).count() > 0;
      return result;      
    });
    return placesToShow;
  }
});

Template.place.helpers({
  hasSelection: function() {
    return hasSelection();
  },
  
  people: function() {
    return People.find();
  },
  
  peopleAt: function(place) {
    var placeMongoName = getPlaceMongoName(place);
    return People.find({place: placeMongoName}, {sort: ['name']});      
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
    var personButton = $(e.target);
  }
});



