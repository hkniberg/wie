if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){    
    describe("Login", function() {
      it("Has session", function(done) {
        var time = new Date().getTime();
        Accounts.createUser({username: "joe" + time, password: "xyz"});
        Meteor.loginWithPassword("joe" + time, "xyz");
        
        Meteor.call("whoAmI", function(err, result) {
          chai.assert.notOk(err);
          chai.assert.equals("joe" + time, result);
          done();
        });
        
        
        //chai.assert(Meteor.userId());  
        //chai.assert.equals("xyt", Meteor.user().username);  
      });
      
    });
  });

}
