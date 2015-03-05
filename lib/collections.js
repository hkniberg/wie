var latency = false;

simulateLatency = function() {
  if (latency && Meteor.isServer) {
    console.log("Simulating latency... zzzzz");
    Meteor._sleepForMs(3000);
    console.log("   ... wake up!");
  }
}


Gangs = new Mongo.Collection('gangs');

People = new Mongo.Collection('people');
Places = new Mongo.Collection('places');
Messages = new Mongo.Collection('messages');

getPeopleAt = function(placeId) {
  if (placeId == '-') {
    placeId = null;
  }
  return People.find({placeId: placeId}, {sort: {time: -1, name: 1}});
}

getAllPeople = function() {
  return Gangs.find({}, {sort: {name: 1}});
}

getAllPlaces = function() {
  return Places.find({}, {sort: {name: 1}});
}

getAllPlacesOrderedByFreshness = function() {
  return Places.find({}, {sort: {lastCheckinTime: -1, name: 1}});
}


getFirstPlace = function() {
  return Places.findOne({}, {sort: {name: 1}});  
}

getFirstPerson = function() {
  return People.findOne({}, {sort: {name: 1}});  
}

getIdOfPerson = function(name) {
  var person = People.findOne({name: name});
  if (person) {
    return person._id;
  } else {
    return null;
  }
}

getPlace = function(placeId) {
  return Places.findOne({_id: placeId});
}

getPerson = function(personId) {
  return People.findOne({_id: personId});
}

doesGangExist = function(name) {
  return Gangs.find({name: name}).count() > 0;
}

doesPersonExist = function(name) {
  name = name.trim();
  var duplicate = _.find(People.find().fetch(), function(existingPerson) {
    return existingPerson.name.toLowerCase() === name.toLowerCase();
  });
  return !!duplicate;  
}

doesPlaceExist = function(name) {
  name = name.trim();
  var duplicate = _.find(Places.find().fetch(), function(existingPlace) {
    return existingPlace.name.toLowerCase() === name.toLowerCase();
  });
  return !!duplicate;  
}

getPlaceNamed = function(name) {
  name = name.trim();
  var placeWithThatName = _.find(Places.find().fetch(), function(existingPlace) {
    return existingPlace.name.toLowerCase() === name.toLowerCase();
  });
  return placeWithThatName ? placeWithThatName : null;  
}

getPersonNamed = function(name) {
  name = name.trim();
  var personWithThatName = _.find(People.find().fetch(), function(existingPerson) {
    return existingPerson.name.toLowerCase() === name.toLowerCase();
  });
  return personWithThatName ? personWithThatName : null;  
}

getAllChatMessages = function() {
  return Messages.find();
}

getLastChatMessage = function() {
  return Messages.findOne({}, {sort: {time: -1}});
}

countMessagesAfterTime = function(time) {
  return Messages.find({time: {$gt: time}}).count();
}

