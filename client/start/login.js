var errorMessage = new ReactiveVar();

Template.login.events({
  'submit form': function(e) {
    e.preventDefault();
    var gangName = $("#gangName").val();
    var password = $("#password").val();
    if (isEmpty(gangName) || isEmpty(password)) {
      errorMessage.set("I need both a name and a password...");
      return;
    } 
    gangName = gangName.trim();
    password = password.trim();
    
    Meteor.loginWithPassword(gangName.toLowerCase(), password, function(err) {
      if (err) {
        if (err.reason) {
          errorMessage.set(err.reason);
        } else {
          errorMessage.set("Something went wrong, couldn't log in!")
        }
      } else {
        if (hasPeople() && hasPlaces()) {
          Router.go('tabs', {gangName: gangName});          
        } else {
          Router.go('setup', {gangName: gangName});
        }
      }
    })
  },
  
  'keypress, click': function(e) {
    errorMessage.set(null);    
  }  
  
})

Template.login.helpers({
  errorMessage: function() {
    return errorMessage.get();
  },
  
  buttonDisabled: function() {
    var gangName = $("#gangName").val();
    var password = $("#password").val(); 
    if (isEmpty(gangName) || isEmpty(password)) {
      return 'disabled';
    } else {
      return '';
    }
  }
})