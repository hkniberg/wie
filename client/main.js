currentTime = new ReactiveVar();
currentTime.set(new Date());

Meteor.setInterval(function() {
  var now = new Date();
  currentTime.set(now);
}, 60000);

updateMyLocation = function() {
  if (hasSelection()) {
    var position = Geolocation.latLng();     
    if (position && position.lat && position.lng) {
      getSelectedPeople().forEach(function(person) {
        Meteor.call("reportPosition", person._id, position.lat, position.lng);
      });      
    }
  }
  
}
Meteor.setInterval(updateMyLocation, 2000);

unknownPlace = {
        _id: '-',
        name: '',
        icon: 'question.png'
};

getAllPlacesAndUnknown = function() {
  places = getAllPlaces().fetch();
  places.push(unknownPlace);
  return places;
}


//Template.allOnOnePage.rendered = function() {
  new WOW().init();
//}

/*
Meteor.startup(function() {
  GoogleMaps.load();
});
*/