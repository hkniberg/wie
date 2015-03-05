addDefaultData = function() {
  var now = new Date().getTime();
  
  /*
  
  var skigang = createGang("Skigang", "x");
  
  var cabin = createPlace(skigang, "Cabin", "cabin.png");
  var slope = createPlace(skigang, "Slope", "ski.png");

  var joe = createPerson(skigang, "Joe");
  movePerson(skigang, joe, )

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
  
  Messages.insert({
    from: 'Joe',
    text: 'Hey there :)',
    time: new Date(now - 10 * 60 * 1000)
  });
  Messages.insert({
    from: 'Lisa',
    text: 'Cool, here is a pretty long message that might take up several rows.',
    time: new Date(now - 30 * 60 * 1000)
  });
  Messages.insert({
    from: 'Joe',
    text: 'This is cool!',
    time: new Date(now - 70 * 60 * 1000)
  });
  */
}


if (People.find().count() === 0) {
  addDefaultData();
  
}