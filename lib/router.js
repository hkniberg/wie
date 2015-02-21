
Router.configure({
  layoutTemplate: 'layout2',
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
  //name: 'allOnOnePage'
  name: 'tabs'
});

/*
Router.route('/chat', {
  name: 'chat'
});

Router.route('/admin', {
  name: 'admin'
});
*/


