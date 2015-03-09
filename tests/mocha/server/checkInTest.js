var assert = chai.assert;

if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){  
      
    beforeEach(function() {
      People.remove({});
      Places.remove({});
      Messages.remove({});
      Meteor.users.remove({});
      //addDefaultData();

      skigang = createGang("Skigang", "xyz");
      bar = addPlace(skigang, "Bar");
      slope = addPlace(skigang, "Slope");
      henrik = addPerson(skigang, "Henrik"); 
    });
    

    describe("Check in", function() {
      it("Move Henrik to Bar", function() {
        assert.equal(null, getPerson(skigang, henrik).placeId);
        assert.equal(0, getPeopleAt(skigang, bar).count());

        movePerson(skigang, henrik, bar);
        assert.equal(bar, getPerson(skigang, henrik).placeId);
        assert.equal(1, getPeopleAt(skigang, bar).count());
        
      });
           
    });

  });
}
