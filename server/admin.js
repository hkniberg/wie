createGang = function(gangName, password) {
  return Accounts.createUser({
    username: gangName.toLowerCase(),
    password: password,
    profile: {gangName: gangName}
  })
};

getGang = function(gangId) {
  return Meteor.users.findOne({_id: gangId});
}




