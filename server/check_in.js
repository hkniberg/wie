movePerson = function(gangId, personId, placeId) {
  Gangs.update(
    {_id: gangId, "people._id": personId},
    {$set: {"people.$.placeId": placeId}}    
  );
}