Template.start.events({
  'click #login': function() {
    Router.go('/login');
  },
  'click #create': function() {
    Router.go('/create');
  }
  
})