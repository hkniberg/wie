Template.addPlaceDialog.events({
  'shown.bs.modal #addPlaceDialog': function(e) {
    $('[name=newPlaceName]').focus();
  },  
  
  'submit, click #submitButton': function(e) {
    e.preventDefault();
    var name = $('[name=newPlaceName]').val();
    name = name.trim();
    if (!name) {
      return;
    }
    Meteor.call("createPlace", name);
    $('[name=newPlaceName]').val("");
    $('#addPlaceDialog').modal('hide');
  }
  

})
