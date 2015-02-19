Template.main.helpers({
  hasSelection: function() {
    return hasSelection();
  }  
});


currentTime = new ReactiveVar();
currentTime.set(new Date());


Meteor.setInterval(function() {
  var now = new Date();
  currentTime.set(now);
}, 5000);

getPlaceDisplayName = function(place) {
  return place.name ? place.name : '(dunno)';
}

getPlaceMongoName = function(place) {
  return place._id == '-' ? '' : place.name;  
}

unknownPlace = {
        _id: '-',
        name: '(dunno)',
        icon: 'question.png'
};

getAllPlacesAndUnknown = function() {
  var places = Places.find({}, {sort: {name: 1}});
  places = places.fetch();
  places.push(unknownPlace);
  return places;
}