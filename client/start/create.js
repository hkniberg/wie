var errorMessage = new ReactiveVar();

Template.create.events({
  'submit form': function(e) {
    e.preventDefault();
    var gangName = $("#gangName").val();
    var password = $("#password").val();
    var password2 = $("#password2").val();
    
    if (isEmpty(gangName) || isEmpty(password)) {
      errorMessage.set("I need both a name and a password...");
      return;
    } 
    gangName = gangName.trim();
    password = password.trim();
    if (isEmpty(password2)) {
      errorMessage.set("You need to repeat the password");
      return;      
    }
    password2 = password2.trim();
    
    if (password != password2) {
      errorMessage.set("The two passwords aren't the same");
      return;            
    }
    
    
    gangName = gangName.trim();

    var options = {
      username: gangName.toLowerCase(),
      password: password,
      profile: {gangName: gangName}
    }
    
    Accounts.createUser(options,
      function(err) {
      if (err) {
        if (err.reason) {
          errorMessage.set(err.reason);
        } else {
          errorMessage.set("Something went wrong, couldn't create the gang!")
        }    
      } else {
        Router.go('setup', {gangName: gangName});
      }
    });
  },
  
  'click #backToStartPage': function(e) {
    Router.go('/');
  },
  
  'keypress, click': function(e) {
    errorMessage.set(null);    
  }  
})

Template.create.helpers({
  errorMessage: function() {
    return errorMessage.get();
  }
})