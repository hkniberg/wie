Session.setDefault('selectedPeople', []);

select = function(person) {
  var oldSelection = Session.get('selectedPeople');
  var newSelection = _.union(oldSelection, [person]);
  Session.set('selectedPeople', newSelection);
};

deselect = function(person) {  
  var oldSelection = Session.get('selectedPeople');
  var newSelection = _.filter(oldSelection, function(selectedPerson){
    return selectedPerson.name !== person.name
  });
  Session.set('selectedPeople', newSelection);  
};

getSelectedPeople = function() {
  return Session.get('selectedPeople');
};

toggleSelection = function(person) {
  isSelected(person) ? deselect(person) : select(person);
};

isSelected = function(person) {
  return !!_.findWhere(Session.get('selectedPeople'), {name: person.name});
};

clearSelection = function() {
  Session.set('selectedPeople', []);
};

hasSelection = function() {
  return getSelectedPeople().length > 0;
}