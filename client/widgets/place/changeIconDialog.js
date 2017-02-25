import {Session} from "meteor/session"
Template.changeIconDialog.events({
  'hidden.bs.modal #changeIconDialog': function(e) {
    $(".iconButton").removeClass("active");
  },

  'click .iconButton': function(e) {
    e.preventDefault();
    var icon = "" + this;
    var place = Session.get("selectedPlace");
    Meteor.call("updatePlace", place._id, place.name, icon);
    $('#changeIconDialog').modal('hide');
  }
  
})

Template.changeIconDialog.helpers({
  'name': function() {
    var selectedPlace = Session.get("selectedPlace");
    if (selectedPlace) {
      return selectedPlace.name;
    } else {
      return "";
    }
  },
  
  'icons': function() {
    return [
      'beer.png', 'cabin.png', 'car.png', 'food.png', 'question.png', 'ski.png'
    ];
  },
  
  'iconChecked': function() {
    var selectedPlace = Session.get("selectedPlace");
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
    var selectedPlace = Session.get("selectedPlace");
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
})



