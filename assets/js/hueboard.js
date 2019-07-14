var hueboard = hueboard || {};

//@ app
//@ hue
//@ philips
//@ storage
//@ util

$(document).ready(function(){
  hueboard.jsHue = jsHue();

  initChangelog();
  initMaterialize();
  hueboard.hue.init(hueboard.app.run);

  function initChangelog()
  {
    $.getJSON('changelog.json', function(changelog){
      var $list = $('#changelog-modal .collection');

      for (var version in changelog)
      {
        $('<li></li>').addClass('collection-header')
                      .html('<h4>' + version + '</h4')
                      .appendTo($list);
        $.each(changelog[version], function(item){
          $('<li></li>').addClass('collection-item')
                        .text(changelog[version][item])
                        .appendTo($list);
        });
      }
    });
  }

  function initMaterialize()
  {
    $(document).ready(function(){
      $('.modal').modal();
      $('.sidenav').sidenav();
    });
  }
});