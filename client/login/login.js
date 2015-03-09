var errorMessage = new ReactiveVar();

Template.login.events({
  'submit form': function(e) {
    e.preventDefault();
    var gangName = $("[name=gangName]").val();
    var password = $("[name=password]").val();
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