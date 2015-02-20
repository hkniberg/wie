Template.adminPlaces.helpers({
  'places': function() {
    return getAllPlaces();
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
        
    if (!newPlaceName) {
      return;
    }
    
    var button = $(e.target).find(':submit');
    button.button('loading');
    
    Meteor.call('createPlace', newPlaceName, icon, function(err, result) {
      if (!showError(err)) {
        sweetAlert("Done!", "Added " + newPlaceName, "success");
        newPlaceField.val('');        
      }
      button.button('reset');
    });
  },
  
  'submit #update-place-form': function(e) {
    e.preventDefault();
    
    var placeId = $(e.target).find('[id=placeToUpdate]').val();

    var updatedPlaceField = $(e.target).find('[id=updatedPlaceName]');
    var updatedPlaceName = updatedPlaceField.val();
    updatedPlaceName = updatedPlaceName.trim();
    
    var icon = $('#update-place-form input[type=radio]:checked').val();
        
    if (!updatedPlaceName) {
      return;
    }
        
    if (Meteor.call('updatePlace', updatedPlaceName, icon)) {
      updatedPlaceField.val('');      
    }
    
    Meteor.call('updatePlace', updatedPlaceName, icon, function(err, result) {
      if (!showError(err)) {
        sweetAlert("Done!", "You've updated " + updatedPlaceName, "success");
        newPlaceField.val('');        
      }
    });  
  },
  
  'submit #remove-place-form': function(e) {
    e.preventDefault();
    
    var placeId = $(e.target).find('[id=placeToRemove]').val();
    var placeName = $(e.target).find('[value=' + placeId + ']').text();
    
    Meteor.call('removePlace', placeId, function(err, result) {
      if (!showError(err)) {
        sweetAlert("Gone!", "You've removed " + placeName, "success");
      }      
    });    
  }
  
});