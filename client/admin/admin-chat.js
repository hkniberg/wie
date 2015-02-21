Template.adminChat.events({
  'submit #clear-chat-form': function(e) {
    e.preventDefault();
    
    var button = $(e.target).find(':submit');
    button.button('loading');      
    Meteor.call("clearChatMessages", function(err, result) {
      if (!showError(err)) {
        confirm(e, 'OK, chat is nice and empty now!');
      }
      button.button('reset');
    });
  }
})