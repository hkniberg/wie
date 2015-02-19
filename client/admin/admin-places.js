Template.adminPlaces.helpers({
  'places': function() {
    return Places.find({}, {sort: {name: 1}});
  },
  'icons': function() {
    return [
      'beer.png', 'cabin.png', 'car.png', 'food.png', 'question.png', 'ski.png'
    ];
  }
});

Template.adminPlaces.events({
  'submit #add-place-form': function(e) {
    e.preventDefault();
    
    var newPlaceField = $(e.target).find('[id=newPlaceName]');
    var newPlaceName = newPlaceField.val();
    newPlaceName = newPlaceName.trim();
    
    var icon = $('#add-place-form input[type=radio]:checked').val();
    if (!icon) {
      icon = '';
    }    
        
    if (!newPlaceName) {
      return;
    }
        
    var duplicate = _.find(Places.find().fetch(), function(existingPlace) {
      return existingPlace.name.toLowerCase() === newPlaceName.toLowerCase();
    });
    if (duplicate) {
      return;
    }
    
    Places.insert(
      {name: newPlaceName, icon: icon}
    );
    newPlaceField.val('');
    

    
  },
  
  'submit #remove-place-form': function(e) {
    e.preventDefault();
    
    var placeId = $(e.target).find('[id=placeToRemove]').val();
    var place = Places.findOne({_id: placeId});
    
    People.find().forEach(function(person) {
      if (person.place == place.name) {
        People.update({_id: person._id}, {$set: {place: ''}});
      }
    });
    Places.remove({_id: placeId});
    
  },
  
  
  
});