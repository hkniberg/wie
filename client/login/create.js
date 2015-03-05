var errorMessage = new ReactiveVar();

Template.create.events({
  'submit form': function(e) {
    e.preventDefault();
    var gangName = $("[name=gangName]").val();
    var password = $("[name=password]").val();
    Accounts.createUser({username: gangName, password: password}, function(err) {
      if (err) {
        errorMessage.set("Could not create the gang!");        
      } else {
        Router.go('/#' + gangName);
      }
    });
  }
})

Template.create.helpers({
  errorMessage: function() {
    return errorMessage.get();
  }
})