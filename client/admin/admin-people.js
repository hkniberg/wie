Template.adminPeople.helpers({
  'people': function() {
    return People.find({}, {sort: {name: 1}});
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
        
    var duplicate = _.find(People.find().fetch(), function(existingPerson) {
      return existingPerson.name.toLowerCase() === newPersonName.toLowerCase();
    });
    if (duplicate) {
      return;
    }
    
    People.insert({
      name: newPersonName,
      place: '',
      time: new Date()
    });
    newPersonField.val('');
    
  },
  
  'submit #remove-person-form': function(e) {
    e.preventDefault();
    
    var personId = $(e.target).find('[id=personToRemove]').val();
    People.remove({_id: personId});
  }  
  
  
});