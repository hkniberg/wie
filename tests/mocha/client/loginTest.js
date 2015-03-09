var username;
var password;

if (!(typeof MochaWeb === 'undefined')){
  
  MochaWeb.testOnly(function(){    
    

    
    beforeEach(function(done) {
      var time = new Date().getTime();
      username = "joe" + time + Math.floor(Math.random() * 100000);
      password = "xyz";
      
      Accounts.createUser({username: username, password: password}, function(err) {
        if (err) return done("createUser failed (beforeEach): " + err);
        
        Meteor.logout(function(err) {
          if (err) return done("logout failed (beforeEach): " + err);
      
          if (Meteor.user() != null) {
            return done("Huh?!! How can I have a user if I just logged out " + Meteor.user().username);
          }

          done();
        })
        
      });  
    });
           
    describe("Login", function() {

      it("Can't login with wrong user", function(done) {
        
        Meteor.loginWithPassword("wronguser", password, function(err, result) {
          if (!err) {
            done("Hey, I was able to login with wrong username!");
          }
          done();
        });        
      });

      it("Can't login with wrong password", function(done) {
        
        Meteor.loginWithPassword(username, "wrongpassword", function(err, result) {
          if (!err) {
            done("Hey, I was able to login with wrong password!");
          }
          done();
        });        
      });
      
      it("Can login with right password", function(done) {           
        
        Meteor.loginWithPassword(username, "xyz", function(err, result) {
          if (err) return done("loginWithPassword failed: " + err);

          if (Meteor.user() == null) {
            return done("WTF, I just logged in so how come Meteor.user() is null?")
          }
        
          if (Meteor.user().username != username) {
            return done("Hey, username should be " + username + ", it was " + Meteor.user().username);
          }
    
          Meteor.call("whoAmI", function(err, result) {
            if (err) return done("whoAmI failed: " + err);
          
            if (!result) {
              return done("Hey, login succeeded but whoAmI didn't return any userId!");
            }       
            done(); 
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
