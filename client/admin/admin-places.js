selectedPlaceToUpdate = new ReactiveVar();
selectedPlaceToUpdate.set(getFirstPlace());


getSelectedPlace = function() {
  var selectedPlace = selectedPlaceToUpdate.get();
  if (selectedPlace) {
    return selectedPlace;
  } else {
    var firstPlace = getFirstPlace();
    if (firstPlace) {
      selectedPlaceToUpdate.set(firstPlace);
      return firstPlace;
    }
  }
  return null;
}

updatePlaceRenameField = function() {
  var placeName = $('#placeToUpdate option:selected').text();
  if (!placeName) {
    placeName = getFirstPlace().name;
  }
  $('#updatedPlaceName').val(placeName);
}

updateSelectedIcon = function() {
  var placeName = $('#placeToUpdate option:selected').text();
  if (!placeName) {
    placeName = getFirstPlace().name;
  }
  $('#updatedPlaceName').val(placeName);
}



Template.adminPlaces.helpers({
  'places': function() {
    return getPlaces();
  },
  'icons': function() {
    return [
      'beer.png', 'cabin.png', 'car.png', 'food.png', 'question.png', 'ski.png'
    ];
  },
  'selectedPlaceName': function() {
    var selectedPlace = getSelectedPlace();
    if (!selectedPlace || !selectedPlace.name) {
      return "";
    }
    return selectedPlace.name;
  },
  
  'iconChecked': function() {
    var selectedPlace = getSelectedPlace();
    if (!selectedPlace || !selectedPlace.icon) {
      return "";
    }
    var icon = this;
    
    if (icon == selectedPlace.icon) {
      return "checked";
    } else {
      return "";
    }
  },
  
  'iconLabelActive': function() {
    var selectedPlace = getSelectedPlace();
    if (!selectedPlace || !selectedPlace.icon) {
      return "";
    }
    var icon = this;
    
    if (icon == selectedPlace.icon) {
      return "active";
    } else {
      return "";
    }  
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
        confirm(e, 'Created ' + newPlaceName);
        newPlaceField.val('');        
      }
      button.button('reset');
    });
  },
  
  'change #placeToUpdate': function(e) {
    var placeId = $('#placeToUpdate').val();
    var place = placeId ? getPlace(placeId) : null;
    selectedPlaceToUpdate.set(place);
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
        
    var button = $(e.target).find(':submit');
    button.button('loading');
    Meteor.call('updatePlace', placeId, updatedPlaceName, icon, function(err, result) {
      if (!showError(err)) {
        confirm(e, 'Updated it!');      
      }
      button.button('reset');
    });  
  },
  
  'submit #remove-place-form': function(e) {
    e.preventDefault();
    
    var placeId = $(e.target).find('[id=placeToRemove]').val();
    var placeName = $(e.target).find('[value=' + placeId + ']').text();
    
    var button = $(e.target).find(':submit');
    button.button('loading');
    Meteor.call('removePlace', placeId, function(err, result) {
      if (!showError(err)) {
        confirm(e, "Removed " + placeName + ". Totally gone.");
      }      
      button.button('reset');
    });    
  }
  
});