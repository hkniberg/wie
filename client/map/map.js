var markers = {};
var bounds;
//var leastSignificantMove = 0.0001;
var leastSignificantMove = 0.000001;

zoomAndPanMapToSeeEveryone = function() {
  google.maps.event.trigger(map, 'resize');          
  if(bounds && !bounds.isEmpty()) {
    map.fitBounds(bounds);
  } 
}

updateMarker = function(person) {
  var marker = markers[person._id];
  if (person.position && person.position.lat && person.position.lng) {
    var position = new google.maps.LatLng(person.position.lat, person.position.lng);
    if (!marker) {
      marker = new google.maps.Marker({
        position: position,
        map: map,
        title: person.name
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

updateMap = function() {
  bounds = new google.maps.LatLngBounds();
  getAllPeople().forEach(updateMarker);
}


/*
updateMap = function() {
  
  
  var location = {lat: 63.3886602, lng: 13.1510247};
  // Geolocation.latLng();

  if (location && currentTab.get() == "map") {
    
    if (!marker) {
      map.setCenter(location);
      console.log("location = " + location);
    
      marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "You"
      });
      
      infoWindow = new google.maps.InfoWindow({
        content: "You"
      });
      
      infoWindow.open(map, marker);
      
    }
    
  } else {
    console.log("I don't know my location (yet), so I can't update the map");    
  } 
}*/

//Meteor.setInterval(updateMap, 3000);

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
              mapTypeId: google.maps.MapTypeId.ROADMAP
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



