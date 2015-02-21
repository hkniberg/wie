currentTab = new ReactiveVar();
currentTab.set('checkin');

Template.tabs.events({
  
  'click .nav-tabs': function(e) {
    var href = e.target.href;
    
    if (href.indexOf('tab-checkin') > -1) {
      currentTab.set('checkin');       
      
    } else if (href.indexOf('tab-chat') > -1) {
      currentTab.set('chat');
      setTimeout(function() {
        scrollChatToBottom();
      }, 200);
      unreadChatCount.set(0);
      
    } else if (href.indexOf('tab-admin') > -1) {
      currentTab.set('admin');    
    }
  }
})