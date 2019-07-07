var hueboard = hueboard || {};

//@ philips
//@ util

$(document).ready(function(){
  var config = {
    pollingInterval : 5000
  };
  var hue = jsHue();
  var storage = {};

  initMaterialize();
  initHue();

  function createUsers(initUsersComplete)
  {
    var done = 0;
    storage.usernames = [];
    storage.bridges.forEach(ipaddress => {
      var timer = createUser(ipaddress);

      function createUser(ipaddress)
      {
        var bridge = hue.bridge(ipaddress);
        bridge.createUser('HueBoard').then(data => {
          var username = '';
          username = data[0].success.username;

          if (username != '')
          {
            done++;
            storage.map[ipaddress] = username;

            if (done == storage.bridges.length)
            {
              sortUsersByBridge();
              saveJsonToLocalStorage('usernames', storage.usernames);
              initUsersComplete();
            }
          }
        }).catch(e => {
          setTimeout(function(){
            createUser(ipaddress);
          }, config.pollingInterval);
        });
      }
    });
  }

  function discoverBridges()
  {
    storage.bridges = [];

    hue.discover().then(foundBridges => {
      if (foundBridges.length == 0)
      {
        console.log('No bridges found :(');
      }
      else
      {
        foundBridges.forEach(b => storage.bridges.push(b.internalipaddress));
        saveJsonToLocalStorage('bridges', storage.bridges);
        initUsers(initActiveUsers);
      }
    }).catch(e => console.log('Error finding bridges.', e));
  }

  function initActiveUsers()
  {
    for (var i = 0; i < storage.bridges.length; i++)
    {
      var bridge = hue.bridge(storage.bridges[i]);
      var user = bridge.user(storage.usernames[i]);
      storage.activeUsers.push(user);
    }

    loadGroups();
  }

  function initBridges()
  {
    if (storage.bridges != null)
    {
      storage.bridges = JSON.parse(storage.bridges);
      initUsers(initActiveUsers);
    }
    else
    {
      discoverBridges();
    }
  }

  function initGroupModal(event)
  {
    var $modal = $('#room-modal');
    var group = event.data.group;
    var src = 'assets/img/huePackPng/' + hueboard.philips.mapToFileName(group.class);

    $modal.find('.modal-content h4 img')
          .attr('src', src);
    $modal.find('.modal-content h4 span')
          .text(group.name);

    M.Modal.getInstance($modal).open();
  }

  function initHue()
  {
    storage.activeUsers = [];
    storage.bridges = localStorage.getItem('bridges');
    storage.map = {};
    storage.usernames = localStorage.getItem('usernames');

    initBridges();
  }

  function initMaterialize()
  {
    $(document).ready(function(){
      $('.modal').modal();
    });
  }

  function initUsers(initUsersComplete)
  {
    if (storage.usernames != null)
    {
      storage.usernames = JSON.parse(storage.usernames);
      initUsersComplete();
    }
    else
    {
      createUsers(initUsersComplete);
    }
  }

  function loadGroups()
  {
    var done = 0;
    storage.groups = {};

    for (var i = 0; i < storage.activeUsers.length; i++)
    {
      storage.activeUsers[i].getGroups().then(data => {
        storage.groups[i] = data;
        done++;

        if (done == storage.activeUsers.length)
        {
          run();
        }
      }).catch(e => console.log('Something bad happend.', e));
    }
  }

  function renderGroup(activeUser, groupNumber)
  {
    var group = storage.groups[activeUser][groupNumber];
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
          .click({group: group}, initGroupModal);

    if (group.type == 'Room')
    {
      $('#roomList').append($card);
    }
    else
    {
      $('#zoneList').append($card);
    }
  }

  function renderGroupsAllUsers()
  {
    for (var activeUser in storage.groups) {
      renderGroupsSingleUser(activeUser)
    }
  }

  function renderGroupsSingleUser(activeUser)
  {
    for (var groupNumber in storage.groups[activeUser])
    {
      renderGroup(activeUser, groupNumber);
    }
  }

  function run()
  {
    renderGroupsAllUsers();
  }

  function saveJsonToLocalStorage(key, value)
  {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function sortUsersByBridge() {
    storage.bridges.forEarch(ipaddress => {
      storage.usernames.push(storage.bridges[ipaddress]);
    });
  }
});