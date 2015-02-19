if (People.find().count() === 0) {
  var now = new Date().getTime();
  
  People.insert({
    name: 'Joe',
    place: 'cabin',
    time: new Date(now - 1 * 60 * 1000)
  });
  People.insert({
    name: 'Henrik',
    place: 'cabin',
    time: new Date(now - 5 * 60 * 1000)
  });
  People.insert({
    name: 'Lisa',
    place: 'slope',
    time: new Date(now - 30 * 60 * 1000)
  });
  People.insert({
    name: 'Jenny',
    place: '',
    time: new Date(now - 60 * 60 * 1000)
  });
}