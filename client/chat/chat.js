scrollChatToBottom = function() {
  if (scrollEnabled) {
    $("#chatMessages").scrollTop($("#chatMessages").prop("scrollHeight"));
  }
}

flash = function(element) {
  element.addClass("animated bounce");
  setTimeout(function() {
    element.removeClass("animated bounce");
  }, 1000)
}

chatExpanded = false;

flashEnabled = false;
scrollEnabled = false;
setTimeout(function() {
  scrollEnabled = true;
  scrollChatToBottom();
}, 2000);

setTimeout(function() {
  flashEnabled = true;
}, 10000);

getSavedSenderName = function() {
  return localStorage.getItem("savedSenderName");  
}

setSavedSenderName = function(name) {
  localStorage.setItem("savedSenderName", name);
}

Template.chat.helpers({    
  people: function() {
    return getAllPeople();
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
    added: function(doc) {
      if (!flashEnabled) {
        return;
      }      
      
      setTimeout(function() {
        scrollChatToBottom();      
        if (doc.from) {
          var personId = getIdOfPerson(doc.from);
          if (personId) {
            //console.log("will flash " + personId);
            var personButton = $("#buttonForPerson" + personId);
            //flash(personButton);          
          }
        }
      
        //flash($("#chatPanelHeading"));
      
      }, 200);
    }
  })  
};


