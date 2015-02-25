
Router.configure({
  layoutTemplate: 'layout',
});

Router.route('/', {
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

/*
Router.route('/map', {
  name: 'maptest'
});
*/


