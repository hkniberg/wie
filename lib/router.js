
Router.configure({
  layoutTemplate: 'layout',
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

Router.route('/#:gangName', {
  name: 'tabs',
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
