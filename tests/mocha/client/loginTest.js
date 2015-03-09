if (!(typeof MochaWeb === 'undefined')){
  
  MochaWeb.testOnly(function(){    
    
    /*
    beforeEach(function(done) {
      Meteor.logout(function(err) {
        if (err) return done("Logout failed: " + err);
        var time = new Date().getTime();
        username = "joe" + time + Math.floor(Math.random() * 100000);
        Accounts.createUser({username: username, password: "xyz"}, function(err) {
          if (err) return done("createUser failed: " + err);
          done();          
        });                      
      });
    });    
    
    */
    describe("Login", function() {
      
    
      /*
      it("Can't login with wrong password....", function(done) {
        Meteor.loginWithPassword(username, "wrongpassword", function(err, result) {
          if (!err) {
            done("Hey, I was able to login with wrong password!");
          }
          done();
        });        
      });
      */
     
      
      
      it("Can login with right password", function(done) {



        Meteor.logout(function(err) {
          if (err) return done("First logout failed: " + err);
          
          if (Meteor.user() != null) {
            return done("Huh?!! How can I have a user if I just logged out (initial logout) " + Meteor.user().username);
          }


          var time = new Date().getTime();
          var username = "joe" + time + Math.floor(Math.random() * 100000);
          
          Accounts.createUser({username: username, password: "xyz"}, function(err) {
            if (err) return done("createUser failed: " + err);
            
            Meteor.logout(function(err) {
              if (err) return done("Second logout failed: " + err);
          
              if (Meteor.user() != null) {
                return done("Huh?!! How can I have a user if I just logged out " + Meteor.user().username);
              }
              
              if (Meteor.user() != null) {
                return done("Huh?!! How can I have a user if I just created the account? " + Meteor.user().username);
              }

              Meteor.loginWithPassword(username, "xyz", function(err, result) {
                if (err) return done("loginWithPassword failed: " + err);

                if (Meteor.user() == null) {
                  return done("WTF, I just logged in so how come Meteor.user() is null?")
                }
              
                if (Meteor.user().username != username) {
                  return done("Hey, username should be " + username + ", it was " + Meteor.user().username);
                }
          
                Meteor.setTimeout(function() {
                  Meteor.call("whoAmI", function(err, result) {
                    if (err) return done("whoAmI failed: " + err);
                  
                    if (!result) {
                      return done("Hey, login succeeded but whoAmI didn't return any userId!");
                    }       
                    done(); 
                  });
      
            
                }, 500);
          
              });            
            })
            
          });                      
        });


  
      });
    
      /*
      it("Creates a gang", function(done) {
        
      });
      */
      
    });
    
    
  });
  

}
