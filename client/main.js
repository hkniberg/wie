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
}, 60000);