Template.personWidget.events({
  'click #removePersonButton': function() {
    Meteor.call("removePerson", this._id);
  }
})