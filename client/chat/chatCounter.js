//unreadChatCount = new ReactiveVar();

Template.chatCounter.helpers({
  unreadMessageCount: function() {    
    var unreadCount = countMessagesAfterTime(getLastReadMessageTime());
    if (unreadCount > 0) {
      return unreadCount;
    } else {
      return "";
    }
  }
})

