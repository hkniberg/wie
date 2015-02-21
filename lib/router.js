
Router.configure({
  layoutTemplate: 'layout'
});


Router.route('/', {
  name: 'app',
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
Router.route('/checkin') {
  name: ''
}
*/

