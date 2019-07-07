hueboard.storage = {
  data : {},

  get : function(key)
  {
    return hueboard.storage.data[key];
  },

  getFromLocalStorage : function(key)
  {
    return localStorage.getItem(key)
  },

  saveJsonToLocalStorage : function(key, value)
  {
    localStorage.setItem(key, JSON.stringify(value));
  },

  set : function(key, value)
  {
    hueboard.storage.data[key] = value;
  }
}