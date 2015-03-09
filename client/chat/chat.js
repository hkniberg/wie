scrollChatToBottom = function() {
  setTimeout(function() {
    $("#chatMessages").scrollTop($("#chatMessages").prop("scrollHeight"));
  }, 200);
}




getLastReadMessageTime = function() {
	var date = Session.get("lastReadMessageTime");
  if (!date) {
    var time = localStorage.getItem("lastReadMessageTime");
    if (time) {
      date = new Date(time);
      Session.set("lastReadMessageTime", date);
    } else {
      date = null;
    }     
  }
  return date;
}

setLastReadMessageTime = function(date) {
  if (date) {
  	localStorage.setItem("lastReadMessageTime", date.getTime());    
  }  
  Session.set("lastReadMessageTime", date);
}

setLastReadMessage = function(message) {
  if (message && message.time) {
    setLastReadMessageTime(message.time);
  } else {
    setLastReadMessageTime(null);
  }
}

isMessageUnread = function(message) {
  var lastReadMessageTime = getLastReadMessageTime();
  if (lastReadMessageTime) {
    return message.time.getTime() > lastReadMessageTime;
  } else {
    return true;
  }
}

/*
increaseUnreadChatCount = function() {
  var unreadCount = unreadChatCount.get();
  if (!unreadCount) {
    unreadCount = 1;
  } else {
    unreadCount += 1;
  }
  unreadChatCount.set(unreadCount);
}
*/

setAllMessagesRead = function() {
  //unreadChatCount.set(0);
  var lastMessage = getLastChatMessage();
  setLastReadMessage(lastMessage);
}

getSavedSenderName = function() {
  return localStorage.getItem("savedSenderName");  
}

setSavedSenderName = function(name) {
  localStorage.setItem("savedSenderName", name);
}

Template.chat.helpers({    
  people: function() {
    return getPeople();
  },
  
  chatMessages: function() {
    return getAllChatMessages();
  },
  
  text: function() {
    return this.text;
  },
  
  time: function() {
    return moment(this.time).format("HH:mm");    
  }
});

Template.chat.events({
  'change #chatSender': function(e) {
    setSavedSenderName($("#chatSender").val());
  },
  
  'submit form': function(e) {
    e.preventDefault();
    var from = $("#chatSender").val();
    var text = $("#chatText").val();
    
    if (from && text) {
      Meteor.call("chat", from, text);   
      $("#chatText").val("");   
      scrollChatToBottom();
    }
  }
});


Template.chat.rendered = function() {
  var savedSenderName = getSavedSenderName();
  if (savedSenderName) {
    $("#chatSender").val(savedSenderName); 
  }
  
  getAllChatMessages().observe({
	  
	  //AHA, a chat message was added
    added: function(message) {
      console.log("message added: " + message);
      
      flash($("#nav-chat"));

      var isUnread = isMessageUnread(message);
      if (currentTab.get() == "chat") {
        scrollChatToBottom();
  	    if (isUnread) {
  	      //I haven't seen this message before!
          setLastReadMessage(message);
          //... but I'm seeing it right now, so I don't need to update the unread count.
  	    }                
      } else {
        /*
        if (isUnread) {
          console.log(".... it's unread! " + message);
          //I'm not watching the chat, and this is a new message,
          //so I better increase the unread count.
          increaseUnreadChatCount();
        }
        */
      }	  
    }
  })  
};


