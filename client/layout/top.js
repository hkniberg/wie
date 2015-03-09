Template.top.events({
  'click #setupGangButton': function() {
    //TODO fix this ugly timing hack
    Meteor.setTimeout(function() {
      Router.go('/setup');      
    }, 100);
  },
  
  'click #renameGangButton': function() {
    $('#renameGangDialog').modal('show');
  },
  
  'click #removeGangButton': function() {
    sweetAlert({   
      title: "Kill " + getGangName() + "?",  
      text: "You sure? All people, places, and chat messages will be gone forever. And that's a long time!",   
      type: "warning",   
      showCancelButton: true,   
      confirmButtonColor: "#DD6B55",   
      confirmButtonText: "Yes, delete " + getGangName(),   
      cancelButtonText: "No, please, don't!"   
    }, function(isConfirm){   
        if (isConfirm) {   
          Meteor.call("removeGang");
          Meteor.logout();
          Router.go("/");
        }
    });
  } 
  
});