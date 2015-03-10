



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

Router.route('/create', {
  name: 'create'
});

Router.route('/login', {
  name: 'login'
});

Router.route('/gang/:gangName/setup', {
  name: 'setup',
  data: function() {return {gangName: this.params.gangName};}
});

Router.route('/gang/:gangName', {
  name: 'tabs',
  data: function() {return {gangName: this.params.gangName};}
});

Router.onBeforeAction(function() {
  var givenGangName = this.data().gangName;
  var loggedInGangName = getGangName();
  if (loggedInGangName == givenGangName) {
    this.next();
  } else {
    this.render('login', {data: this.data});
  }
}, 
{only: ['tabs', 'setup']}
);
