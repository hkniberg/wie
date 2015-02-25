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
      /*
      marker = new MarkerWithLabel({
        position: position,
        map: map,
       // title: person.name,
       labelContent: "$425K",
       labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels", // the CSS class for the label
       labelStyle: {opacity: 0.75},
      });
      */
      
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


