currentTime = new ReactiveVar();
currentTime.set(new Date());

showChatBadgeFromTime = new ReactiveVar();


$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  console.log("new tab");
  console.log(e.target); // newly activated tab
  console.log(e.relatedTarget); // previous active tab
})


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


//Template.allOnOnePage.rendered = function() {
  new WOW().init();
//}