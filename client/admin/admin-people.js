updatePersonRenameField = function() {
  var personName = $('#personToUpdate option:selected').text();
  if (!personName) {
    personName = getFirstPerson().name;
  }
  $('#updatedPersonName').val(personName);
}


Template.adminPeople.helpers({
  'people': function() {
    return getAllPeople();
  },
  'defaultPersonName': function() {
    var firstPerson = getFirstPerson();
    if (!firstPerson || !firstPerson.name) {
      return "";
    } else {
      return firstPerson.name;
    }
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
      
    var button = $(e.target).find(':submit');
    button.button('loading');      
    Meteor.call("createPerson", newPersonName, function(err, result) {
      if (!showError(err)) {
        confirm(e, '' + newPersonName + ' has been born! Congrats!');
        newPersonField.val('');        
      }
      button.button('reset');
    });
  },
  
  'change #personToUpdate': function(e) {
    updatePersonRenameField();  
  },  
  
  'submit #update-person-form': function(e) {
    e.preventDefault();
    
    var personId = $(e.target).find('[id=personToUpdate]').val();
    var personName = $(e.target).find('option:selected').text();

    var updatedPersonField = $(e.target).find('[id=updatedPersonName]');
    var updatedPersonName = updatedPersonField.val();
    updatedPersonName = updatedPersonName.trim();
    
    if (!updatedPersonName) {
      return;
    }

    var button = $(e.target).find(':submit');
    button.button('loading');      
    Meteor.call("renamePerson", personId, updatedPersonName, function(err, result) {
      if (!showError(err)) {
        confirm(e, personName + " is now known as " + updatedPersonName);
        updatedPersonField.val('');        
      }
      button.button('reset');
    });  
  },
  
  'submit #remove-person-form': function(e) {
    e.preventDefault();
    
    var personId = $(e.target).find('[id=personToRemove]').val();
    var personName = $(e.target).find('option:selected').text();
    
    var button = $(e.target).find(':submit');
    button.button('loading');      
    Meteor.call("removePerson", personId, function(err, result) {
      if (!showError(err)) {
        confirm(e, "Gone. Dead. Vanquished. RIP " + personName + " :(");
      }
      button.button('reset');
    });  
  }  
  
  
});