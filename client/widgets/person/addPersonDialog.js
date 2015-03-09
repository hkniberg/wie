Template.addPersonDialog.events({
  'shown.bs.modal #addPersonDialog': function(e) {
    $('[name=newPersonName]').focus();
  },  
  
  'submit, click #submitButton': function(e) {
    e.preventDefault();
    var name = $('[name=newPersonName]').val();
    name = name.trim();
    if (!name) {
      return;
    }
    Meteor.call("createPerson", name);
    $('[name=newPersonName]').val("");
    $('#addPersonDialog').modal('hide');
  }
  

})
