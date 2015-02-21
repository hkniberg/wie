currentTime = new ReactiveVar();
currentTime.set(new Date());

Meteor.setInterval(function() {
  var now = new Date();
  currentTime.set(now);
}, 60000);

unknownPlace = {
        _id: '-',
        name: '(dunno)',
        icon: 'question.png'
};

getAllPlacesAndUnknown = function() {
  places = getAllPlaces().fetch();
  places.push(unknownPlace);
  return places;
}


Template.main.rendered = function() {
  new WOW().init();
}