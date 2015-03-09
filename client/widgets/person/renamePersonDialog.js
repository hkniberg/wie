Template.renamePersonDialog.events({
  'shown.bs.modal #renamePersonDialog': function(e) {
    $('[name=updatedPersonName]').focus();
  },
  
  'submit, click #submitButton': function(e) {
    e.preventDefault();
    var name = $('[name=updatedPersonName]').val();
    name = name.trim();
    if (!name) {
      return;
    }
    var personId = Session.get("selectedPerson")._id;
    Meteor.call("renamePerson", personId, name);
    $('#renamePersonDialog').modal('hide');
  }
  
})

Template.renamePersonDialog.helpers({
  'name': function() {
    var selectedPerson = Session.get("selectedPerson");
    if (selectedPerson) {
      return selectedPerson.name;
    } else {
      return "";
    }
  }
})