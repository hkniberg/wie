if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){    
    beforeEach(function() {
      People.remove({});
      Places.remove({});
      Messages.remove({});
      Meteor.users.remove({});
      addDefaultData();
    });
    
    describe("Admin", function() {
      it("Add a person", function() {
        chai.assert(!doesPersonExist("Frank"));
        Meteor.call("createPerson", "Frank"); 
        chai.assert(doesPersonExist("Frank"));          
      });
      /*
      it("Create Gang", function() {
        chai.assert(!doesGangExist("TheDudes"));  
        Meteor.call("createGang", "TheDudes", "xyz");
        chai.assert(doesGangExist("TheDudes"));  
      });
      */
      /*
      it("Has session", function() {
        Accounts.createUser({username: "joe2", password: "xyz"});
        Meteor.loginWithPassword("joe2", "xyz");
        chai.assert.equals("joe2", Meteor.call("whoAmI"));
        
        //chai.assert(Meteor.userId());  
        //chai.assert.equals("xyt", Meteor.user().username);  
      });
      */
    });
  });

}
