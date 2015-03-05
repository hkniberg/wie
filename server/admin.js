createGang = function(gangName, password) {
  return Gangs.insert({
    name: gangName,
    password: password,
    people: [],
    places: []
  })
};

getGang = function(gangId) {
  return Gangs.findOne({_id: gangId});
}

getPeople = function(gangId) {
  return Gangs.findOne({_id: gangId}).people;
}

getPeopleAt = function(gangId, placeId) {
  var gang = Gangs.findOne(
    {_id: gangId}, 
    {fields: {people: {$elemMatch: {placeId: placeId}}}}
    //{people2: {"$elemMatch": {placeId: "x"}}}
  );
  if (gang.people) {
    return gang.people;
  } else {
    return [];
  }
}

addPerson = function(gangId, personName) {
  var allPeople = Gangs.find({_id, gangId}, {$sort {}})
  
  var personId = new Mongo.ObjectID();
  var personId = Gangs.aggregate()
  
  Gangs.update(
    {_id: gangId}, 
    {$addToSet: {people: {
      _id: personId,
      name: personName,
      placeId: null
    }}}
  );
  return personId;
}

removePerson = function(gangId, personId) {
  Gangs.update(
    {_id: gangId},
    {$pull: {people: {_id: personId}}}
  );
}

getPerson = function(gangId, personId) {
  var gang = Gangs.findOne(
    {_id: gangId}, 
    {people: {$elemMatch: {_id: personId}}}
  );
  if (!gang || !gang.people || gang.people.length == 0) {
    return null;
  }
  return gang.people[0];    
}

getPlaces = function(gangId) {
  return Gangs.findOne({_id: gangId}).places;
}

addPlace = function(gangId, placeName) {
  var placeId = new Mongo.ObjectID();
  Gangs.update(
    {_id: gangId}, 
    {$addToSet: {places: {
      _id: placeId,
      name: placeName,
      placeId: null
    }}}
  );
  return placeId;
}

removePlace = function(gangId, placeId) {
  Gangs.update(
    {_id: gangId},
    {$pull: {places: {_id: placeId}}}
  );
}

