Meteor.publish("people", function() {
  if (this.userId) {
    console.log("publish people for " + this.userId);
    return People.find({gangId: this.userId}, {sort: {name: 1}});    
  } else {
    console.log("publish people - not logged in!");
    this.ready();
  }  
});

Meteor.publish("places", function() {
  if (this.userId) {
    return Places.find({gangId: this.userId}, {sort: {name: 1}});
  } else {
    this.ready();
  }  
});

Meteor.publish("messages", function() {
  if (this.userId) {
    var oldestTime = new Date(moment().subtract(24, 'hours'));
    return Messages.find(
      {gangId: this.userId, time: {$gt: oldestTime}}, 
      {sort: {time: 1}}
    );
  } else {
    this.ready();
  }  
});
