Meteor.methods({

  whoAmI: function() {
    return Meteor.userId();
  },

  createGang: function(gangName) {
    var userId = Meteor.userId()
    assert(userId, "User is not logged in!")
    
    Gangs.insert({
      name: gangName,
      ownerId: userId
    })
  },

  movePersonTo: function(personId, placeId) {
    simulateLatency();    
    
    if (placeId != null) {
      if (Places.find({_id: placeId}).count() == 0) {
        throw "Hey, there is no place #" + placeId;
      }
    }
    
    var time = new Date();
    
    People.update(
      {_id: personId}, 
      {$set: {
        placeId: placeId,
        time: time
      }}
    ); 
    
    Places.update(
      {_id: placeId}, 
      {$set: {
        lastCheckinTime: time
      }}
      
    );
  },

  createPerson: function(name) {
    simulateLatency();  
    addPerson(name);
  },
  
  createPlace: function(name, icon) {
    simulateLatency();  
    assert(this.userId);  
    
    var userId = Meteor.userId();
    if (!userId) {
      throw "Not logged in!";
    }
      
    if (doesPlaceExist(name)) {
      throw new Meteor.Error("duplicate", "There's already another place named " + name);
    }
    var result = Places.insert({
      gangId: this.userId,
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
  
  updatePlace: function(placeId, newName, newIcon) {
    simulateLatency();   
    
    var existingPlace = getPlaceNamed(newName);
    if (existingPlace && (existingPlace._id != placeId)) {
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
  
  chat: function(from, text) {
    simulateLatency();    

    Messages.insert({
      from: from,
      text: text,
      time: new Date()
    });
  },
  
  clearChatMessages: function() {
    simulateLatency();    

    Messages.remove({});
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



