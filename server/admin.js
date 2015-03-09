createGang = function(gangName, password) {
  return Accounts.createUser({
    username: gangName,
    password: password
  })
};

getGang = function(gangId) {
  return Meteor.users.findOne({_id: gangId});
}

getPeopleAt = function(gangId, placeId) {
  return People.find({gangId: gangId, placeId: placeId});
}

getPeople = function(gangId) {
  return People.find({gangId: gangId});
}

getPerson = function(gangId, personId) {
  return People.findOne({gangId: gangId, _id: personId});
}

addPerson = function(gangId, personName) {
  assert(getGang(gangId));
  return People.insert({
    name: personName,
    gangId: gangId,
    placeId: null
  });
}

removePerson = function(gangId, personId) {
  People.remove({_id: personId});
}

getPlaces = function(gangId) {
  return Places.find({gangId: gangId});
}

getPlace = function(gangId, placeId) {
  return Places.findOne({gangId: gangId, _id: placeId});
}

addPlace = function(gangId, placeName, icon) {
  assert(getGang(gangId));
  return Places.insert({
    name: placeName,
    gangId: gangId,
    icon: icon
  });
}

removePlace = function(gangId, placeId) {
  Places.remove({_id: placeId});
}




