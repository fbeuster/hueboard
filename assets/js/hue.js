hueboard.hue = {
  afterInit : null,
  pollingInterval : 5000,

  createUsers: function(initUsersComplete)
  {
    hueboard.util.setDashboardSpinnerMessage('Waiting for bridge button presses');
    var done = 0;
    hueboard.storage.set('usernames', []);
    hueboard.storage.get('bridges').forEach(ipaddress => {
      var timer = createUser(ipaddress);

      function createUser(ipaddress)
      {
        var bridge = hueboard.jsHue.bridge(ipaddress);
        bridge.createUser('HueBoard').then(data => {
          var username = '';
          username = data[0].success.username;

          if (username != '')
          {
            done++;
            hueboard.storage.get('map')[ipaddress] = username;

            if (done == hueboard.storage.get('bridges').length)
            {
              hueboard.hue.sortUsersByBridge();
              hueboard.storage.saveJsonToLocalStorage('usernames', hueboard.storage.get('usernames'));
              initUsersComplete();
            }
          }
        }).catch(e => {
          setTimeout(function(){
            createUser(ipaddress);
          }, hueboard.hue.pollingInterval);
        });
      }
    });
  },

  discoverBridges : function()
  {
    hueboard.util.setDashboardSpinnerMessage('Searching bridges...');
    hueboard.storage.set('bridges', []);

    hueboard.jsHue.discover().then(foundBridges => {
      if (foundBridges.length == 0)
      {
        hueboard.util.setDashboardSpinnerMessage('No bridges found :(');
      }
      else
      {
        foundBridges.forEach(b => hueboard.storage.get('bridges').push(b.internalipaddress));
        hueboard.storage.saveJsonToLocalStorage('bridges', hueboard.storage.get('bridges'));
        hueboard.hue.initUsers(hueboard.hue.initActiveUsers);
      }
    }).catch(e => console.log('Error finding bridges.', e));
  },

  init : function(afterInit)
  {
    hueboard.hue.afterInit = afterInit;

    hueboard.storage.set('activeUsers', []);
    hueboard.storage.set('bridges', hueboard.storage.getFromLocalStorage('bridges'));
    hueboard.storage.set('map', {});
    hueboard.storage.set('usernames', hueboard.storage.getFromLocalStorage('usernames'));

    hueboard.hue.initBridges();
  },

  initActiveUsers : function()
  {
    hueboard.util.setDashboardSpinnerMessage('Creating users');
    for (var i = 0; i < hueboard.storage.get('bridges').length; i++)
    {
      var bridge = hueboard.jsHue.bridge(hueboard.storage.get('bridges')[i]);
      var user = bridge.user(hueboard.storage.get('usernames')[i]);
      hueboard.storage.get('activeUsers').push(user);
    }

    hueboard.hue.loadGroups();
  },

  initBridges : function()
  {
    hueboard.util.setDashboardSpinnerMessage('Loading bridges');
    if (hueboard.storage.get('bridges') != null)
    {
      hueboard.storage.set('bridges', JSON.parse(hueboard.storage.get('bridges')));
      hueboard.hue.initUsers(hueboard.hue.initActiveUsers);
    }
    else
    {
      hueboard.hue.discoverBridges();
    }
  },

  initUsers : function(initUsersComplete)
  {
    hueboard.util.setDashboardSpinnerMessage('Loading users');
    if (hueboard.storage.get('usernames') != null)
    {
      hueboard.storage.set('usernames', JSON.parse(hueboard.storage.get('usernames')));
      initUsersComplete();
    }
    else
    {
      hueboard.hue.createUsers(initUsersComplete);
    }
  },

  loadGroups : function()
  {
    hueboard.util.setDashboardSpinnerMessage('Loading groups');
    var done = 0;
    var nActiveUsers = hueboard.storage.get('activeUsers').length;
    hueboard.storage.set('groups', {});


    for (var i = 0; i < nActiveUsers; i++)
    {
      var group = i;
      hueboard.storage.get('activeUsers')[group].getGroups().then(data => {
        hueboard.storage.get('groups')[group] = data;
        done++;

        if (done == nActiveUsers)
        {
          hueboard.hue.afterInit();
        }
      }).catch(e => console.log('Something bad happend.', e));
    }
  },

  sortUsersByBridge : function() {
    $.each(hueboard.storage.get('bridges'), function(key) {
      var ip = hueboard.storage.get('bridges')[key];
      var user = hueboard.storage.get('map')[ip];
      hueboard.storage.get('usernames').push(user);
    });
  }
}