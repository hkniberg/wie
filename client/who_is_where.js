Template.whoIsWhere.helpers({
  people: function() {
    return People.find();
  },
  
  populatedPlaceNames: function() {
    var people = People.find().fetch();
    var placeNames = _.chain(people).pluck('place').uniq().value().sort();
    if (placeNames[0] == "") {
      placeNames = placeNames.slice(1).concat('');
    }
    return placeNames;
  },
  
  placeName: function() {
    return this == "" ? "(dunno where)" : this;
  },
  
  peopleAt: function(place) {
    return People.find({place: place}, {sort: ['name']});
  }
  
});

Template.person.helpers({
  personClass: function() {
    return isSelected(this) ? 'btn-success' : '';
  }
  
});

Template.person.events({
  'click': function(e) {
    toggleSelection(this);
  }
});



