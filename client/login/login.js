var errorMessage = new ReactiveVar();

Template.login.events({
  'submit form': function(e) {
    e.preventDefault();
    var gangName = $("#gangName").val();
    var password = $("#password").val();
    Meteor.loginWithPassword(gangName, password, function(err) {
      if (err) {
        errorMessage.set("Login failed!");        
      } else {
        if (hasPeople() && hasPlaces()) {
          Router.go('/view');          
        } else {
          Router.go('/setup');
        }
      }
    })
  }
})

Template.login.helpers({
  errorMessage: function() {
    return errorMessage.get();
  }
})