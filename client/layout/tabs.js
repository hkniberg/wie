currentTab = new ReactiveVar();
currentTab.set('checkin');

Template.tabs.events({
  
  'click .nav-tabs': function(e) {
    var href = e.target.href;
    
    if (href.indexOf('tab-checkin') > -1) {
      currentTab.set('checkin');       
      
    } else if (href.indexOf('tab-chat') > -1) {
      currentTab.set('chat');
      scrollChatToBottom();
      setAllMessagesRead();
      
    } else if (href.indexOf('tab-admin') > -1) {
      currentTab.set('admin');    
    }
  }
})