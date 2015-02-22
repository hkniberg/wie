unreadChatCount = new ReactiveVar();

Template.chatCounter.helpers({
  unreadMessageCount: function() {
    var count = unreadChatCount.get();
    if (count == 0) {
      return null;
    } else {
      return count;
    }
  }
})

