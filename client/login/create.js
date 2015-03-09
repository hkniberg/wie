var errorMessage = new ReactiveVar();

Template.create.events({
  'submit form': function(e) {
    e.preventDefault();
    var gangName = $("#gangName").val();
    var password = $("#password").val();
    Accounts.createUser({username: gangName, password: password}, function(err) {
      if (err) {
        errorMessage.set("Could not create the gang!");        
      } else {
        
        
        Router.go('/setup');
      }
    });
  }
})

Template.create.helpers({
  errorMessage: function() {
    return errorMessage.get();
  }
})