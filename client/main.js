currentTime = new ReactiveVar();
currentTime.set(new Date());

Meteor.setInterval(function() {
  var now = new Date();
  currentTime.set(now);
}, 60000);

unknownPlace = {
        _id: '-',
        name: '',
        icon: 'question.png'
};

new WOW().init();
