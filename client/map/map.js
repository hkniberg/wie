markerGroups = [];
//lat,lng,people,marker,infoWindow



//var markers = {};
//var bounds;
//var leastSignificantMove = 0.0001;
var leastSignificantMove = 0.000001;

//TEMP for testing purposes

up = function(name, distance) {
  var person = getPersonNamed(name);
  Meteor.call("reportPosition", person._id, person.position.lat + distance, person.position.lng);
}
down = function(name, distance) {
  var person = getPersonNamed(name);
  Meteor.call("reportPosition", person._id, person.position.lat - distance, person.position.lng);
}
right = function(name, distance) {
  var person = getPersonNamed(name);
  Meteor.call("reportPosition", person._id, person.position.lat, person.position.lng + distance);
}
left = function(name, distance) {
  var person = getPersonNamed(name);
  Meteor.call("reportPosition", person._id, person.position.lat, person.position.lng - distance);
}
showGroups = function() {
 markerGroups.forEach(function(markerGroup) {
   console.log(" - " + markerGroup.getText());
 }) 
}
where = function(name) {
  var person = getPersonNamed(name);
  return person.name + ": " + person.position.lat + " - " + person.position.lng;  
}


var updateMapText = function() {
  markerGroups.forEach(function(markerGroup) {
    markerGroup.updateText();
  });
}

Meteor.setInterval(function() {
  if (currentTab.get() == "map") {
    updateMapText();
  }
}, 10000);


var getMapBounds = function() {
  var bounds = new google.maps.LatLngBounds();
  markerGroups.forEach(function(markerGroup) {
    bounds.extend(markerGroup.getPosition());    
  });
  return bounds;
}

zoomAndPanMapToSeeEveryone = function() {
  google.maps.event.trigger(map, 'resize');    
  
  var bounds = getMapBounds();        
  if(bounds && !bounds.isEmpty()) {
    map.fitBounds(bounds);
    if (map.getZoom() > 16) {
      map.setZoom(16);
    }
  } 
}

findPreviousMarkerGroup = function(person) {
  return _.find(markerGroups, function(markerGroup) {
    return markerGroup.contains(person);
  });  
}

findMarkerGroupNear = function(person) {
  return _.find(markerGroups, function(markerGroup) {
    return markerGroup.isNear(person);
  });  
}

updateMarker = function(person) {
  //console.log("Update marker (" + person.name + ")")
  if (person.position && person.position.lat && person.position.lng) {
    //Good, this person has a position. See if I used to be in a marker group
    var previousMarkerGroup = findPreviousMarkerGroup(person);
    var currentMarkerGroup = null;
    if (previousMarkerGroup) {
      //Yes, I used to be in that one! Let's see if I still belong in there.
      if (previousMarkerGroup.isNear(person)) {
        //console.log(person.name + " still belongs in his previous marker group");
        //Yes, I stll belong in there. No need to change anything.
        currentMarkerGroup = previousMarkerGroup;
      } else {
        //Oh, I've moved away. 
        if (previousMarkerGroup.isSinglePerson()) {
          //... but it was just me in there, so let's just move the whole group.
          currentMarkerGroup = findMarkerGroupNear(person);
          if (currentMarkerGroup) {
            //console.log(person.name + " moved away from his previous marker group, and it was just him, and he moved close to another marker group, so I'll terminate the old one and join the new one instead.")
            previousMarkerGroup.remove(person);
            currentMarkerGroup.add(person);
            markerGroups = _.without(markerGroups, previousMarkerGroup);
          } else {
            //console.log(person.name + " moved away from his previous marker group, but it was just him so I'll move the whole group.");
            currentMarkerGroup = previousMarkerGroup;
            currentMarkerGroup.moveTo(person);            
          }
            
        } else {          
          //console.log(person.name  + " moved away from his previous marker group, so I'll take him out of it.");
          previousMarkerGroup.remove(person);
        }        
      }      
    } else {
      //console.log(person.name + " didn't have a previous marker group");
    } 
    
    if (!currentMarkerGroup) {
      //Need to figure out which marker group I should be in.
      currentMarkerGroup = findMarkerGroupNear(person);
      if (currentMarkerGroup) {
        //console.log(person.name + " found another existing marker group nearby");
        //Aha, I found an existing marker group that I should belong to!
        currentMarkerGroup.add(person);
      } else {
        //console.log(person.name + " isn't near any marker group, will create one!");
        //No existing group is near me. Create a new one.
        currentMarkerGroup = new MarkerGroup(map, person);
        markerGroups.push(currentMarkerGroup);
      }
    }
    currentMarkerGroup.updateTime(person);
        
  } else {
    //I don't have a position! Won't do anything for now.
  }
}

/*
updateMarker = function(person) {
  var marker = markers[person._id];
  if (person.position && person.position.lat && person.position.lng) {
    var position = new google.maps.LatLng(person.position.lat, person.position.lng);
    if (!marker) {
      marker = new google.maps.Marker({
        position: position,
        map: map,
        title: "David & Jenny & Henrik & Sia & Ullis & Pelle & Anders & Maja & Ossian"
      });
      
      var infoWindow = new google.maps.InfoWindow({
        content: marker.title,
        maxWidth: 200
      })      
      
      //TODO when do we remove the listener?
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.open(map, marker);
      });
      
      markers[person._id] = marker;      
    } else {
      console.log("Moving " + person.name + "'s marker to " + position);
      marker.setPosition(position);
    }      
    bounds.extend(position);
  } else {
    if (marker) {
      marker.setMap(null);
      markers[person._id] = null;        
    }
  }      
}
*/

updateMap = function() {
  getAllPeople().forEach(updateMarker);
}

Template.map.helpers({
  people: function() {
    return getAllPeople();
  }
})

Template.mapPersonButton.helpers({
  personClass: function() {
    return isSelected(this) ? 'btn-success' : '';
  },
})

Template.mapPersonButton.events({
  'click': function(e) {
    toggleSelection(this);
  }
});

Template.map.events({
  'click #seeEveryoneButton': function(e) {
    zoomAndPanMapToSeeEveryone();
  },
  'click #henrikLeft': function(e) {
    var henrik = getPersonNamed("Henrik");
    var newLng = henrik.position.lng - 0.001;
    Meteor.call("reportPosition", henrik._id, henrik.position.lat, newLng);
  },
  'click #henrikRight': function(e) {
    var henrik = getPersonNamed("Henrik");
    var newLng = henrik.position.lng + 0.001;
    Meteor.call("reportPosition", henrik._id, henrik.position.lat, newLng);
  }
})

isPositionDifferent = function(oldPosition, newPosition) {
  if (!oldPosition && !newPosition) {
    return false;
  }
  if (oldPosition && !newPosition) {
    return true;
  }
  if (newPosition && !oldPosition) {
    return true;
  }
  return (newPosition.lat != oldPosition.lat) || (newPosition.lng != oldPosition.lng)
  
}




Template.map.rendered = function() {
  GoogleMaps.init(
      {
          //'sensor': true, //optional
          //'key': 'MY-GOOGLEMAPS-API-KEY', //optional
          //'language': 'de' //optional
      }, 
      function(){
          var mapOptions = {
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              streetViewControl: false
          };
          map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions); 
          map.setCenter(new google.maps.LatLng( 63.3886602, 13.1510247 ));
          updateMap();
      }
  );  
  getAllPeople().observe({
	
	  //AHA, something changed. Let's see if it was the position.
    changed: function(newPerson, oldPerson) {      
      if (isPositionDifferent(newPerson.position, oldPerson.position)) {
        updateMarker(newPerson);
      }
    }
  }); 
}


