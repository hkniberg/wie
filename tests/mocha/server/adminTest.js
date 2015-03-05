var assert = chai.assert;

if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){    
    
    beforeEach(function() {
      People.remove({});
      Places.remove({});
      Messages.remove({});
      Gangs.remove({});
      addDefaultData();
    });
    
    describe("Admin", function() {            
      it("Create Gang", function() {
        assert(!doesGangExist("TheDudes"));  
        var gangId = createGang("TheDudes", "xyz");
        assert(gangId);
        assert(doesGangExist("TheDudes"));  
        assert.equal(1, Gangs.find({_id: gangId}).count());
      });
      
      it("get person by ID", function() {
        assert.notOk(getPerson("fakeId"));
        var gangId = createGang("TheDudes", "xyz");
        var personId = addPerson(gangId, "Henrik");   
        assert(personId);
        assert(getPerson(gangId, personId));
      });
      
      it("Add/find/remove person", function() {
        var gangId = createGang("TheDudes", "xyz");
        assert.equal(0, getPeople(gangId).length);
        
        var personId = addPerson(gangId, "Henrik");        
        assert(personId),
        assert.equal(1, getPeople(gangId).length);
        
        removePerson(gangId, personId);
        assert.equal(0, getPeople(gangId).length);
      });
      
      it("Add/find/remove place", function() {
        var gangId = createGang("TheDudes", "xyz");
        assert.equal(0, getPlaces(gangId).length);
        
        var placeId = addPlace(gangId, "Bar");        
        assert(placeId),
        assert.equal(1, getPlaces(gangId).length);
        
        removePlace(gangId, placeId);
        assert.equal(0, getPlaces(gangId).length);
      });      
    });
  });
}
