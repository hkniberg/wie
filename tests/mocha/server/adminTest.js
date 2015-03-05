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
           
      it("userId override", function() {
        var oldUserIdFunction = Meteor.userId;
                
        Meteor.userId = function() {
          return "Jacky";
        }
        assert.equal("Jacky", Meteor.userId());
        assert.equal("Jacky", Meteor.call("whoAmI"));
        
        Meteor.userId = oldUserIdFunction;
      });
      

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
        assert.equal(0, getPeople(gangId).count());
        
        var personId = addPerson(gangId, "Henrik");        
        assert(personId),
        assert.equal(1, getPeople(gangId).count());
        
        removePerson(gangId, personId);
        assert.equal(0, getPeople(gangId).count());
      });
      
      it("Add/find/remove place", function() {
        var gangId = createGang("TheDudes", "xyz");
        assert.equal(0, getPlaces(gangId).count());
        
        var placeId = addPlace(gangId, "Bar");        
        assert(placeId),
        assert.equal(1, getPlaces(gangId).count());
        
        removePlace(gangId, placeId);
        assert.equal(0, getPlaces(gangId).count());
      });      
    });
  });
}
