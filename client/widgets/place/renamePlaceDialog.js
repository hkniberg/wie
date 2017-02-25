import {Session} from "meteor/session"
Template.renamePlaceDialog.events({
  'shown.bs.modal #renamePlaceDialog': function(e) {
    $('[name=updatedPlaceName]').focus();
  },
  
  'submit, click #submitButton': function(e) {
    e.preventDefault();
    var name = $('[name=updatedPlaceName]').val();
    name = name.trim();
    if (!name) {
      return;
    }
    var place = Session.get("selectedPlace");
    Meteor.call("updatePlace", place._id, name, place.icon);
    $('#renamePlaceDialog').modal('hide');
  }
  
})

Template.renamePlaceDialog.helpers({
  'name': function() {
    var selectedPlace = Session.get("selectedPlace");
    if (selectedPlace) {
      return selectedPlace.name;
    } else {
      return "";
    }
  }
})