hueboard.util = {
  createDiv : function(className) {
    return $('<div></div>').addClass(className);
  },

  setDashboardSpinnerMessage : function(message) {
    $('#dashboardSpinner .message').text(message);
  }
}