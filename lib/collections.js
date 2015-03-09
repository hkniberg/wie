var latency = false;

simulateLatency = function() {
  if (latency && Meteor.isServer) {
    console.log("Simulating latency... zzzzz");
    Meteor._sleepForMs(3000);
    console.log("   ... wake up!");
  }
}

People = new Mongo.Collection('people');
Places = new Mongo.Collection('places');
Messages = new Mongo.Collection('messages');


getGangId = function() {
  if (!Meteor.userId()) {
    throw Meteor.error("notLoggedIn", "You are not logged in to any gang!");
  }
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
  console.log("getPeople - " + people.count() + " found");
  return people;
}

getPlaces = function() {
  return Places.find(
    {gangId: getGangId()}, 
    {sort: {name: 1}}
  );
}

getPlace = function(placeId) {
  return Places.findOne({gangId: getGangId(), _id: placeId});
}

getAllPlacesOrderedByFreshness = function() {
  return Places.find({gangId: getGangId()}, {sort: {lastCheckinTime: -1, name: 1}});
}

removePerson = function(personId) {
  People.remove({gangId: getGangId(), _id: personId});
}

addPerson = function(name) {
  if (doesPersonExist(name)) {
    throw new Meteor.Error("duplicate", "There's already another person named " + name);
  }
  var result = People.insert({
    name: name,
    gangId: getGangId(),
    placeId: null,
    time: new Date()
  });
  if (!result) {
    throw new Meteor.Error("error", "Something went wrong, I couldn't add person " + name);
  }    
  console.log("server added person " + name + " with gangId " + getGangId());
  return result;
}



addPlace = function(placeName, icon) {
  return Places.insert({    
    name: placeName,
    gangId: getGangId(),
    icon: icon
  });
}



removePlace = function(placeId) {
  Places.remove({gangId: getGangId(), _id: placeId});
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






