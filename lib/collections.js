People = new Mongo.Collection('people');
Places = new Mongo.Collection('places');
Messages = new Mongo.Collection('messages');


getGangId = function() {
  return Meteor.userId();
}


getPeopleAt = function(placeId) {
  if (placeId == '-') {
    placeId = null;
  }
  return People.find({gangId: getGangId(), placeId: placeId}, {sort: {time: -1, name: 1}});
}

getPeople = function() {
  var people = People.find(
    {gangId: getGangId()}, 
    {sort: {name: 1}}
  );
  return people;
}

getPlaces = function() {
  return Places.find(
    {gangId: getGangId()}, 
    {sort: {name: 1}}
  );
}

hasPlaces = function() {
  return getPlaces().count() > 0;
}

hasPeople = function() {
  return getPeople().count() > 0;
}

getPlace = function(placeId) {
  return Places.findOne({gangId: getGangId(), _id: placeId});
}

getAllPlacesOrderedByFreshness = function() {
  return Places.find({gangId: getGangId()}, {sort: {lastCheckinTime: -1, name: 1}});
}

getFirstPlace = function() {
  return Places.findOne({gangId: getGangId()}, {sort: {name: 1}});  
}

getFirstPerson = function() {
  return People.findOne({gangId: getGangId()}, {sort: {name: 1}});  
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
  return Places.findOne({gangId: getGangId(), _id: placeId});
}

getPerson = function(personId) {
  return People.findOne({gangId: getGangId(), _id: personId});
}



doesGangExist = function(name) {
  return Meteor.users.find({username: name}).count() > 0;
}

doesPersonExist = function(name) {
  name = name.trim();
  var duplicate = _.find(People.find({gangId: getGangId()}).fetch(), function(existingPerson) {
    return existingPerson.name.toLowerCase() === name.toLowerCase();
  });
  return !!duplicate;  
}

doesPlaceExist = function(name) {
  name = name.trim();
  var duplicate = _.find(Places.find({gangId: getGangId()}).fetch(), function(existingPlace) {
    return existingPlace.name.toLowerCase() === name.toLowerCase();
  });
  return !!duplicate;  
}

getPlaceNamed = function(name) {
  name = name.trim();
  var placeWithThatName = _.find(Places.find({gangId: getGangId()}).fetch(), function(existingPlace) {
    return existingPlace.name.toLowerCase() === name.toLowerCase();
  });
  return placeWithThatName ? placeWithThatName : null;  
}

getPersonNamed = function(name) {
  name = name.trim();
  var personWithThatName = _.find(People.find({gangId: getGangId()}).fetch(), function(existingPerson) {
    return existingPerson.name.toLowerCase() === name.toLowerCase();
  });
  return personWithThatName ? personWithThatName : null;  
}

getAllChatMessages = function() {
  return Messages.find({gangId: getGangId()});
}

getLastChatMessage = function() {
  return Messages.findOne({gangId: getGangId()}, {sort: {time: -1}});
}

countMessagesAfterTime = function(time) {
  return Messages.find({gangId: getGangId(), time: {$gt: time}}).count();
}






