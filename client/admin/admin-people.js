Template.adminPeople.helpers({
  'people': function() {
    return getAllPeople();
  }
});

Template.adminPeople.events({  
  'submit #add-person-form': function(e) {
    e.preventDefault();
    
    var newPersonField = $(e.target).find('[id=newPersonName]');
    var newPersonName = newPersonField.val();
    newPersonName = newPersonName.trim();
    
    if (!newPersonName) {
      return;
    }
      
    if (Meteor.call("createPerson", newPersonName)) {
      newPersonField.val('');    
    }
  },
  
  'submit #update-person-form': function(e) {
    e.preventDefault();
    
    var personId = $(e.target).find('[id=personToUpdate]').val();

    var updatedPersonField = $(e.target).find('[id=updatedPersonName]');
    var updatedPersonName = updatedPersonField.val();
    updatedPersonName = updatedPersonName.trim();
    
    if (!updatedPersonName) {
      return;
    }
        
    if (Meteor.call("renamePerson", personId, updatedPersonName)) {
      updatedPersonField.val('');
    }
  },
  
  'submit #remove-person-form': function(e) {
    e.preventDefault();
    
    var personId = $(e.target).find('[id=personToRemove]').val();
    Meteor.call("removePerson", personId);
  }  
  
  
});