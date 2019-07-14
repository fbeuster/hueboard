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

    hueboard.app.loadLightsOfRoom($modal, event.data.user, group.lights);

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
          .click({user: activeUser, group: group}, hueboard.app.initGroupModal);

    if (group.type == 'Room')
    {
      $('#roomList').append($card);
    }
    else
    {
      $('#zoneList').append($card);
    }
  },

  loadLightsOfRoom : function($modal, user, lights) {
    var $list       = $modal.find('.collection'),
        activeUser  = hueboard.storage.get('activeUsers')[user];
    $list.hide(0).html('');
    $modal.find('#roomSpinner').show(0);

    activeUser.getLights().then(data => {

      lights.forEach(id => {
        var light     = data[id],
            checked   = light.state.on ? ' checked' : '',
            $name     = $('<span></span>').text(light.name),
            $toggle   = $('<div class="switch secondary-content"><label>Off<input id="hueLight_' + id + '"' + checked + ' type="checkbox"><span class="lever"></span>On</label></div>'),
            $content  = $('<div></div>').append($name)
                                        .append($toggle),
            $light    = $('<li></li>').addClass('collection-item')
                                      .attr('data-id', id)
                                      .append($content)
                                      .on('click',
                                          '#hueLight_' + id,
                                          {id: id, user: user},
                                          hueboard.app.toggleLightOnOff)
                                      .appendTo($list);
      });
      $modal.find('#roomSpinner').fadeOut(400, function(){
        $list.fadeIn();
      });
    }).catch(e => console.log('Something bad happend.', e));
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
    $('#dashboardSpinner').addClass('hide');
    $('#main').removeClass('valign-wrapper');
    $('#groupList').removeClass('hide');
  },

  toggleLightOnOff : function(event) {
    var activeUser = hueboard.storage.get('activeUsers')[event.data.user]

    if ($(this).is(':checked'))
    {
      activeUser.setLightState(event.data.id, {'on' : true});
    }
    else
    {
      activeUser.setLightState(event.data.id, {'on' : false});
    }
  }
}