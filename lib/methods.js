assertLoggedIn = function() {
  simulateLatency();      
  var userId = Meteor.userId()
  assert(userId, "User is not logged in!")
  return userId;  
}

Meteor.methods({

  whoAmI: function() {
    return Meteor.userId();
  },

  renameGang: function(newGangName) {
    var gangId = assertLoggedIn();

    Meteor.users.update(
      {_id: gangId},
      {$set: 
        {
          username: newGangName.toLowerCase(),
          profile: {gangName: newGangName}
        }
      }
    );    
  },

  removeGang: function() {
    var gangId = assertLoggedIn();

    People.remove({gangId: gangId});  
    Places.remove({gangId: gangId});  
    Messages.remove({gangId: gangId});  
    Meteor.users.remove({_id: gangId});
  },

  movePersonTo: function(personId, placeId) {
    var gangId = assertLoggedIn();
    
    if (placeId != null) {
      if (Places.find({_id: placeId}).count() == 0) {
        throw "Hey, there is no place #" + placeId;
      }
    }
    
    var time = new Date();
    
    People.update(
      {gangId: gangId, _id: personId}, 
      {$set: {
        placeId: placeId,
        time: time
      }}
    ); 
    
    Places.update(
      {gangId: gangId, _id: placeId}, 
      {$set: {
        lastCheckinTime: time
      }}
      
    );
  },

  createPerson: function(name) {
    var gangId = assertLoggedIn();
 
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
    return result;
  },
  
  createPlace: function(name, icon) {
    var gangId = assertLoggedIn();
      
    if (doesPlaceExist(name)) {
      throw new Meteor.Error("duplicate", "There's already another place named " + name);
    }
    var result = Places.insert({
      gangId: gangId,
      name: name,
      icon: icon,
    });
    if (!result) {
      throw new Meteor.Error("error", "Something went wrong, I couldn't add place " + name);
    }    
    return result;
  },  

  renamePerson: function(personId, newName) {
    var gangId = assertLoggedIn(); 

    if (doesPersonExist(newName)) {
      throw new Meteor.Error("duplicate", "There's already another person named " + newName);
    }
    var count = People.update(
      {gangId: gangId, _id: personId},
      {$set: {name: newName}}
    );
    if (count == 0) {
      throw new Meteor.Error("error", "Strange I couldn't rename the person to " + newName);
    }
  },
  
  updatePlace: function(placeId, newName, newIcon) {
    var gangId = assertLoggedIn(); 
    
    var existingPlace = getPlaceNamed(newName);
    if (existingPlace && (existingPlace._id != placeId)) {
      throw new Meteor.Error("duplicate", "There's already another place named " + newName);
    }
    var count = Places.update(
      {gangId: gangId, _id: placeId},
      {$set: {name: newName, icon: newIcon}}
    );
    if (count == 0) {
      throw new Meteor.Error("error", "Strange I couldn't update the place");
    }    
  },  

  removePerson: function(personId) {
    var gangId = assertLoggedIn();
        
    var count = People.remove({gangId: gangId, _id: personId});
    if (count == 0) {
      throw new Meteor.Error("error", "Strange, I couldn't remove this person");
    }
  }, 

  removePlace: function(placeId) {
    var gangId = assertLoggedIn(); 

    People.update(
      {gangId: gangId, placeId: placeId},
      {$set: {placeId: null}}
    );
    var count = Places.remove({gangId: gangId, _id: placeId});    
    if (count == 0) {
      throw new Meteor.Error("error", "Strange, I couldn't remove this place");
    }
  },
  
  chat: function(from, text) {
    var gangId = assertLoggedIn(); 

    Messages.insert({
      gangId: gangId,
      from: from,
      text: text,
      time: new Date()
    });
  },
  
  clearChatMessages: function() {
    var gangId = assertLoggedIn();

    Messages.remove({gangId: gangId});
  }
});

var latency = false;

simulateLatency = function() {
  if (latency && Meteor.isServer) {
    console.log("Simulating latency... zzzzz");
    Meteor._sleepForMs(3000);
    console.log("   ... wake up!");
  }
}



