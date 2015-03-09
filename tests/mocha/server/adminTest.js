var assert = chai.assert;
var oldUserIdFunction;

if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){    

    
    describe("Admin", function() {      
      
    
      beforeEach(function() {
        People.remove({});
        Places.remove({});
        Messages.remove({});
        Meteor.users.remove({});
      
        var gangId = createGang("TheDudes", "xyz");
        assert(doesGangExist("TheDudes"));  
        oldUserIdFunction = Meteor.userId;
        Meteor.userId = function() {
          return gangId;
        } 
        assert.equal(0, getPeople().count());
      
      });
    
      afterEach(function() {
        Meteor.userId = oldUserIdFunction;
      });
          
      
      it("get person by ID", function() {
        assert.notOk(getPerson("fakeId"));
        var personId = addPerson("Henrik");   
        assert(personId);
        assert(getPerson(personId));
      });
      
      it("Add/find/remove person", function() {
        assert.equal(0, getPeople().count());
        
        var personId = addPerson("John");        
        assert(personId),
        assert.equal(1, getPeople().count());
        
        removePerson(personId);
        assert.equal(0, getPeople().count());
      });
      
      it("Add/find/remove place", function() {
        assert.equal(0, getPlaces().count());
        
        var placeId = addPlace("Bar");        
        assert(placeId),
        assert.equal(1, getPlaces().count());
        
        removePlace(placeId);
        assert.equal(0, getPlaces().count());
      });      
    });
  });
}
