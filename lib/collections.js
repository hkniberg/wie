var simulateLatency = true;

simulateLatency = function() {
  if (simulateLatency && Meteor.isServer) {
    Meteor._sleepForMs(3000);
  }
}


People = new Mongo.Collection('people');
Places = new Mongo.Collection('places');

getPeopleAt = function(placeId) {
  if (placeId == '-') {
    placeId = null;
  }
  return People.find({placeId: placeId}, {sort: {name: 1}});
}

getAllPeople = function() {
  return People.find({}, {sort: {name: 1}});
}

getAllPlaces = function() {
  return Places.find({}, {sort: {name: 1}});
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


Meteor.methods({

  movePersonTo: function(personId, placeId) {
    simulateLatency();    
    if (placeId != null) {
      if (Places.find({_id: placeId}).count() == 0) {
        throw "Hey, there is no place #" + placeId;
      }
    }
    
    People.update(
      {_id: personId}, 
      {$set: {
        placeId: placeId,
        time: new Date()
      }}
    ); 
  },

  createPerson: function(name) {
    simulateLatency();    
    if (doesPersonExist(name)) {
      throw new Meteor.Error("duplicate", "There's already another person named " + name);
    }
    People.insert({
      name: name,
      placeId: null,
      time: new Date()
    });
  },
  
  createPlace: function(name, icon) {
    simulateLatency();    
    if (doesPlaceExist(name)) {
      throw new Meteor.Error("duplicate", "There's already another place named " + name);
    }
    Places.insert({
      name: name,
      icon: icon,
    });
    simulateLatency();
  },  

  renamePerson: function(personId, newName) {
    simulateLatency();    
    if (doesPersonExist(newName)) {
      throw new Meteor.Error("duplicate", "There's already another person named " + name);
    }
    People.update(
      {_id: personId},
      {$set: {name: newName}}
    );
    simulateLatency();
  },
  
  /**
    @returns true if successful, false if a place else already had that name.
  */
  updatePlace: function(placeId, newName, newIcon) {
    simulateLatency();    
    if (doesPlaceExist(newName)) {
      throw new Meteor.Error("duplicate", "There's already another place named " + name);
    }
    Places.update(
      {_id: placeId},
      {$set: {name: newName, icon: newIcon}}
    );
    simulateLatency();
  },  

  removePerson: function(personId) {
      simulateLatency();    
      People.remove({_id: personId});
  }, 

  removePlace: function(placeId) {
    simulateLatency();    
    People.update(
      {placeId: placeId},
      {$set: {placeId: null}}
    );
    Places.remove({_id: placeId});    
  },
});

