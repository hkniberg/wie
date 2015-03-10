var assert = chai.assert;
var oldUserIdFunction;
var gangId;

if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){    

    
    describe("Admin", function() {      
      
    
      beforeEach(function() {
        People.remove({});
        Places.remove({});
        Messages.remove({});
        Meteor.users.remove({});
      
        gangId = createGang("TheDudes", "xyz");
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
        var personId = Meteor.call("createPerson", "Henrik");   
        assert(personId);
        assert(getPerson(personId));
      });
      
      it("Add/find/remove person", function() {
        assert.equal(0, getPeople().count());
        
        var personId = Meteor.call("createPerson", "John");        
        assert(personId),
        assert.equal(1, getPeople().count());
        
        Meteor.call("removePerson", personId);
        assert.equal(0, getPeople().count());
      });
      
      it("Add/find/remove place", function() {
        assert.equal(0, getPlaces().count());
        
        var placeId = Meteor.call("createPlace", "Bar");        
        assert(placeId),
        assert.equal(1, getPlaces().count());
        
        Meteor.call("removePlace", placeId);
        assert.equal(0, getPlaces().count());
      });  
      
      it("Rename gang", function() {
        assert.equal("thedudes", getGang(gangId).username);
        assert.equal("TheDudes", getGang(gangId).profile.gangName);
        Meteor.call("renameGang", "TheClowns");
        assert.equal("theclowns", getGang(gangId).username);
        assert.equal("TheClowns", getGang(gangId).profile.gangName);
        
      });    

      it("Can't rename gang to existing name", function() {
        createGang("TheClowns", "xyz");        

        assert.equal("thedudes", getGang(gangId).username);
        assert.equal("TheDudes", getGang(gangId).profile.gangName);
        try {
          Meteor.call("renameGang", "TheClowns");          
        } catch (err) {
          //good!
        }
        try {
          Meteor.call("renameGang", "theclowns");          
        } catch (err) {
          //good!
        }
        assert.equal("thedudes", getGang(gangId).username);
        assert.equal("TheDudes", getGang(gangId).profile.gangName);
        
      });    
      
      it("Remove gang", function() {
        assert.ok(getGang(gangId));
        Meteor.call("removeGang");          
        assert.notOk(getGang(gangId));        
      });          

    });
  });
}
