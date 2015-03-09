createGang = function(gangName, password) {
  return Accounts.createUser({
    username: gangName,
    password: password
  })
};

getGang = function(gangId) {
  return Meteor.users.findOne({_id: gangId});
}




