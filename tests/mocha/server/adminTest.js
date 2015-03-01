if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){    
    beforeEach(function() {
      People.remove({});
      Places.remove({});
      Messages.remove({});
      addDefaultData();
    });
    
    describe("Admin", function() {
      it("Should be able to add a person", function() {
        chai.assert(!doesPersonExist("Frank"));
        Meteor.call("createPerson", "Frank"); 
        chai.assert(doesPersonExist("Frank"));          
      });
    });
  });

}
