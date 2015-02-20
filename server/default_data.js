if (People.find().count() === 0) {
  var now = new Date().getTime();
  

  var cabinId = Places.insert({
    name: 'cabin',
    icon: 'cabin.png'
  });
  
  var slopeId = Places.insert({
    name: 'slope',
    icon: 'ski.png'
  });


  People.insert({
    name: 'Joe',
    placeId: cabinId,
    time: new Date(now - 1 * 60 * 1000)
  });
  People.insert({
    name: 'Henrik',
    placeId: cabinId,
    time: new Date(now - 5 * 60 * 1000)
  });
  People.insert({
    name: 'Lisa',
    placeId: slopeId,
    time: new Date(now - 30 * 60 * 1000)
  });
  People.insert({
    name: 'Jenny',
    placeId: null,
    time: new Date(now - 60 * 60 * 1000)
  });
  People.insert({
    name: 'Sam',
    placeId: null,
    time: new Date(now - 100 * 60 * 1000)
  });
  
}