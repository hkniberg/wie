Template.people.helpers({
  people: function() {
    return People.find();
  },
  
  places: function() {
    var people = People.find().fetch();
    return _.chain(people).pluck('place').uniq().without('').value().sort();
  }
});

