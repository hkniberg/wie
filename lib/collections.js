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
    var result = People.insert({
      name: name,
      placeId: null,
      time: new Date()
    });
    if (!result) {
      throw new Meteor.Error("error", "Something went wrong, I couldn't add person " + name);
    }
  },
  
  createPlace: function(name, icon) {
    simulateLatency();    
    if (doesPlaceExist(name)) {
      throw new Meteor.Error("duplicate", "There's already another place named " + name);
    }
    var result = Places.insert({
      name: name,
      icon: icon,
    });
    if (!result) {
      throw new Meteor.Error("error", "Something went wrong, I couldn't add place " + name);
    }    
  },  

  renamePerson: function(personId, newName) {
    simulateLatency();    
    if (doesPersonExist(newName)) {
      throw new Meteor.Error("duplicate", "There's already another person named " + newName);
    }
    var count = People.update(
      {_id: personId},
      {$set: {name: newName}}
    );
    if (count == 0) {
      throw new Meteor.Error("error", "Strange I couldn't rename the person to " + newName);
    }
  },
  
  /**
    @returns true if successful, false if a place else already had that name.
  */
  updatePlace: function(placeId, newName, newIcon) {
    simulateLatency();    
    if (doesPlaceExist(newName)) {
      throw new Meteor.Error("duplicate", "There's already another place named " + newName);
    }
    var count = Places.update(
      {_id: placeId},
      {$set: {name: newName, icon: newIcon}}
    );
    if (count == 0) {
      throw new Meteor.Error("error", "Strange I couldn't update the place");
    }    
  },  

  removePerson: function(personId) {
      simulateLatency();    
      var count = People.remove({_id: personId});
      if (count == 0) {
        throw new Meteor.Error("error", "Strange, I couldn't remove this person");
      }
  }, 

  removePlace: function(placeId) {
    simulateLatency();    
    People.update(
      {placeId: placeId},
      {$set: {placeId: null}}
    );
    var count = Places.remove({_id: placeId});    
    if (count == 0) {
      throw new Meteor.Error("error", "Strange, I couldn't remove this place");
    }
  },
});

