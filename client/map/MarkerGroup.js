var latRadius = 0.00032;
var lngRadius = 0.001;
var ageThresholdMs = 10 * 60 * 1000; //10 minutes

MarkerGroup = function(map, person) {
  assert.ok(person);  
  assert.ok(person.position);  
  
  this.people = [person];
    
  this.marker = new google.maps.Marker({
    position: new google.maps.LatLng(person.position.lat, person.position.lng),
    map: map,
    title: this.getFormattedName(person)
  });
  
  this.infoWindow = new google.maps.InfoWindow({
    content: this.marker.title,
    maxWidth: 200
  })    
  
  var infoWindow = this.infoWindow;
  var marker = this.marker;
  
  //TODO when do we remove the listener?
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.open(map, marker);
  });
}

MarkerGroup.prototype.contains = function(person) {
  return _.find(this.people, function(p) {
    return p._id == person._id;
  });
}

MarkerGroup.prototype.moveTo = function(person) {
  this.marker.setPosition(new google.maps.LatLng(person.position.lat, person.position.lng));
}
  
MarkerGroup.prototype.isSinglePerson = function() {
  return this.people.length == 1;
}

MarkerGroup.prototype.getPosition = function() {
  return this.marker.getPosition();
}

MarkerGroup.prototype.getLat = function() {
  return this.marker.getPosition().lat();
}

MarkerGroup.prototype.getLng = function() {
  return this.marker.getPosition().lng();
}

MarkerGroup.prototype.isNear = function(person) {
  var latDiff = Math.abs(person.position.lat - this.getLat());
  var lngDiff = Math.abs(person.position.lng - this.getLng());
  return (latDiff < latRadius) && (lngDiff < lngRadius);
}

MarkerGroup.prototype.getPeople = function() {
  return this.people;
}

MarkerGroup.prototype.add = function(person) {
  assert.ok(person);  
  assert.ok(person.position);  
  
  this.people.push(person);
  this.updateText();
}

MarkerGroup.prototype.remove = function(person) {
  this.people = _.reject(this.people, function(p) {
    return p._id == person._id;
  });  
  
  if (this.people.length == 0) {
    this.marker.setMap(null);
  } else if (this.people.length == 1) {
    this.moveTo(this.people[0]);
  }
  this.updateText();
}

MarkerGroup.prototype.isEmpty = function() {
  return this.people.length == 0;
}

MarkerGroup.prototype.getText = function() {
  var text = "";
  if (this.people.length == 0) {
    text = "(nobody)";
  } else if (this.people.length == 1) {
    text = this.getFormattedName(this.people[0]);
  } else {
    text = this.getFormattedName(this.people[0]);
    
    var self = this;
    this.people.slice(1).forEach(function(person) {
      text = text + ", " + self.getFormattedName(person);
    });    
  }
  return text;
}

MarkerGroup.prototype.getFormattedName = function(person) {
  var position = person.position;
  var positionLastUpdated = position.time;
  var now = new Date();
  var ageMs = now.getTime() - positionLastUpdated.getTime();
  if (ageMs < ageThresholdMs) {
    return "<b>" + person.name + "</b>";
  } else {
    return person.name;
  }
}

MarkerGroup.prototype.updateText = function() {
  var text = this.getText();
  this.marker.setTitle(text);
  this.infoWindow.setContent(text);
  
}
MarkerGroup.prototype.updateTime = function(person) {
  var myPerson = _.find(this.people, function(p) {
    return p._id == person._id;
  })
  assert.ok(myPerson);
  myPerson.position = person.position;
  this.updateText();
}
