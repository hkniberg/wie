/*Router.route('/', {
  name: 'asdfasdf',
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
*/

Router.configure({
  layoutTemplate: 'layout'
});
