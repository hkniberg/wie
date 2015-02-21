scrollChatToBottom = function() {
  if (scrollEnabled) {
    $("#chatMessages").scrollTop($("#chatMessages").prop("scrollHeight"));
  }
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
})


Template.chat.events({
  'submit form': function(e) {
    e.preventDefault();
    var from = $("#chatSender").val();
    var text = $("#chatText").val();
    
    localStorage.setItem("chatName", from);
    
    if (from && text) {
      Meteor.call("chat", from, text);   
      $("#chatText").val("");   
      scrollChatToBottom();
    }
  },
  'click #chatExpandButton': function(e) {
    var chatMessages =  $("#chatMessages");
    var glyph = $("#chatExpandGlyph");
    
    if (!chatExpanded) {
      chatMessages.removeClass("chatMessagesSmall");    
      chatMessages.addClass("chatMessagesLarge");    
      glyph.removeClass("glyphicon-chevron-down");
      glyph.addClass("glyphicon-chevron-up");
    } else {
      chatMessages.addClass("chatMessagesSmall");    
      chatMessages.removeClass("chatMessagesLarge");    
      glyph.addClass("glyphicon-chevron-down");
      glyph.removeClass("glyphicon-chevron-up");      
    } 
    chatExpanded = !chatExpanded;
    scrollChatToBottom();
  }
})


Template.chat.rendered = function() {
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
            personButton.effect("highlight", 1500);          
          }
        }
      
        $("#chatPanelHeading").effect("highlight", 1500);          
      
      }, 200);
    }
  })  
}


