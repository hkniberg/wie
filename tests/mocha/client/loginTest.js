if (!(typeof MochaWeb === 'undefined')){
  
  MochaWeb.testOnly(function(){    
    
    describe("Login", function() {
      it("Has session", function(done) {
        var time = new Date().getTime();
        var name = "joe" + time;

        Meteor.loginWithPassword(name, "xyz", function(err, result) {
          if (!err) {
            done("Hey, I was able to login with a non-existent account!");
          }
        });

        Accounts.createUser({username: name, password: "xyz"});
        Meteor.loginWithPassword(name, "xyz", function(err, result) {
          if (err) {
            return done(err);
          }
          Meteor.call("whoAmI", function(err, result) {
            if (err) {
              return done(err);
            }    
            if (!result) {
              done("Hey, login succeeded but I didn't get a userId in response!");
            }       
            done(); 
          });
          
          /*
          Meteor.call("whoAmI", function(err, result) {
            chai.assert.notOk(err);
            chai.assert.equals("joe" + time, result);
            done();
          });
          */


          //done();
        });
        
        
        /*
        Meteor.call("whoAmI", function(err, result) {
          chai.assert.notOk(err);
          chai.assert.equals("joe" + time, result);
          done();
        });
        */
        
        
        //chai.assert(Meteor.userId());  
        //chai.assert.equals("xyt", Meteor.user().username);  
      });
      
    });
  });
  

}
