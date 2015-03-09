Template.setup.events({
  'click #addPersonButton': function(e) {
    console.log("addPerson");
  },
  'submit #addPersonForm': function(e) {
    e.preventDefault();
    var name = $('[name=newPersonName]').val();
    console.log("add " + name);
    Meteor.call("createPerson", name);
  }
})