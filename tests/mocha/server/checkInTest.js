var assert = chai.assert;

if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){  
    
    describe("Check in", function() {

      beforeEach(function() {
        People.remove({});
        Places.remove({});
        Messages.remove({});
        Meteor.users.remove({});
      
        var gangId = createGang("Skigang", "xyz");
        assert(doesGangExist("Skigang"));  
        oldUserIdFunction = Meteor.userId;
        Meteor.userId = function() {
          return gangId;
        } 

        bar = Meteor.call("createPlace", "Bar");
        slope = Meteor.call("createPlace", "Slope");
        henrik = Meteor.call("createPerson", "Henrik"); 
      });
    
      afterEach(function() {
        Meteor.userId = oldUserIdFunction;
      });



      it("Move Henrik to Bar", function() {
        assert.equal(null, getPerson(henrik).placeId);
        assert.equal(0, getPeopleAt(bar).count());

        movePerson(henrik, bar);
        assert.equal(bar, getPerson(henrik).placeId);
        assert.equal(1, getPeopleAt(bar).count());
        
      });
           
    });

  });
}
