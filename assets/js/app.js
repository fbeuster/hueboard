hueboard.app = {
  initGroupModal : function(event)
  {
    var $modal = $('#room-modal');
    var group = event.data.group;
    var src = 'assets/img/huePackPng/' + hueboard.philips.mapToFileName(group.class);

    $modal.find('.modal-content h4 img')
          .attr('src', src);
    $modal.find('.modal-content h4 span')
          .text(group.name);

    M.Modal.getInstance($modal).open();
  },

  renderGroup : function(activeUser, groupNumber)
  {
    var group = hueboard.storage.get('groups')[activeUser][groupNumber];
    var src = 'assets/img/huePackPng/' + hueboard.philips.mapToFileName(group.class);

    var $cardText = $('<span></span>').text(group.name);

    var $cardIcon = $('<img/>');
    $cardIcon.addClass('card-icon')
              .attr('src', src);

    var $cardTitle = hueboard.util.createDiv('card-title');
    $cardTitle.append($cardIcon)
              .append($cardText);

    var $cardContent = hueboard.util.createDiv('card-content');
    $cardContent.append($cardTitle);

    var $card = hueboard.util.createDiv('card hoverable ' +
                          hueboard.philips.mapToClassName(group.class));
    $card.append($cardContent)
          .attr('data-id', activeUser + '#' + groupNumber)
          .click({group: group}, hueboard.app.initGroupModal);

    if (group.type == 'Room')
    {
      $('#roomList').append($card);
    }
    else
    {
      $('#zoneList').append($card);
    }
  },

  renderGroupsAllUsers : function()
  {
    for (var activeUser in hueboard.storage.get('groups')) {
      hueboard.app.renderGroupsSingleUser(activeUser)
    }
  },

  renderGroupsSingleUser : function(activeUser)
  {
    for (var groupNumber in hueboard.storage.get('groups')[activeUser])
    {
      hueboard.app.renderGroup(activeUser, groupNumber);
    }
  },

  run : function()
  {
    hueboard.app.renderGroupsAllUsers();
  }
}