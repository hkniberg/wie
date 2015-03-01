var joe = {_id: 25, name: "Joe", place_id: null};

if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("selection", function(){
      it("should be empty initially", function(){
        chai.assert.equal(getSelectedPeople().length, 0);
      });
      it("toggle", function(){
        chai.assert.notOk(isSelected(joe));
        toggleSelection(joe);
        chai.assert.ok(isSelected(joe));        
      });
    });    
  });
}
