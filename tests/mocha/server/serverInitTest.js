if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Server initialization", function(){
      it("should have a Meteor version defined", function(){
        chai.assert(Meteor.release);
      });
    });
    /*
    
    describe("Default data", function() {
      it("should have Jenny", function(){
        chai.assert.ok(doesPersonExist("Jenny"));
      });
      it("should not have Egbert", function(){
        chai.assert.notOk(doesPersonExist("Egbert"));
      });
    });
    */
  });
 
 
}
