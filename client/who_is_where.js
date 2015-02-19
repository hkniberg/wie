Template.whoIsWhere.helpers({
  people: function() {
    return People.find();
  },
  
  populatedPlaceNames: function() {
    var people = People.find().fetch();
    var places = _.chain(people).pluck('place').uniq().without('').value().sort();
    return places;
  },
  
  peopleAt: function(place) {
    return People.find({place: place}, {sort: ['name']});
  }
  
});

Template.person.helpers({
  personClass: function() {
    return isSelected(this) ? 'bg-primary' : '';
  }
  
});

Template.person.events({
  'click': function(e) {
    toggleSelection(this);
  }
});



