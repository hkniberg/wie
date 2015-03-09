movePerson = function(personId, placeId) {
  People.update(
    {_id: personId, gangId: getGangId()},
    {$set: {placeId: placeId}}    
  );
}