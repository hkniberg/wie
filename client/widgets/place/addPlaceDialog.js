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
    var icon = $('#addPlaceForm input[type=radio]:checked').val();    
    
    Meteor.call("createPlace", name, icon);
    $('[name=newPlaceName]').val("");
    $('#addPlaceDialog').modal('hide');
  }
  

})

Template.addPlaceDialog.helpers({
  'icons': function() {
    return [
      'beer.png', 'cabin.png', 'car.png', 'food.png', 'question.png', 'ski.png'
    ];
  },
  
  'iconChecked': function() {
    if (this == "cabin.png") {
      return "checked";
    } else {
      return ""
    }
  },
  
  'iconLabelActive': function() {
    if (this == "cabin.png") {
      return "active";
    } else {
      return ""
    }
  }  

})
