Template.feedback.events({
  'click #feedbackButton': function() {
    event.preventDefault();
    window.open("https://github.com/hkniberg/wie/issues", '_blank');
  }
})