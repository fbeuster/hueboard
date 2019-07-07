var hueboard = hueboard || {};

//@ app
//@ hue
//@ philips
//@ storage
//@ util

$(document).ready(function(){
  hueboard.jsHue = jsHue();

  initMaterialize();
  hueboard.hue.init(hueboard.app.run);

  function initMaterialize()
  {
    $(document).ready(function(){
      $('.modal').modal();
    });
  }
});