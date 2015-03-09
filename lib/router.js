
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [
      Meteor.subscribe('people'), 
      Meteor.subscribe('places'),
      Meteor.subscribe('messages')      
    ];
  }
});


Router.route('/', {
  name: 'start'
});


Router.route('/login', {
  name: 'login'
});

Router.route('/create', {
  name: 'create'
});


Router.route('/setup', {
  name: 'setup',
});

Router.route('/view', {
  name: 'tabs',
});

