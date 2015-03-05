movePerson = function(gangId, personId, placeId) {
  People.update(
    {_id: personId, gangId: gangId},
    {$set: {placeId: placeId}}    
  );
}