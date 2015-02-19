Template.admin.helpers({
  'places': function() {
    return Places.find({}, {sort: {name: 1}});
  },
  'people': function() {
    return People.find({}, {sort: {name: 1}});
  }  
});

Template.admin.events({
  'submit #add-place-form': function(e) {
    e.preventDefault();
    
    var newPlaceField = $(e.target).find('[id=newPlaceName]');
    var newPlaceName = newPlaceField.val();
    newPlaceName = newPlaceName.trim();
    
    if (!newPlaceName) {
      return;
    }
        
    var duplicate = _.find(Places.find().fetch(), function(existingPlace) {
      return existingPlace.name.toLowerCase() === newPlaceName.toLowerCase();
    });
    if (duplicate) {
      return;
    }
    
    Places.insert({name: newPlaceName});
    newPlaceField.val('');
    
  },
  
  'submit #remove-place-form': function(e) {
    e.preventDefault();
    
    var placeId = $(e.target).find('[id=placeToRemove]').val();
    Places.remove({_id: placeId});
  },
  
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
      place: ''
    });
    newPersonField.val('');
    
  },
  
  'submit #remove-person-form': function(e) {
    e.preventDefault();
    
    var personId = $(e.target).find('[id=personToRemove]').val();
    People.remove({_id: personId});
  }  
  
  
});