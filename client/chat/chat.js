scrollChatToBottom = function() {
  setTimeout(function() {
    $("#chatMessages").scrollTop($("#chatMessages").prop("scrollHeight"));
  }, 100);
}

/*
giveFocusToChatText = function() {
  setTimeout(function() {
    $('#chatText').focus();
  }, 100);
}
*/


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

var errorMessage = new ReactiveVar();

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
  },
  errorMessage: function() {
    return errorMessage.get();
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
    if (isEmpty(from)) {
      errorMessage.set("You need to set your name");
      return;
    } 
    if (isEmpty(text)) {
      return;
    }
    
    if (from && text) {
      Meteor.call("chat", from, text.trim());   
      $("#chatText").val("");   
      scrollChatToBottom();
    }
  },
  
  'keypress, click': function(e) {
    errorMessage.set(null);    
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
      flash($("#nav-chat"));

      if (currentTab.get() == "chat") {
        scrollChatToBottom();
  	    if (isMessageUnread(message)) {
  	      //I haven't seen this message before!
          setLastReadMessage(message);
          //... but I'm seeing it right now, so I don't need to update the unread count.
  	    }                
      } 
    }
  })  
};


