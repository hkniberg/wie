Template.placeWidget.events({
  'click #removePlaceButton': function() {
    Meteor.call("removePlace", this._id);
  },
  'click #renamePlaceButton': function() {
    Session.set("selectedPlace", this);
    $("#renamePlaceDialog").modal('show');
  }
  
})