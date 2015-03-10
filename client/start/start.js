Template.start.events({
  'click #login': function() {
    Router.go('login');
  },
  'click #create': function() {
    Router.go('create');
  },
  'click #showExample': function(e) {
    e.preventDefault();
    Session.set("showExample", true);
  },
  'click #hideExample': function(e) {
    e.preventDefault();
    Session.set("showExample", null);
  }
  
})

Template.start.helpers({
  showExample: function() {
    return Session.get("showExample");
  }
})