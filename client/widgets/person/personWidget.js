import {Session} from "meteor/session"
Template.personWidget.events({
  'click #removePersonButton': function() {
    Meteor.call("removePerson", this._id);
  },
  'click #renamePersonButton': function() {
    Session.set("selectedPerson", this);
    $("#renamePersonDialog").modal('show');
  }
  
})