addDefaultData = function() {
  var now = new Date().getTime();

  var skigang = createGang("Skigang", "x");
  
  var cabin = Places.insert({
    gangId: skigang,
    name: 'Cabin',
    icon: 'cabin.png'
  });
  var pub = Places.insert({
    gangId: skigang,
    name: 'Pub',
    icon: 'beer.png'
  });
  var bbq = Places.insert({
    gangId: skigang,
    name: 'BBQ',
    icon: 'food.png'
  });
  var cliff = Places.insert({
    gangId: skigang,
    name: 'The Cliff',
    icon: 'ski.png'
  })
  var kiddySlope = Places.insert({
    gangId: skigang,
    name: 'Kiddyslope',
    icon: 'ski.png'
  })
  

  People.insert({
    name: 'Beevis',
    gangId: skigang,
    placeId: pub,
    time: new Date(now - 1 * 60 * 1000)
  });
  People.insert({
    name: 'Butthead',
    gangId: skigang,
    placeId: pub,
    time: new Date(now - 5 * 60 * 1000)
  });
  People.insert({
    name: 'Humpty',
    gangId: skigang,
    placeId: kiddySlope,
    time: new Date(now - 30 * 60 * 1000)
  });
  People.insert({
    name: 'Dumpty',
    gangId: skigang,
    placeId: kiddySlope,
    time: new Date(now - 60 * 60 * 1000)
  });
  People.insert({
    name: 'Donald',
    gangId: skigang,
    placeId: cabin,
    time: new Date(now - 100 * 60 * 1000)
  });
  People.insert({
    name: 'Daisy',
    gangId: skigang,
    placeId: cabin,
    time: new Date(now - 100 * 60 * 1000)
  });
  People.insert({
    name: 'Goofy',
    gangId: skigang,
    placeId: cabin,
    time: new Date(now - 100 * 60 * 1000)
  });  
  
  Messages.insert({
    gangId: skigang,
    from: 'Joe',
    text: 'Hey there :)',
    time: new Date(now - 10 * 60 * 1000)
  });
  Messages.insert({
    gangId: skigang,
    from: 'Lisa',
    text: 'Cool, here is a pretty long message that might take up several rows.',
    time: new Date(now - 30 * 60 * 1000)
  });
  Messages.insert({
    gangId: skigang,
    from: 'Joe',
    text: 'This is cool!',
    time: new Date()
  });

}


if (People.find().count() === 0) {
  addDefaultData();
  
}