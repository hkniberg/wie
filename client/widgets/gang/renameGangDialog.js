Template.renameGangDialog.events({
  'shown.bs.modal #renameGangDialog': function(e) {
    $('[name=updatedGangName]').focus();
  },
  
  'submit, click #submitButton': function(e) {
    e.preventDefault();
    var name = $('[name=updatedGangName]').val();
    name = name.trim();
    if (!name) {
      return;
    }
    //TODO graceful error handling if gang already exists.
    Meteor.call("renameGang", name, function(err) {
      if (!err) {
        Router.go('tabs', {gangName: name});
      }
    });
    $('#renameGangDialog').modal('hide');
  }
  
})
